import {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Text from '../Text';

interface Props {
  children?: React.ReactNode;
  title?: string;
  style?: any
}

function Empty(props: Props) {
  const {children, title = 'Không có dữ liệu', style} = props;
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('./images/empty-image.png')}
        style={{width: 195, height: 120}}
      />
      {title ? (
        <Text size="Medium" mode="SemiBold">
          {title}
        </Text>
      ) : null}
      {children && children}
    </View>
  );
}

export default memo(Empty);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
