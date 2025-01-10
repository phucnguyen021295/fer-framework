import Text from "@/fe-component/Text";
import React, { memo, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

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
        <Text style={styles.label}>
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
    marginBottom: 16,
  },
  label: {
    paddingBottom: 6,
    color: '#414651'
  },

  textError: {
    color: "red",
    paddingTop: 4,
    fontSize: 12,
  },
});
