import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
  RefreshControl,
} from 'react-native';
import {concat} from 'lodash';
import {FlashList, FlashListProps} from '@shopify/flash-list';

// Apis
import {sortByDay} from '../../../utils/sortDataByDay';
import ListHeaderComponent from './ListHeaderComponent';
import ListFooterComponent from './ListFooterComponent';

interface Props extends FlashListProps<any> {
  data: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isFetching: boolean;
  refetch: () => void;
  setPage: (page: number) => void;
  page: number;
}

function FlashListBase(props: Props) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    refetch,
    setPage,
    page = 1,
  } = props;
  const progetDataRef = useRef(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (data?.items) {
      setList(prevState => {
        const _data = concat(prevState, data?.items);
        return sortByDay(_data);
      });
      progetDataRef.current = false;
    }
  }, [data]);

  const onScroll = (event: any) => {
    // const {isGetDataFull} = this.props;
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    if (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 500 &&
      list.length > 0 &&
      list.length < data?.total &&
      !progetDataRef.current
    ) {
      progetDataRef.current = true;
      setPage(page + 1);
    }
  };

  const onRefresh = () => {
    refetch();
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const _ListHeaderComponent = () => (
    <ListHeaderComponent
      isLoading={isLoading}
      isError={isError}
      data={list}
      isSuccess={isSuccess}
      refetch={refetch}
    />
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const _ListFooterComponent = () => (
    <ListFooterComponent
      isFetching={isFetching}
      isError={isError}
      data={list}
      isSuccess={isSuccess}
      refetch={refetch}
    />
  );

  return (
    <FlashList
      data={list}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: false,
        listener: onScroll,
      })}
      refreshControl={
        !isLoading ? (
          <RefreshControl
            size={20}
            tintColor={'#246BFD'}
            refreshing={isFetching}
            onRefresh={onRefresh}
          />
        ) : null
      }
      ListHeaderComponent={_ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={_ListFooterComponent}
      contentContainerStyle={{paddingBottom: 40}}
      estimatedItemSize={223.3}
      viewabilityConfig={{
        viewAreaCoveragePercentThreshold: 50, // Thiết lập tỷ lệ phần trăm cần thiết để một item được xem là đã hiển thị
      }}
    />
  );
}

export default memo(FlashListBase);
