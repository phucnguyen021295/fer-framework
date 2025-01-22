import React, {memo, useMemo, useState} from 'react';
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Avatar, {SIZE, SIZE_AVATAR} from './index';
import Text from '../Text';
import BottomSheet from '../BottomSheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Button from '../Button';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

interface Props {
  uri: string;
  size?: SIZE;
  onUploadImage: (image: any) => void;
  loading?: boolean;
}

function EditAvatar(props: Props) {
  const navigation = useNavigation();
  const {uri, size = 'Medium', onUploadImage, loading} = props;
  const [isVisible, setVisible] = useState(false);
  const [isPermission, setPermission] = useState(false);

  const onOpenPicker = async () => {
    const result = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );

    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert('Photo Library is not available on this device.');
        break;
      case RESULTS.DENIED:
        const requestResult = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        if (requestResult === RESULTS.GRANTED) {
          openPicker();
        } else {
          setPermission(true);
        }
        break;
      case RESULTS.GRANTED:
        openPicker();
        break;
      case RESULTS.BLOCKED:
        setPermission(true);
        break;
    }
  };

  const openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperChooseText: 'Tải lên',
      cropperCancelText: 'Huỷ',
      cropperCircleOverlay: true,
    })
      .then(image => {
        onUploadImage(image);
      })
      .catch(() => {});
  };

  const onTakeAPhoto = () => {
    setVisible(false);
    navigation.navigate('Camera', {
      onUpload: onUploadLocal,
      options: ['PHOTO'],
      hideMedia: true,
    });
  };

  const openSettings = async () => await Linking.openSettings();

  const onUploadLocal = (image = []) => {
    ImagePicker.openCropper({
      path: image[0].path,
      width: 300,
      height: 400,
      cropperChooseText: 'Tải lên',
      cropperCancelText: 'Huỷ',
      cropperCircleOverlay: true,
    }).then(image => {
      console.log(image);
      onUploadImage(image);
    });
  };

  const onPicture = () => {
    setVisible(false);
    onOpenPicker();
  };

  const avatar_style = useMemo(() => {
    return {
      width: SIZE_AVATAR[size],
      height: SIZE_AVATAR[size],
      borderRadius: SIZE_AVATAR[size] / 2,
    };
  }, [size]);

  return (
    <>
      <TouchableOpacity
        style={[styles.container, avatar_style]}
        onPress={() => setVisible(true)}>
        <Avatar uri={uri} size={size} elevation={0} />
        <View style={styles.iconPen}>
          <AntDesign name="camerao" size={12} color={'#fff'} />
        </View>
        {loading && <ActivityIndicator size={'small'} style={styles.loading} />}
      </TouchableOpacity>
      <BottomSheet
        isVisible={isVisible}
        index={2}
        onClose={() => setVisible(false)}
        points={['15%', '25%']}>
        <View style={{marginHorizontal: 16, paddingTop: 16, gap: 12}}>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={onTakeAPhoto}>
            <Ionicons name="camera-outline" size={24} color="#CCCCCC" />
            <Text size="Medium" style={{color: '#2E2E2E'}}>
              Chụp ảnh
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={onPicture}>
            <AntDesign name="picture" size={24} color="#CCCCCC" />
            <Text size="Medium">Chọn ảnh từ thư viện</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <BottomSheet
        title="Thông báo"
        isVisible={isPermission}
        index={2}
        onClose={() => setPermission(false)}
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
    </>
  );
}

export default memo(EditAvatar);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
  },

  iconPen: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(60, 60, 60)',
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },

  surface: {
    borderRadius: 30,
  },

  btn: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
