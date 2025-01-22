import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const MediaButton = props => {
  const {style, onSelectImage} = props;
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    _handleButtonPress();
  }, []);

  const handlePickImage = () => {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 5,
    }).then(images => {
      console.log('handlePickImage', images);
      onSelectImage(images);
    });
  };

  const _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
    })
      .then(r => {
        setImage(r.edges[0]);
        console.log('_handleButtonPress', r);
      })
      .catch(err => {
        // Error Loading Images
      });
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.7}
      onPress={handlePickImage}>
      {image ? (
        <Image
          style={{
            width: 56,
            height: 56,
            borderRadius: 4,
          }}
          source={{uri: image.node.image.uri}}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 8,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  placeholder: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default MediaButton;
