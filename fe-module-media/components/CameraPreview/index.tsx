import Button from '@/fe-component/Button';
import React, {memo, useCallback, useState} from 'react';
import {
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View, Alert, ImageBackground} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Toast} from '@ant-design/react-native';
import Text from '@/fe-component/Text';
import BottomSheet from '@/fe-component/BottomSheet';

export const requestSavePermission = async (): Promise<boolean> => {
  // On Android 13 and above, scoped storage is used instead and no permission is needed
  if (Platform.OS !== 'android' || Platform.Version >= 33) return true;

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  if (permission == null) return false;
  let hasPermission = await PermissionsAndroid.check(permission);
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(
      permission,
    );
    hasPermission = permissionRequestResult === 'granted';
  }
  return hasPermission;
};

const CameraPreview = ({photo, retakePicture, savePhoto}: any) => {
  const {bottom} = useSafeAreaInsets();
  const [savingState, setSavingState] = useState<'none' | 'saving' | 'saved'>(
    '',
  );

  const openSettings = async () => await Linking.openSettings();

  const onSavePressed = useCallback(async () => {
    try {
      setSavingState('saving');

      const hasPermission = await requestSavePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission denied!',
          'Vision Camera does not have permission to save the media to your camera roll.',
        );
        return;
      }
      await CameraRoll.save(`file://${photo.path}`, {
        type: photo.type,
      });
      setSavingState('saved');
      Toast.success({icon: null, content: 'Lưu ảnh thành công'});
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e);
      setSavingState('none');
      // Alert.alert(
      //   'Failed to save!',
      //   `An unexpected error occured while trying to save your ${photo.type}. ${message}`,
      // );
    }
  }, [photo]);

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
      }}>
      <ImageBackground
        source={{uri: photo.path}}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            paddingHorizontal: 12,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: bottom,
              justifyContent: 'flex-end',
              gap: 12,
            }}>
            <Button style={{width: 100}} onPress={retakePicture}>
              Huỷ
            </Button>

            <Button
              style={{width: 100}}
              type="primary"
              onPress={() => savePhoto([photo])}>
              Tải lên
            </Button>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, {bottom: bottom + 4}]}
          onPress={onSavePressed}>
          <AntDesign name="download" size={20} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>
      <BottomSheet
        title="Thông báo"
        isVisible={savingState === 'none'}
        index={2}
        onDismiss={() => setSavingState('')}
        points={['15%', '25%']}>
        <View style={{marginHorizontal: 16, paddingTop: 16, gap: 12}}>
          <Text style={{textAlign: 'center'}}>
            Ứng dụng cần truy cập vào thư viện ảnh của bạn để lưu video và ảnh
            đã chụp
          </Text>
          <Button type="primary" onPress={openSettings}>
            Cấp quyền
          </Button>
        </View>
      </BottomSheet>
    </View>
  );
};

export default memo(CameraPreview);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
