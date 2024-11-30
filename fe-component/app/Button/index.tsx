import React, { memo } from "react";
import { Button, ButtonProps } from "react-native-paper";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  small: {
    height: 40,
    paddingHorizontal: 10,
  },
  medium: {
    height: 44,
    paddingHorizontal: 12,
    paddingVertical: 2
  },
  large: {
    height: 48,
    paddingVertical: 4
  },
});

const sizeStyles = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

interface Props extends ButtonProps {
  size?: "small" | "medium" | "large";
}

const ButtonBase = (props: Props) => {
  const { size = "medium", style, ...otherProps } = props;
  return (
    <Button mode="contained" style={[sizeStyles[size], style]} {...otherProps}>
      {props.children}
    </Button>
  );
};

export default memo(ButtonBase);
