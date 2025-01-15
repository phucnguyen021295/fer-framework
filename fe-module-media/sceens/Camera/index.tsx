import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {
  Camera,
  CameraProps,
  CameraRuntimeError,
  PhotoFile,
  useCameraDevice,
  useCameraDevices,
  useCameraFormat,
  useMicrophonePermission,
  VideoFile,
} from 'react-native-vision-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Reanimated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';

// Components
import CameraPreview from '@/fe-module-media/components/CameraPreview';
import {CaptureButton} from '@/fe-module-media/components/CaptureButton';
import {
  MAX_ZOOM_FACTOR,
  SCALE_FULL_ZOOM,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '@/fe-module-media/constants';
import {useIsForeground} from '@/fe-core/hooks/useIsForeground';
import CameraOptions from '@/fe-module-media/components/CameraOptions';
import WrapperPermission from '@/fe-module-media/components/WrapperPermission';
import MediaButton from '@/fe-module-media/components/MediaButton';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const OPTIONS = ['PHOTO', 'VIDEO'];

const CameraScreen = props => {
  const navigation = useNavigation();
  const {route} = props;
  /**
   * 1. onUpload: hàm callback sau khi chọn ảnh.
   * 2. options: là loại photo hay video, mặc định có 2 option.
   * 3. hideMedia: trạng thái ẩn hiện media.
   */
  const {onUpload, options = OPTIONS, hideMedia} = route.params;
  const {left, right, top, bottom} = useSafeAreaInsets();
  const cameraRef = useRef<Camera>(null);
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );

  const isPressingButton = useSharedValue(false);
  const microphone = useMicrophonePermission();
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const device = useCameraDevice(cameraPosition);
  const zoom = useSharedValue(device?.neutralZoom || 1);
  // const device = devices.back; // Use back camera
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState<any>(null);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [enableHdr, setEnableHdr] = useState(false);
  const [enableNightMode, setEnableNightMode] = useState(false);
  const [targetFps, setTargetFps] = useState(60);
  const [type, setType] = useState('PHOTO');

  //#region Animated Zoom
  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);

  // check if camera page is active
  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocussed && isForeground;
  const screenAspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  const format = useCameraFormat(device, [
    // { fps: targetFps },
    {videoAspectRatio: screenAspectRatio},
    {videoResolution: 'max'},
    {photoAspectRatio: screenAspectRatio},
    {photoResolution: 'max'},
  ]);
  const cameraAnimatedProps = useAnimatedProps<CameraProps>(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
    return {
      zoom: z,
    };
  }, [maxZoom, minZoom, zoom]);

  const fps = Math.min(format?.maxFps ?? 1, targetFps);

  //#region Effects
  useEffect(() => {
    // Reset zoom to it's default everytime the `device` changes.
    zoom.value = device?.neutralZoom ?? 1;
  }, [zoom, device]);

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  }, []);

  const onFlashPressed = useCallback(() => {
    setFlash(f => (f === 'off' ? 'on' : 'off'));
  }, []);

  const onMediaCaptured = useCallback(
    (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
      console.log(`Media captured! ${JSON.stringify(media)}`);
      setPreviewVisible(true);
      setCapturedImage(media);
      // navigation.navigate('MediaPage', {
      //   path: media.path,
      //   type: type,
      // })
    },
    [],
  );

  //#region Callbacks
  const setIsPressingButton = useCallback(
    (_isPressingButton: boolean) => {
      isPressingButton.value = _isPressingButton;
    },
    [isPressingButton],
  );

  const onInitialized = useCallback(() => {
    console.log('Camera initialized!');
    setIsCameraInitialized(true);
  }, []);

  const goBack = () => {
    navigation.goBack();
    return true;
  };

  const __savePhoto = photo => {
    onUpload(photo);
    navigation.goBack();
    return true;
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    // __startCamera()
  };

  //#region Pinch to Zoom Gesture
  // The gesture handler maps the linear pinch gesture (0 - 1) to an exponential curve since a camera's zoom
  // function does not appear linear to the user. (aka zoom 0.1 -> 0.2 does not look equal in difference as 0.8 -> 0.9)
  const onPinchGesture = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    {startZoom?: number}
  >({
    onStart: (_, context) => {
      context.startZoom = zoom.value;
    },
    onActive: (event, context) => {
      // we're trying to map the scale gesture to a linear zoom here
      const startZoom = context.startZoom ?? 0;
      const scale = interpolate(
        event.scale,
        [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
        [-1, 0, 1],
        Extrapolate.CLAMP,
      );
      zoom.value = interpolate(
        scale,
        [-1, 0, 1],
        [minZoom, startZoom, maxZoom],
        Extrapolate.CLAMP,
      );
    },
  });

  const onDoubleTap = useCallback(() => {
    onFlipCameraPressed();
  }, [onFlipCameraPressed]);

  //#region Tap Gesture
  const onFocusTap = useCallback(
    ({nativeEvent: event}: GestureResponderEvent) => {
      if (!device?.supportsFocus) return;
      cameraRef.current?.focus({
        x: event.locationX,
        y: event.locationY,
      });
    },
    [device?.supportsFocus],
  );

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  //Trường hợp người dùng preview ảnh
  if (previewVisible && capturedImage) {
    return (
      <View style={styles.container}>
        <CameraPreview
          photo={capturedImage}
          savePhoto={__savePhoto}
          retakePicture={__retakePicture}
        />
        <View style={[styles.leftButtonRow, {top, left: left || 12}]}>
          <TouchableOpacity style={styles.button} onPress={goBack}>
            <Ionicons name="close" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const supportsFlash = device?.hasFlash ?? false;
  const videoHdr = format?.supportsVideoHdr && enableHdr;
  const photoHdr = format?.supportsPhotoHdr && enableHdr && !videoHdr;

  return (
    <WrapperPermission type={type} microphone={microphone} device={device}>
      <View style={styles.container}>
        <PinchGestureHandler onGestureEvent={onPinchGesture} enabled={isActive}>
          <Reanimated.View
            onTouchEnd={onFocusTap}
            style={StyleSheet.absoluteFill}>
            <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
              <ReanimatedCamera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={isActive}
                onInitialized={onInitialized}
                onError={onError}
                onStarted={() => console.log('Camera started!')}
                onStopped={() => console.log('Camera stopped!')}
                onPreviewStarted={() => console.log('Preview started!')}
                onPreviewStopped={() => console.log('Preview stopped!')}
                onOutputOrientationChanged={o =>
                  console.log(`Output orientation changed to ${o}!`)
                }
                onPreviewOrientationChanged={o =>
                  console.log(`Preview orientation changed to ${o}!`)
                }
                onUIRotationChanged={degrees =>
                  console.log(`UI Rotation changed: ${degrees}°`)
                }
                format={format}
                fps={fps}
                photoHdr={photoHdr}
                videoHdr={videoHdr}
                photoQualityBalance="quality"
                lowLightBoost={device?.supportsLowLightBoost && enableNightMode}
                enableZoomGesture={true}
                animatedProps={cameraAnimatedProps}
                exposure={0}
                enableFpsGraph={false}
                outputOrientation="device"
                photo={true}
                video={true}
                audio={microphone.hasPermission}
                //   enableLocation={location.hasPermission}
                //   frameProcessor={frameProcessor}
              />
            </TapGestureHandler>
          </Reanimated.View>
        </PinchGestureHandler>

        {/* <StatusBarBlurBackground /> */}

        <View style={[styles.leftButtonRow, {top: top + 12, left: left || 12}]}>
          <TouchableOpacity style={styles.button} onPress={goBack}>
            <Ionicons name="close" color="white" size={24} />
          </TouchableOpacity>
        </View>

        <CaptureButton
          style={[styles.captureButtonContainer, {bottom: bottom + 32}]}
          camera={cameraRef}
          onMediaCaptured={onMediaCaptured}
          cameraZoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          type={type}
          flash={supportsFlash ? flash : 'off'}
          enabled={isCameraInitialized && isActive}
          setIsPressingButton={setIsPressingButton}
        />

        <CameraOptions
          options={options}
          type={type}
          setType={setType}
          style={{bottom, position: 'absolute'}}
        />

        {!hideMedia && (
          <MediaButton
            onUpload={onUpload}
            style={[styles.mediaContainer, {left: 32, bottom: bottom + 40}]}
          />
        )}

        <View
          style={[styles.rightButtonRow, {top: top + 12, right: right || 12}]}>
          <TouchableOpacity style={styles.button} onPress={onFlipCameraPressed}>
            <Ionicons name="camera-reverse" color="white" size={24} />
          </TouchableOpacity>
          {supportsFlash && (
            <TouchableOpacity style={styles.button} onPress={onFlashPressed}>
              <Ionicons
                name={flash === 'on' ? 'flash' : 'flash-off'}
                color="white"
                size={24}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </WrapperPermission>
  );
};

export default memo(CameraScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },

  description: {
    color: '#fff',
    textAlign: 'center',
  },

  rightButtonRow: {
    position: 'absolute',
    right: 20,
    top: 44,
  },

  leftButtonRow: {
    position: 'absolute',
    left: 20,
    top: 44,
  },

  button: {
    marginBottom: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  captureButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },

  mediaContainer: {
    position: 'absolute',
  },
});
