import React, {memo, useCallback, useMemo, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from '../BottomSheet';
import {SIZE, sizeProps} from '../theme';
import {Divider, useTheme} from 'react-native-paper';
import {BottomSheetFlashList} from '@gorhom/bottom-sheet';
import TextInput from '../TextInput';
import {useNavigation} from '@react-navigation/native';
import ListHeaderComponent from '../FlashList/ListHeaderComponent';

interface Props {
  value?: string;
  size?: sizeProps;
  right?: React.ReactNode;
  data: {label: string; value: string}[];
  placeholder?: string;
  itemComponent?: ({item}: {item: any}) => React.ReactNode;
  onChange: (value: string) => void;
  disabled?: boolean;
  containerStyle: any;
  screen?: string;
  index?: number;
}

const Select = (props: Props) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {
    value,
    data = [],
    size = 'medium',
    right,
    placeholder = '',
    itemComponent,
    onChange,
    disabled = false,
    containerStyle = {},
    screen = '',
    index = 1,
  } = props;
  const [isVisible, setVisible] = useState(false);

  const label = useMemo(() => {
    const _item = data.filter(item => item.value === value);
    if (_item.length > 0) {
      return _item[0].label;
    }
    return '';
  }, [value, data]);

  const onChangeSelect = (value: string) => {
    onChange(value);
    setVisible(false);
  };

  const onSelect = () => {
    if (screen) {
      navigation.navigate(screen, {onChangeSelect: value => onChange(value)});
      return;
    }
    setVisible(!isVisible);
  };

  const renderItem = useCallback(({item}) => {
    return (
      <>
        <TouchableOpacity
          key={item.value}
          style={styles.itemContainer}
          onPress={() => onChangeSelect(item.value)}
          activeOpacity={0.8}>
          {itemComponent ? itemComponent({item}) : <Text>{item.label}</Text>}
        </TouchableOpacity>
        <Divider />
      </>
    );
  }, []);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled}
        style={[
          SIZE[size],
          styles.container,
          disabled && styles.disabled,
          containerStyle,
        ]}
        onPress={onSelect}>
        <Text style={label ? styles.text : styles.placeholder}>
          {label ? label : placeholder}
        </Text>
        {right ? (
          right
        ) : (
          <Ionicons
            name="chevron-down"
            size={24}
            style={{paddingRight: 8}}
            color={theme.colors.onSecondaryContainer}
          />
        )}
      </TouchableOpacity>
      <BottomSheet
        title={placeholder}
        isVisible={isVisible}
        index={index}
        points={['25%', '50%', '90%']}>
        <View style={{marginHorizontal: 20, paddingTop: 8}}>
          <TextInput placeholder={'Tìm kiếm'} />
        </View>

        <BottomSheetFlashList
          data={data}
          keyExtractor={item => item.value}
          renderItem={renderItem}
          estimatedItemSize={43.3}
          ListHeaderComponent={
            <ListHeaderComponent data={data} isSuccess={true} />
          }
          contentContainerStyle={{paddingHorizontal: 20}}
        />
      </BottomSheet>
    </>
  );
};

export default memo(Select);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Sắp xếp theo hàng ngang
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'space-between', // Giãn cách giữa Text và Icon
    borderWidth: 1, // Đường viền
    borderColor: '#D9D9D9', // Màu viền
    paddingRight: 0, // Khoảng cách padding ngang
    backgroundColor: '#FFFFFF', // Màu nền trắng
    borderRadius: 8,
  },
  text: {
    fontSize: 16, // Kích thước chữ
    color: '#000000', //
  },

  placeholder: {
    fontSize: 16, // Kích thước chữ
    color: '#a8a8a8', //
  },

  itemContainer: {
    paddingVertical: 12,
    // backgroundColor: "#eee",
  },

  disabled: {
    backgroundColor: '#F0F0F0',
  },
});
