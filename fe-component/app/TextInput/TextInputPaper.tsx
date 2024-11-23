import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, TextInput, TextInputProps} from 'react-native-paper';

interface Props extends TextInputProps {
  errorMessage?: string | boolean;
}

const TextInputOutlined = (props: Props) => {
  const {errorMessage, ...otherProps} = props;
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        style={styles.input}
        outlineStyle={styles.outlineStyle}
        outlineColor="transparent"
        activeOutlineColor="#246BFD"
        {...otherProps}
      />
      {errorMessage && <Text style={styles.textError}>{errorMessage}</Text>}
    </View>
  );
};

export default memo(TextInputOutlined);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  outlineStyle: {
    backgroundColor: '#E3ECFF',
  },
  input: {
    height: 44,
  },
  textError: {
    color: 'red',
    paddingTop: 4,
    fontSize: 12,
  },
});
