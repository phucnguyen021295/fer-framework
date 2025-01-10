import {Flex} from '@ant-design/react-native';
import React, {memo, useState} from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
// import { useData } from "@/app/components/DataProvider";
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconButton, useTheme} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import { unionBy } from 'lodash';
import Close from '@/assets/icons/Close';

interface Props {
  screen: string;
  images: [];
  setImagesLocal: (images: []) => void;
}

function UploadMedia(props: Props) {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {screen, images, setImagesLocal} = props;

  const onCamera = () => {
    navigation.navigate(screen, {onUpload: onUploadLocal});
  };

  const onUploadLocal = (imagesNew = []) => {
    const _images = unionBy(images, imagesNew, 'path');
    setImagesLocal(_images);
  };

  const onRemove = item => {
    const _images = images.filter(item => item.path !== item.path);
    setImagesLocal(_images);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.path}} style={styles.image} />
        <TouchableOpacity style={styles.icon} onPress={() => onRemove(item)}>
          <Close />
        </TouchableOpacity>
      </View>
    );
  };

  const ListFooterComponent = () => (
    <TouchableOpacity onPress={onCamera} style={styles.camera}>
      <Ionicons name="camera-outline" size={32} color={colors.onBackground} />
    </TouchableOpacity>
    
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={images} // Thêm icon ảnh ở cuối danh sách
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{paddingTop: images.length > 0 ? 8 : 0}}
        ListFooterComponent={ListFooterComponent}
        estimatedItemSize={80} // Tối ưu hiệu suất FlashList
      />
    </View>
  );
}

export default memo(UploadMedia);

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
    zIndex: 9
  },
});
