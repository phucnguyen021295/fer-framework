import * as React from 'react';
import {useCallback, useRef, useState} from 'react';
import type {AlertButton} from 'react-native';
import {
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import type {Code} from 'react-native-vision-camera';
import {useCameraDevice, useCodeScanner} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {StatusBarBlurBackground} from '@/fe-module-media/components/StatusBarBlurBackground';
import {useIsForeground} from '@/fe-core/hooks/useIsForeground';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WrapperPermission from '@/fe-module-media/components/WrapperPermission';
import {BlurView} from '@react-native-community/blur';
import Text from '@/fe-component/Text';

const showCodeAlert = (value: string, onDismissed: () => void): void => {
  const buttons: AlertButton[] = [
    {
      text: 'Close',
      style: 'cancel',
      onPress: onDismissed,
    },
  ];
  if (value.startsWith('http')) {
    buttons.push({
      text: 'Open URL',
      onPress: () => {
        Linking.openURL(value);
        onDismissed();
      },
    });
  }
  Alert.alert('Scanned Code', value, buttons);
};

function CodeScannerPage(props) {
  const navigation = useNavigation();
  const {top, left, right} = useSafeAreaInsets();
  const {route} = props;
  const {onScanSuccess} = route.params;
  const {width, height} = useWindowDimensions();
  // 1. Use a simple default back camera
  const device = useCameraDevice('back');
  const [scanned, setScanned] = useState(false);
  const [scanArea, setScanArea] = useState({
    x: 0.1, // 10% from the left of the screen
    y: 0.3, // 30% from the top of the screen
    width: 0.8, // 80% width
    height: 0.35, // 40% height
  });

  // 2. Only activate Camera when the app is focused and this screen is currently opened
  const isFocused = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocused && isForeground;

  // 3. (Optional) enable a torch setting
  const [torch, setTorch] = useState(false);

  // 4. On code scanned, we show an aler to the user
  const onCodeScanned = useCallback(
    (codes: Code[]) => {
      if (!codes.length || scanned) return;

      const {frame, value, corners} = codes[0];

      // // Chuyển đổi scanArea từ phần trăm sang pixel
      // const scanAreaPixel = {
      //   left: scanArea.x * frame.width,
      //   top: scanArea.y * frame.height,
      //   right: (scanArea.x + scanArea.width) * frame.width,
      //   bottom: (scanArea.y + scanArea.height) * frame.height,
      // };
      // console.log('scanAreaPixel', scanAreaPixel);
      // console.log('corners', corners);

      // // Kiểm tra mã QR nằm trong vùng quét
      // // Kiểm tra nếu tất cả các góc đều nằm trong vùng quét
      // const isBarcodeFullyInsideArea = corners.every(
      //   corner =>
      //     corner.x >= scanAreaPixel.left &&
      //     corner.x <= scanAreaPixel.right &&
      //     corner.y >= scanAreaPixel.top &&
      //     corner.y <= scanAreaPixel.bottom,
      // );
      // console.log('isBarcodeFullyInsideArea', isBarcodeFullyInsideArea);
      setScanned(true);
      console.log('Scanned Code:', value);
      onScanSuccess(value);
      navigation.goBack();
      return true;
      // if (isBarcodeFullyInsideArea) {
      //   setScanned(true);
      //   console.log('Scanned Code:', value);
      //   onScanSuccess(value);
      //   showCodeAlert(value, () => setScanned(false));
      // }
    },
    [scanArea, width, height, scanned],
  );

  // 5. Initialize the Code Scanner to scan QR codes and Barcodes
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: onCodeScanned,
    regionOfInterest: {
      x: scanArea.x, // Relative x-coordinate (percentage of width)
      y: scanArea.y, // Relative y-coordinate (percentage of height)
      width: scanArea.width, // Relative width
      height: scanArea.height, // Relative height
    },
  });

  return (
    <WrapperPermission type={'PHOTO'} device={device}>
      <View style={styles.container}>
        {device != null && (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            codeScanner={codeScanner}
            torch={torch ? 'on' : 'off'}
            enableZoomGesture={true}
          />
        )}

        <StatusBarBlurBackground />

        <View style={[styles.des, {top: scanArea.y * height - 48}]}>
          <Text mode="SemiBold" size="Larger" style={{textAlign: 'center', color: '#fff'}}>Di chuyển lại gần mã QR code</Text>
        </View>

        <View style={styles.overlay}>
          {/* Top Dark Section */}
          <BlurView
            style={[
              styles.darkSection,
              {top: 0, left: 0, right: 0, height: scanArea.y * height},
            ]}
            blurAmount={25}
            blurType="light"
            reducedTransparencyFallbackColor={'rgba(140, 140, 140, 0.3)'}
          />

          {/* Left Dark Section */}
          <BlurView
            style={[
              styles.darkSection,
              {
                left: 0,
                top: scanArea.y * height,
                bottom: (1 - scanArea.y - scanArea.height) * height,
                width: scanArea.x * width,
              },
            ]}
            blurAmount={25}
            blurType="light"
            reducedTransparencyFallbackColor={'rgba(140, 140, 140, 0.3)'}
          />

          {/* Right Dark Section */}
          <BlurView
            style={[
              styles.darkSection,
              {
                right: 0,
                top: scanArea.y * height,
                bottom: (1 - scanArea.y - scanArea.height) * height,
                width: (1 - scanArea.x - scanArea.width) * width,
              },
            ]}
            blurAmount={25}
            blurType="light"
            reducedTransparencyFallbackColor={'rgba(140, 140, 140, 0.3)'}
          />

          {/* Bottom Dark Section */}
          <BlurView
            style={[
              styles.darkSection,
              {
                bottom: 0,
                left: 0,
                right: 0,
                height: (1 - scanArea.y - scanArea.height) * height,
              },
            ]}
            blurAmount={25}
            blurType="light"
            reducedTransparencyFallbackColor={'rgba(140, 140, 140, 0.3)'}
          />

          {/* Scanable Area */}
          <View
            style={[
              styles.scanArea,
              {
                left: `${scanArea.x * 100}%`,
                top: `${scanArea.y * 100}%`,
                width: `${scanArea.width * 100}%`,
                height: `${scanArea.height * 100}%`,
              },
            ]}
          />
        </View>

        <View
          style={[styles.rightButtonRow, {top: top + 12, right: right || 12}]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setTorch(!torch)}>
            <IonIcon
              name={torch ? 'flash' : 'flash-off'}
              color="white"
              size={24}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.leftButtonRow, {top: top + 12, left: left || 12}]}>
          <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
            <IonIcon name="close" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </WrapperPermission>
  );
}

export default CodeScannerPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0, // Dark overlay at the bottom
  },

  des: {position: 'absolute', left: 0, right: 0, zIndex: 10},
  darkSection: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black for dark effect
  },
  scanArea: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'green', // Highlight the scan area with green border
    backgroundColor: 'transparent', // Make scan area clear (no fill)
    zIndex: 1, // Scan area on top of the dark overlay
  },

  button: {
    marginBottom: 12,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: 12,
    top: 44,
  },
  backButton: {
    position: 'absolute',
    left: 12,
    top: 44,
  },
  leftButtonRow: {
    position: 'absolute',
    left: 20,
    top: 44,
  },
});
