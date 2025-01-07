import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator color={'#246BFD'} />
  </View>
);

export default memo(Loading);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
});
