import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

// Components
import Loading from './Loading';
import Empty from '../Empty';
import Button from '../Button';

interface HeaderProps {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => void;
  data: [];
}

const ListHeaderComponent = (props: HeaderProps) => {
  const {data, isLoading, isSuccess, isError, refetch} = props;
  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess && data.length === 0) {
    return (
      <View style={styles.wrapper}>
        <Empty />
      </View>
    );
  }

  if (isError && data.length === 0) {
    return (
      <View style={styles.wrapper}>
        <Text>Đã có lỗi xảy ra. Vui lòng thử lại sau</Text>
        <Button size="small" type="ghost" onPress={() => refetch()}>Thử lại</Button>
      </View>
    );
  }

  return null;
};

export default memo(ListHeaderComponent);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 12,
  },

  labelStyle: {
    color: '#246AF9',
  },
});
