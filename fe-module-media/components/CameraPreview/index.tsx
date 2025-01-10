import Button from '@/fe-component/Button';
import React, { useCallback, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  View,
  Alert,
  ImageBackground,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { CameraRoll } from '@react-native-camera-roll/camera-roll'

const requestSavePermission = async (): Promise<boolean> => {
  // On Android 13 and above, scoped storage is used instead and no permission is needed
  if (Platform.OS !== 'android' || Platform.Version >= 33) return true

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  if (permission == null) return false
  let hasPermission = await PermissionsAndroid.check(permission)
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(permission)
    hasPermission = permissionRequestResult === 'granted'
  }
  return hasPermission
}

const CameraPreview = ({photo, retakePicture, savePhoto}: any) => {
  const {bottom} = useSafeAreaInsets();
  const [savingState, setSavingState] = useState<'none' | 'saving' | 'saved'>('none')

  const onSavePressed = useCallback(async () => {
    try {
      setSavingState('saving')

      const hasPermission = await requestSavePermission()
      if (!hasPermission) {
        Alert.alert('Permission denied!', 'Vision Camera does not have permission to save the media to your camera roll.')
        return
      }
      await CameraRoll.save(`file://${photo.path}`, {
        type: photo.type,
      })
      setSavingState('saved');
      retakePicture();
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e)
      setSavingState('none')
      Alert.alert('Failed to save!', `An unexpected error occured while trying to save your ${photo.type}. ${message}`)
    }
  }, [photo])

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
              justifyContent: 'space-between',
            }}>
              <Button onPress={onSavePressed} type="ghost">Lưu lại</Button>
            <Button mode="contained-tonal" onPress={retakePicture}>Bỏ qua</Button>

            <Button type="primary" onPress={() => savePhoto([photo])}>Tải lên</Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CameraPreview;
