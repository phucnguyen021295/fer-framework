import React, {memo} from 'react';
import {TextInputProps, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import TextInput from './index';

interface Props extends TextInputProps {
  containerStyle?: {};
  label: string;
  name: string;
  error?: string;
}

const FeildBase = (props: Props) => {
  const {containerStyle = {}, label, name, error, ...otherProps} = props;
  return (
    <>
      <Text variant="labelLarge" style={styles.label}>
        {label}
      </Text>
      <View style={styles.field}>
        <TextInput
          name={name}
          placeholder={label}
          containerStyle={containerStyle}
          {...otherProps}
        />
        {error && <Text style={styles.textError}>{error}</Text>}
      </View>
    </>
  );
};

export default memo(FeildBase);

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '400'
  },
  field: {
    marginVertical: 8,
  },
  textError: {
    color: 'red',
    paddingTop: 4,
    fontSize: 12,
  },
});
