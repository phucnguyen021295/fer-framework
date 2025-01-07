import {memo, useMemo} from 'react';
import {StyleSheet, TextProps} from 'react-native';
import {useTheme, Text as TextCore} from 'react-native-paper';

interface Props extends TextProps {
  type?: 'Default' | 'Secondary' | 'Link';
  mode?: 'Regular' | 'SemiBold' | 'Bold' | 'Thin' | 'Italic' | 'Light';
  size?:
    | 'Small'
    | 'Normal'
    | 'Medium'
    | 'Larger'
    | 'Big'
    | 'H1'
    | 'H2'
    | 'H3'
    | 'H4'
    | 'H5';
}

function Text(props: Props) {
  const {colors} = useTheme();
  const {
    type = 'Default',
    mode = 'Regular',
    size = 'Normal',
    style,
    ...otherProps
  } = props;

  const _mode = styles[mode];

  const _color = useMemo(() => {
    if (type === 'Link') {
      return {color: colors.primary};
    }

    if (type === 'Secondary') {
      return {color: colors.outline};
    }

    return {color: colors.onBackground};
  }, [type, colors]);

  const _size = styles[size];

  return <TextCore style={[_mode, _size, _color, style]} {...otherProps} />;
}

export default memo(Text);

const styles = StyleSheet.create({
  Regular: {
    fontSize: 14,
    lineHeight: 22,
  },
  SemiBold: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
  },
  Bold: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },
  Thin: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '100',
  },
  Italic: {
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  Light: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '300',
  },
  Small: {
    fontSize: 12,
    lineHeight: 20,
  },
  Normal: {
    fontSize: 14,
    lineHeight: 22,
  },
  Medium: {
    fontSize: 16,
    lineHeight: 24,
  },
  Larger: {
    fontSize: 18,
    lineHeight: 26,
  },
  Big: {
    fontSize: 20,
    lineHeight: 28,
  },
  H1: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: '600',
  },
  H2: {
    fontSize: 30,
    lineHeight: 40,
    fontWeight: '600',
  },
  H3: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  },
  H4: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  H5: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
});
