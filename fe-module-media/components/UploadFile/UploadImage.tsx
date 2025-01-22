import FastImage from '@d11/react-native-fast-image';
import {memo, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {
  registerUploadChange,
  unRegisterUploadChange,
} from '../UploadMedia/broadcastUpload';
import Image from './image';

interface Props {
  image: any;
  width: number;
  height: number;
  onUploadSuccess: (image: string) => void;
  onUploadFailure: (err: any) => void;
  uploadFileApi: any;
  event: string;
}

const UploadImage = (props: Props) => {
  const {
    image,
    width = 40,
    height = 40,
    uploadFileApi,
    onUploadSuccess,
    onUploadFailure,
    event,
  } = props;
  const [uploadFile, {data, isLoading, isError, reset}] = uploadFileApi();

  useEffect(() => {
    registerUploadChange(event, onUploadFileApi);
    return () => {
      unRegisterUploadChange(event, onUploadFileApi);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUploadFileApi = async () => {
    try {
      const results = await uploadFile(image).unwrap(); // Sử dụng unwrap để lấy dữ liệu hoặc lỗi từ response
      console.log('onUploadFileApi', results);
      onUploadSuccess(results);
      unRegisterUploadChange(event, onUploadFileApi);
      reset();
    } catch (err) {
      console.log('onUploadFileApi', err);
      onUploadFailure(err);
      reset();
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.image, {width, height}]}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.image, styles.error, {width, height}]}>
        <FastImage
          source={{uri: image?.path}}
          style={[styles.image, {width, height}]}
        />
      </View>
    );
  }

  if (data) {
    return <Image uri={data} width={width} height={height} />;
  }

  return (
    <FastImage
      source={{uri: image?.path}}
      style={[styles.image, {width, height}]}
    />
  );
};

export default memo(UploadImage);

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#F0F0F0',
  },

  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
