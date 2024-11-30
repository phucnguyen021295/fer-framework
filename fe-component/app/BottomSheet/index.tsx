import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Divider } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends BottomSheetModalProps {
  isVisible: boolean;
  title?: string;
  children: React.ReactNode;
  points: string[];
  onClose?: () => void;
}

const BottomSheet = (props: Props) => {
  const {bottom} = useSafeAreaInsets();
  const {
    isVisible,
    title,
    children,
    points = ["50%"],
    onClose,
    ...otherProps
  } = props;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (!bottomSheetModalRef.current) return;
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
    bottomSheetModalRef.current?.present();
  }, []);

  const onDismiss = () => {
    bottomSheetModalRef.current?.close();
    onClose && onClose();
  };

  // renders
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      // index={2}
      snapPoints={snapPoints}
      containerStyle={styles.containerStyle}
      onDismiss={onDismiss}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} />
      )}
      {...otherProps}
    >
      <BottomSheetView style={styles.contentContainer}>
        {title && (
          <>
            <Text style={styles.title}>{title}</Text>
            <Divider horizontalInset />
          </>
        )}
        {children}
        <View style={{height: bottom}} />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#00000080",
    zIndex: 99,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    paddingTop: 4,
    paddingBottom: 12,
    fontSize: 16,
    fontWeight: "500",
    textTransform: "uppercase",
    fontFamily: "SVN-Gilroy",
  },
});

export default memo(BottomSheet);
