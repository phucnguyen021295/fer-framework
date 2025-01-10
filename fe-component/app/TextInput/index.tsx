import React from "react";
import { TextInput, TextInputProps, StyleSheet, View } from "react-native";
import { SIZE, sizeProps, VARIANT, variantProps } from "../theme";

export interface Props extends TextInputProps {
  containerStyle?: {};
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: sizeProps;
  variant?: variantProps;
  multiline?: boolean
}

const TextInputBase = (props: Props) => {
  const {
    prefix,
    suffix,
    variant = "outlined",
    size = "medium",
    containerStyle = {},
    style = {},
    ...otherProps
  } = props;

  return (
    <View style={[SIZE[size], VARIANT[variant], styles.container, containerStyle]}>
      {prefix && prefix}
      <TextInput
        style={[styles.textInput, style]}
        placeholderTextColor={"#a8a8a8"}
        {...otherProps}
      />
      {suffix && suffix}
    </View>
  );
};

export default TextInputBase;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 8,
    width: "100%",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    height: "100%",
    fontFamily: "Roboto",
  },
});
