import React, { memo, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  label?: string;
  name: string;
  error?: string;
  children: ReactNode;
}

const FormItem = (props: Props) => {
  const { children, label, name, error } = props;
  return (
    <View style={styles.container}>
      {label ? (
        <Text variant="labelLarge" style={styles.label}>
          {label}
        </Text>
      ) : null}
      {children}
      {error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};

export default memo(FormItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    paddingBottom: 8,
    lineHeight: 16 * 1.5,
    fontWeight: 500,
    color: '#2E2E2E'
  },

  textError: {
    color: "red",
    paddingTop: 4,
    fontSize: 12,
  },
});
