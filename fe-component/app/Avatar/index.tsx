import FastImage from '@d11/react-native-fast-image';
import React, {memo, useMemo} from 'react';
import {Surface} from 'react-native-paper';

export type SIZE = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Big' | 'Bigger' | 'Biggest' | 'Huge';

export const SIZE_AVATAR = {
  Tiny: 24,
  Small: 32,
  Medium: 40,
  Large: 48,
  Big: 64,
  Bigger: 72,
  Biggest: 96,
  Huge: 124,
};

interface Props {
  uri: string;
  size?: SIZE;
  elevation?: number;
}

function AvatarBase(props: Props) {
  const {uri, size = 'Medium', elevation = 0} = props;

  const avatar_style = useMemo(() => {
    return {
      width: SIZE_AVATAR[size],
      height: SIZE_AVATAR[size],
      borderRadius: SIZE_AVATAR[size] / 2,
    };
  }, [size]);

  return (
    <Surface
      elevation={elevation}
      style={avatar_style}>
      <FastImage
        source={
          uri
            ? {uri: `${uri}?time=${new Date().getTime()}`}
            : require('./images/user.png')
        }
        style={avatar_style}
      />
    </Surface>
  );
}

export default memo(AvatarBase);
