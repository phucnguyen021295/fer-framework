import {memo} from 'react';
import {StyleProp, View as ViewCore, ViewProps, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

interface Props extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

function ViewTheme(props: Props) {
  const theme = useTheme();
  const {style, ...otherProps} = props;
  return (
    <ViewCore
      style={[{backgroundColor: theme.fill_base}, style]}
      {...otherProps}
    />
  );
}

export default memo(ViewTheme);
