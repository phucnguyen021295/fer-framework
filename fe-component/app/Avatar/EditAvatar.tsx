import React, {memo, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Avatar, { SIZE, SIZE_AVATAR } from './index';

interface Props {
  uri: string;
  size?: SIZE;
  onUploadImage: (image: any) => void;
}

function EditAvatar(props: Props) {
  const {uri, size = 'Medium', onUploadImage} = props;

  const openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      onUploadImage(image);
    });
  };

  const avatar_style = useMemo(() => {
    return {
      width: SIZE_AVATAR[size],
      height: SIZE_AVATAR[size],
      borderRadius: SIZE_AVATAR[size] / 2,
    };
  }, [size]);

  return (
      <TouchableOpacity style={[styles.container, avatar_style]} onPress={openPicker}>
        <Avatar uri={uri} size={size} elevation={0} />
        <View style={styles.iconPen}>
          <AntDesign name="camerao" size={12} color={'#fff'} />
        </View>
      </TouchableOpacity>
  );
}

export default memo(EditAvatar);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd'
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
    borderColor: '#fff'
  },

  surface: {
    borderRadius: 30,
  },
});
