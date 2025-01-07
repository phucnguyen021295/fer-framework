import React, {memo, useCallback, useMemo, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Sử dụng thư viện icon
import BottomSheet from '../BottomSheet';
import {SIZE, sizeProps} from '../theme';
import {Divider, useTheme} from 'react-native-paper';
import TextInput from '../TextInput';
import Tree from '../Tree';

function findTitleById(nodes, targetId) {
    for (let node of nodes) {
      // Check if the current node has the matching ID
      if (node.value === targetId) {
        return node.label; // Return the title if a match is found
      }
      // Recursively search the children if they exist
      if (node.children && node.children.length > 0) {
        const label = findTitleById(node.children, targetId);
        if (label) return label; // Return title if found in children
      }
    }
    return null; // Return null if no matching ID is found
  }

interface Props {
  value?: string;
  size?: sizeProps;
  right?: React.ReactNode;
  data: {label: string; value: string, children?: []}[];
  placeholder?: string;
  itemComponent?: ({item}: {item: any}) => React.ReactNode;
  onChange: (value: string) => void;
  screen?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  defaultExpand?: boolean;
}

const TreeSelect = (props: Props) => {
  const theme = useTheme();
  const {
    value,
    data = [],
    size = 'medium',
    right,
    placeholder = '',
    onChange,
    containerStyle = {},
    disabled = false,
    defaultExpand = false,
  } = props;
  const [isVisible, setVisible] = useState(false);

  const label = useMemo(() => findTitleById(data, value), [value, data]);

  const onChangeSelect = (node: any) => {
    onChange(node.value);
    setVisible(false);
  };

  const onSelect = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          SIZE[size],
          styles.container,
          disabled && styles.disabled,
          containerStyle,
        ]}
        onPress={onSelect}
        disabled={disabled}>
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
        index={2}
        points={['25%', '50%', '90%']}>
        {/* <View style={{marginHorizontal: 20, paddingTop: 8}}>
          <TextInput placeholder={'Tìm kiếm'} />
        </View> */}
        <View style={{flex: 1, paddingHorizontal: 20}}>
        <Tree data={data} onSelect={onChangeSelect} defaultExpand={defaultExpand} />
        </View>
      </BottomSheet>
    </>
  );
};

export default memo(TreeSelect);

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
    paddingVertical: 16,
    // backgroundColor: "#eee",
  },

  disabled: {
    backgroundColor: '#efeded',
  },
});
