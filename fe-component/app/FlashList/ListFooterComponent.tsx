import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import Loading from './Loading';

interface FooterProps {
  isSuccess: boolean;
  isError: boolean;
  isFetching: boolean;
  refetch: () => void;
  data: any;
}

const ListFooterComponent = (props: FooterProps) => {
  const {data, isError, isFetching, refetch} = props;

  if (isFetching && data.length > 0) return <Loading />;

  if (isError && data.length > 0) {
    return (
      <View style={styles.wrapper}>
        <Text>Đã có lỗi xảy ra. Vui lòng thử lại sau</Text>
        <Button
          style={{paddingTop: 4}}
          labelStyle={styles.labelStyle}
          mode="text"
          onPress={() => refetch()}>
          Thử lại
        </Button>
      </View>
    );
  }

  return null;
};

export default memo(ListFooterComponent);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  labelStyle: {
    color: '#246AF9',
  },
});
