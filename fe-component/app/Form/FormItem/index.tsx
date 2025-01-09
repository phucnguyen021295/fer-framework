import React, { memo, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  label?: string;
  name: string;
  error?: string;
  children: ReactNode;
  require?: boolean;
}

const FormItem = (props: Props) => {
  const { children, label, name, error, require } = props;
  return (
    <View style={styles.container}>
      {label ? (
        <Text variant="labelLarge" style={styles.label}>
          {label} {require && <Text style={{color: 'red'}}>*</Text>}
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
    fontSize: 14,
    paddingBottom: 8,
    lineHeight: 22,
    fontWeight: 400,
    color: '#414651'
  },

  textError: {
    color: "red",
    paddingTop: 4,
    fontSize: 12,
  },
});
