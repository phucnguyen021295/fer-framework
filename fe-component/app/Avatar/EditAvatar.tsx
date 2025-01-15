import React, {memo, useMemo, useState} from 'react';
import {
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Avatar, {SIZE, SIZE_AVATAR} from './index';
import Text from '../Text';
import BottomSheet from '../BottomSheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Button from '../Button';

interface Props {
  uri: string;
  size?: SIZE;
  onUploadImage: (image: any) => void;
}

function EditAvatar(props: Props) {
  const navigation = useNavigation();
  const {uri, size = 'Medium', onUploadImage} = props;
  const [isVisible, setVisible] = useState(false);
  const [isPermission, setPermission] = useState(false);

  const openPicker = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperChooseText: 'Tải lên',
      cropperCancelText: 'Huỷ',
      cropperCircleOverlay: true,
    })
      .then(image => {
        onUploadImage([image]);
      })
      .catch(() => {
        setPermission(true);
      });
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
    onUploadImage(image);
  };

  const onPicture = () => {
    setVisible(false);
    openPicker();
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
});
