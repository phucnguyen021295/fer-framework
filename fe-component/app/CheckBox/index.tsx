import React, {memo} from 'react';
import {View, StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Text from '../Text';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props extends TouchableOpacityProps {
  checked: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

const Checkbox = (props: Props) => {
  const {checked, label, onChange, disabled, ...otherProps} = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onChange}
      activeOpacity={0.8}
      disabled={disabled}
      {...otherProps}
      >
      <View style={[styles.checkbox, disabled && styles.disabled]}>
        {checked && (
          <AntDesign name="check" size={18} color="#00AEEF" />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default memo(Checkbox);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "flex-start",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#171717',
    flex: 1,
    paddingTop: 2
  },

  disabled: {
    backgroundColor: '#F0F0F0'
  }
});
