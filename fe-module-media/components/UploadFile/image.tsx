import {useGetFileQuery} from '@/app/apis/upload';
import FastImage from '@d11/react-native-fast-image';
import {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

interface Props {
  uri: string;
  width: number;
  height: number;
}

const ImageBase = (props: Props) => {
  const {uri, width = 40, height = 40} = props;
  const {data, isLoading} = useGetFileQuery({
    filePath: uri,
  });

  if (isLoading) {
    return (
      <View style={[styles.image, {width, height}]}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (!data) {
    return <View style={styles.image} />;
  }

  return (
    <FastImage
      source={{uri: data || uri}}
      style={[styles.image, {width, height}]}
    />
  );
};

export default memo(ImageBase);

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#F0F0F0',
  },
});
