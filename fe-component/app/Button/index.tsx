import {Button, ButtonProps} from '@ant-design/react-native';
import React, {memo, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  small: {
    height: 40,
    paddingHorizontal: 10,
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
  const theme = useTheme();
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
          color: theme.colors.primary,
        },
        primaryRaw: {marginLeft: 0, backgroundColor: theme.colors.primary, borderWidth: 0},
        primaryHighlight: {backgroundColor: theme.colors.inversePrimary},
        defaultRaw: {marginLeft: 0},
        ghostRaw: {marginLeft: 0, borderColor: theme.colors.primary},
      }}
      style={[sizeStyles[size], style]}
      {...otherProps}
    />
  );
};

export default memo(ButtonBase);
