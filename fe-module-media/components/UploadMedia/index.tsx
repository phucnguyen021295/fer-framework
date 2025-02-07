import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
// import { useData } from "@/app/components/DataProvider";
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import {unionBy} from 'lodash';
import Close from '@/assets/icons/Close';
import {SCREEN} from '@/fe-module-media/screens';
import {UploadImage} from '../UploadFile';
import {broadcastUpload} from './broadcastUpload';

interface Props {
  event: string;
  onUploadLocal: (images: []) => void;
  onUploadFileSuccess: (images: []) => void;
  onUploadFileFailure: () => void;
  uploadFileApi: any;
}

function UploadMedia(props: Props, ref) {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [imagesLocal, setImagesLocal] = useState([]);
  const [imagesServer, setImagesServer] = useState([]);
  const {
    event,
    onUploadLocal,
    uploadFileApi,
    onUploadFileSuccess,
    onUploadFileFailure,
  } = props;

  useEffect(() => {
    if (imagesServer.length > 0 && imagesLocal.length === imagesServer.length) {
      onUploadFileSuccess(imagesServer);
    }
  }, [imagesServer, imagesLocal]);

  useImperativeHandle(ref, () => ({
    onUploadFile,
    onClear,
  }));

  const onCamera = () => {
    navigation.navigate(SCREEN.CAMERA, {onUpload});
  };

  const onClear = () => {
    setImagesLocal([]);
    setImagesServer([]);
  };

  const onUploadFile = () => {
    broadcastUpload(event, () => onUploadFileSuccess(imagesServer));
  };

  const onUpload = (imagesNew = []) => {
    const _images = unionBy(imagesLocal, imagesNew, 'path');
    setImagesLocal(_images);
    onUploadLocal(_images);
  };

  const onRemove = (image = {}) => {
    const _images = imagesLocal.filter(item => item.path !== image.path);
    setImagesLocal(_images);
    onUploadLocal(_images);
  };

  const onUploadSuccess = image => {
    setImagesServer(prevState => [...prevState, image]);
  };

  const onUploadFailure = err => {
    onUploadFileFailure();
  };

  const renderItem = useCallback(({item}) => {
    return (
      <View style={styles.item}>
        <UploadImage
          event={event}
          width={80}
          height={80}
          image={item}
          uploadFileApi={uploadFileApi}
          onUploadSuccess={onUploadSuccess}
          onUploadFailure={onUploadFailure}
        />
        <TouchableOpacity style={styles.icon} onPress={() => onRemove(item)}>
          <Close />
        </TouchableOpacity>
      </View>
    );
  }, []);

  const ListFooterComponent = () => (
    <TouchableOpacity onPress={onCamera} style={styles.camera}>
      <Ionicons name="camera-outline" size={32} color={colors.onBackground} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={imagesLocal} // Thêm icon ảnh ở cuối danh sách
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{paddingTop: imagesLocal.length > 0 ? 8 : 0}}
        ListFooterComponent={ListFooterComponent}
        estimatedItemSize={80} // Tối ưu hiệu suất FlashList
      />
    </View>
  );
}

export default memo(forwardRef(UploadMedia));

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 12
  },
  image: {
    width: 80,
    height: 80,
    borderColor: '#ddd',
    borderWidth: 1,
  },

  item: {
    marginRight: 12,
    width: 80,
    height: 80,
  },

  camera: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'dashed',
  },

  icon: {
    position: 'absolute',
    right: -8,
    top: -8,
    zIndex: 9,
  },
});
