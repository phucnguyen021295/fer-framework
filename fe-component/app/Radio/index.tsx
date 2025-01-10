import React, {memo} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Text from '../Text';

interface Props extends TouchableOpacityProps {
  checked: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

const Radio = (props: Props) => {
  const {checked, label, onChange, disabled, ...otherProps} = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onChange}
      activeOpacity={0.8}
      disabled={disabled}
      {...otherProps}>
      <View style={[styles.checkbox, disabled && styles.disabled]}>
        {checked ? (
          <Fontisto name="radio-btn-active" size={22} color="#00AEEF" />
        ) : (
          <Fontisto name="radio-btn-passive" size={22} color="#CCCCCC" />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default memo(Radio);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    // borderWidth: 1,
    // borderColor: '#CCCCCC',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#171717',
    flex: 1,
    paddingTop: 2,
  },

  disabled: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
  }
});
