import {Button, ButtonProps} from '@ant-design/react-native';
import React, {memo, useMemo} from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  small: {
    height: 36,
    paddingHorizontal: 12,
  },
  medium: {
    height: 44,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  large: {
    height: 48,
    paddingVertical: 4,
  },
});

const sizeStyles = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

interface Props extends ButtonProps {
  size?: 'small' | 'medium' | 'large';
}

const ButtonBase = (props: Props) => {
  const {size = 'medium', style, ...otherProps} = props;

  const _fontSize = useMemo(() => {
    if (size === 'small') return 14;
    return 16;
  }, [size]);
  return (
    <Button
      styles={{
        defaultRawText: {fontSize: _fontSize, fontFamily: 'Roboto'},
        primaryRawText: {fontSize: _fontSize, fontFamily: 'Roboto'},
        ghostRawText: {
          fontSize: _fontSize,
          fontFamily: 'Roboto',
        },
      }}
      style={[sizeStyles[size], style]}
      {...otherProps}
    />
  );
};

export default memo(ButtonBase);
