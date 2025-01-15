import React, {Children, useCallback, useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Alert, Linking} from 'react-native';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevice,
  useCameraDevices,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

// Components
import Text from '@/fe-component/Text';
import Button from '@/fe-component/Button';

interface Props {
  children: React.ReactNode;
  device: any;
  type: 'PHOTO' | 'VIDEO';
  microphone?: any;
}

const WrapperPermission = (props: Props) => {
  const {children, device, microphone, type} = props;
  const navigation = useNavigation();
  const {hasPermission} = useCameraPermission();
  const devices = useCameraDevices();
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');

  useFocusEffect(
    useCallback(() => {
      if (!device && devices.length === 0) return;
      if (type === 'PHOTO') {
        requestCameraPermission().then();
      } else {
        requestMicrophonePermission().then();
      }
      return () => {
        console.log('Screen is unfocused');
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [device, devices, type]),
  );

  const requestCameraPermission = async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    // if (permission === 'denied') await Linking.openSettings();
    setCameraPermissionStatus(permission);
  };

  const requestMicrophonePermission = useCallback(async () => {
    console.log('Requesting microphone permission...');
    const permission = await Camera.requestMicrophonePermission();
    console.log(`Microphone permission status: ${permission}`);

    setMicrophonePermissionStatus(permission);
  }, []);

  const goBack = () => {
    navigation.goBack();
    return true;
  };

  const openSettings = async () => await Linking.openSettings();

  // Trường hợp thiết bị không có camera
  if (!device && devices.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text size="Medium" style={styles.description}>
            Thiết bị này không hỗ trợ chức năng camera
          </Text>
          <Button size="small" mode="outlined" onPress={goBack}>
            Quay lại
          </Button>
        </View>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text size="Medium" style={styles.description}>
            Loading camera...
          </Text>
        </View>
      </View>
    );
  }

  // Trường hợp người dùng chưa cấp quyền
  // 1. Nếu chỉ dùng chụp ảnh thì sẽ chỉ cần cấp quyền camera
  // 2. Nếu quay video thì phải cấp cả 2 quyền camera và micro
  if (
    (type === 'PHOTO' && !hasPermission) ||
    (type === 'VIDEO' && (!hasPermission || !microphone.hasPermission))
  ) {
    const isPermission =
      microphonePermissionStatus === 'denied' ||
      cameraPermissionStatus === 'denied';
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          {cameraPermissionStatus === 'denied' ? (
            <Text size="Medium" style={styles.description}>
              Cần phải có quyền sử dụng máy ảnh để sử dụng tính năng này.
            </Text>
          ) : null}
          {microphonePermissionStatus === 'denied' ? (
            <Text size="Medium" style={styles.description}>
              Cần phải có quyền sử dụng microphone để sử dụng tính năng này.
            </Text>
          ) : null}
          {isPermission ? (
            <>
              <Button type="primary" onPress={openSettings}>
                Cấp quyền
              </Button>
              <Button onPress={goBack}>Quay lại</Button>
            </>
          ) : null}
        </View>
      </View>
    );
  }

  return <View style={styles.container}>{children}</View>;
};

export default WrapperPermission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },

  description: {
    color: '#fff',
    textAlign: 'center',
  },

  rightButtonRow: {
    position: 'absolute',
    right: 20,
    top: 44,
  },

  leftButtonRow: {
    position: 'absolute',
    left: 20,
    top: 44,
  },

  button: {
    marginBottom: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  retakeButton: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FF5252',
    borderRadius: 5,
  },
  retakeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  captureButtonText: {
    fontSize: 24,
    color: '#000',
  },
});
