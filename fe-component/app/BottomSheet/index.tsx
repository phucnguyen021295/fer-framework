import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Divider} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Text from '../Text';

interface Props extends BottomSheetModalProps {
  isVisible: boolean;
  title?: string;
  children: React.ReactNode;
  points: string[];
  onClose?: () => void;
  mode?: 'backdrop' | 'un-backdrop';
}

const BottomSheet = (props: Props) => {
  const {bottom} = useSafeAreaInsets();
  const {
    isVisible,
    title,
    children,
    points = ['50%'],
    onClose,
    mode = 'backdrop',
    ...otherProps
  } = props;
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (!bottomSheetRef.current) return;
    if (isVisible) {
      onOpen();
    } else {
      onDismiss();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  // variables
  const snapPoints = useMemo(() => points, [points]);

  // callbacks
  const onOpen = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const onDismiss = () => {
    bottomSheetRef.current?.close();
    onClose && onClose();
  };

  // renders
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      // index={2}
      snapPoints={snapPoints}
      containerStyle={styles.containerStyle}
      onDismiss={onDismiss}
      backdropComponent={backdropProps =>
        mode === 'backdrop' ? (
          <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} />
        ) : null
      }
      {...otherProps}>
      <BottomSheetView style={styles.contentContainer}>
        {title && (
          <>
            <Text size="Medium" mode="SemiBold" style={styles.title}>
              {title}
            </Text>
            <Divider horizontalInset />
            {mode === 'backdrop' && (
              <AntDesign
                name="close"
                size={22}
                color="black"
                style={styles.close}
                onPress={onDismiss}
              />
            )}
          </>
        )}
        {children}
        <View style={{height: bottom + 8}} />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#00000080',
    zIndex: 99,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    paddingTop: 4,
    paddingBottom: 8,
    textTransform: 'uppercase',
  },

  close: {
    position: 'absolute',
    right: 12,
    top: 0,
    padding: 4,
  },
});

export default memo(BottomSheet);
