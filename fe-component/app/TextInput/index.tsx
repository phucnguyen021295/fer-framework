import React from 'react';
import {TextInput, TextInputProps, StyleSheet, View} from 'react-native';

interface Props extends TextInputProps {
  containerStyle?: {};
  name?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const TextInputBase = (props: Props) => {
  const {left, right, containerStyle = {}, style = {}, ...otherProps} = props;
  return (
    <View style={[styles.container, containerStyle]}>
      {left && left}
      <TextInput
        style={[styles.textInput, style]}
        placeholderTextColor={'#868686'}
        {...otherProps}
      />
      {right && right}
    </View>
  );
};

export default TextInputBase;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 8,
    backgroundColor: '#E3ECFF',
    width: '100%',
    height: 44,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    fontFamily: 'SVN-Gilroy'
  },
});
