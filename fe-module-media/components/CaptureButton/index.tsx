import React, { useCallback, useRef } from 'react';
import { Dimensions, Platform, StyleSheet, View, ViewProps } from 'react-native';
import { Camera, PhotoFile, VideoFile } from 'react-native-vision-camera';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import Reanimated, {
  cancelAnimation,
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const CAPTURE_BUTTON_SIZE = 78;
const START_RECORDING_DELAY = 200;
const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;

interface Props extends ViewProps {
  camera: React.RefObject<Camera>;
  onMediaCaptured: (
    media: PhotoFile | VideoFile,
    type: 'photo' | 'video',
  ) => void;
  minZoom: number;
  maxZoom: number;
  cameraZoom: Reanimated.SharedValue<number>;
  flash: 'off' | 'on';
  enabled: boolean;
  type: 'PHOTO' | 'VIDEO'; // Add this prop for distinguishing modes
  setIsPressingButton: (isPressingButton: boolean) => void;
}

const _CaptureButton: React.FC<Props> = ({
  camera,
  onMediaCaptured,
  minZoom,
  maxZoom,
  cameraZoom,
  flash,
  enabled,
  type,
  setIsPressingButton,
  style,
  ...props
}): React.ReactElement => {
  const pressDownDate = useRef<Date | undefined>(undefined);
  const isRecording = useRef(false);
  const recordingProgress = useSharedValue(0);
  const isPressingButton = useSharedValue(false);

  //#region Camera Capture
  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      console.log('Taking photo...');
      const photo = await camera.current.takePhoto({
        flash: flash,
        enableShutterSound: false,
      });
      onMediaCaptured(photo, 'photo');
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [camera, flash, onMediaCaptured]);

  const onStoppedRecording = useCallback(() => {
    isRecording.current = false;
    cancelAnimation(recordingProgress);
    console.log('Stopped recording video!');
  }, [recordingProgress]);

  const stopRecording = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      console.log('Calling stopRecording()...');
      await camera.current.stopRecording();
      console.log('Called stopRecording()!');
    } catch (e) {
      console.error('Failed to stop recording!', e);
    }
  }, [camera]);

  const startRecording = useCallback(() => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      console.log('Calling startRecording()...');
      camera.current.startRecording({
        flash: flash,
        onRecordingError: (error) => {
          console.error('Recording failed!', error);
          onStoppedRecording();
        },
        onRecordingFinished: (video) => {
          console.log(`Recording successfully finished! ${video.path}`);
          onMediaCaptured(video, 'video');
          onStoppedRecording();
        },
      });
      isRecording.current = true;
    } catch (e) {
      console.error('Failed to start recording!', e);
    }
  }, [camera, flash, onMediaCaptured, onStoppedRecording]);

  //#endregion

  //#region Tap Handler
  const onHandlerStateChanged = useCallback(
    async ({ nativeEvent: event }: TapGestureHandlerStateChangeEvent) => {
      switch (event.state) {
        case State.BEGAN: {
          recordingProgress.value = 0;
          isPressingButton.value = true;
          pressDownDate.current = new Date();

          if (type === 'VIDEO') {
            setTimeout(() => {
              if (pressDownDate.current) {
                startRecording();
              }
            }, START_RECORDING_DELAY);
          }
          setIsPressingButton(true);
          return;
        }
        case State.END: {
          try {
            if (type === 'PHOTO') {
              await takePhoto();
            } else if (type === 'VIDEO') {
              await stopRecording();
            }
          } finally {
            isPressingButton.value = false;
            setIsPressingButton(false);
          }
          return;
        }
        default:
          break;
      }
    },
    [isPressingButton, recordingProgress, setIsPressingButton, startRecording, stopRecording, takePhoto, type],
  );
  //#endregion

  //#region Animated Styles
  const buttonStyle = useAnimatedStyle(() => {
    const scale = enabled
      ? isPressingButton.value
        ? withSpring(1)
        : withSpring(0.9)
      : withSpring(0.6);

    return {
      opacity: withTiming(enabled ? 1 : 0.3),
      transform: [{ scale }],
    };
  }, [enabled, isPressingButton]);
  //#endregion

  return (
    <TapGestureHandler
      enabled={enabled}
      onHandlerStateChange={onHandlerStateChanged}
      shouldCancelWhenOutside={false}>
      <Reanimated.View {...props} style={[buttonStyle, style]}>
        <View style={[styles.button, {backgroundColor: type === 'PHOTO' ? 'rgba(255, 255, 255, 0.5)' : 'red'}]} />
      </Reanimated.View>
    </TapGestureHandler>
  );
};

export const CaptureButton = React.memo(_CaptureButton);

const styles = StyleSheet.create({
  button: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: 'white',
  },
});
