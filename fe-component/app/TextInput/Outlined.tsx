import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import { SIZE } from "../theme";

interface Props extends TextInputProps {
  size?: "small" | "medium" | "large";
}

const OutlinedPaper = (props: Props) => {
  const { size = "medium", style, outlineStyle, ...otherProps } = props;
  return (
    <TextInput
      mode="outlined"
      style={[SIZE[size], style]}
      outlineStyle={styles.outlineStyle}
      outlineColor="transparent"
      activeOutlineColor="#246BFD"
      {...otherProps}
    />
  );
};

export default memo(OutlinedPaper);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  outlineStyle: {
    backgroundColor: "#E3ECFF",
  },
});
