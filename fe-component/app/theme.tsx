import {StyleSheet} from 'react-native';

export type sizeProps = 'small' | 'medium' | 'large';

const size = StyleSheet.create({
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

export const SIZE = {
  small: size.small,
  medium: size.medium,
  large: size.large,
};

export type variantProps = 'outlined' | 'filled' | 'borderless';

const variant = StyleSheet.create({
  outlined: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
  },
  filled: {
    backgroundColor: '#E3ECFF',
  },
  borderless: {
    borderWidth: 0,
  },
});

export const VARIANT = {
  outlined: variant.outlined,
  filled: variant.filled,
  borderless: variant.borderless
}

