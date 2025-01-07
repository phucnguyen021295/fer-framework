import {StyleProp, View as ViewCore, ViewProps, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

interface Props extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

function View(props: Props) {
  const {colors} = useTheme();
  const {style, ...otherProps} = props;
  return (
    <ViewCore
      style={[{backgroundColor: colors.background}, style]}
      {...otherProps}
    />
  );
}

export default View;
