import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar, Surface} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  uri: string;
  size?: number;
  onUploadImage: (image: any) => void;
}

function EditAvatar(props: Props) {
  const {uri, size = 60, onUploadImage} = props;

  const openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      onUploadImage(image);
    });
  };

  return (
    <Surface style={styles.surface} elevation={2}>
      <TouchableOpacity style={styles.container} onPress={openPicker}>
        <Avatar.Image
          size={size}
          source={
            uri
              ? {uri: `${uri}?time=${new Date().getTime()}`}
              : require('./images/user.png')
          }
        />
        <View style={styles.iconPen}>
          <AntDesign name="edit" size={14} color={'#fff'} />
        </View>
      </TouchableOpacity>
    </Surface>
  );
}

export default memo(EditAvatar);

const styles = StyleSheet.create({
  container: {},

  title: {
    color: '#000',
    paddingTop: 6,
    fontSize: 12,
  },

  iconPen: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(60, 60, 60)',
    height: 20,
    width: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  surface: {
    borderRadius: 30,
  },
});
