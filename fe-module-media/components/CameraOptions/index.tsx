import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

interface Props {
    style:  any;
    setType: (value: string) => void;
    type: string;
    options: string[]
}

const CameraOptions = (props: Props) => {
  const {style, options, setType, type} = props;
  const translateXAnim = useRef(new Animated.Value(0)).current;

  const handlePress = (item, index) => {
    setType(item);

    // Tính vị trí trượt dựa trên chỉ số của item
    const targetPosition = index * (width / options.length);

    // Thực hiện animation
    Animated.timing(translateXAnim, {
      toValue: targetPosition,
      duration: 300, // Thời gian trượt
      useNativeDriver: true,
    }).start();
  };

  const renderOption = ({item, index}) => {
    const isSelected = type === item;

    return (
      <TouchableOpacity onPress={() => handlePress(item, index)}>
        <View style={styles.optionContainer}>
          <Text style={[styles.optionText, isSelected && styles.selectedText]}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={options}
        horizontal
        renderItem={renderOption}
        keyExtractor={item => item}
        contentContainerStyle={styles.optionsList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  optionsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionContainer: {
    paddingVertical: 10,
    width: width / 4, // Đảm bảo kích thước đều nhau
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Shadow cho Android
    elevation: 5,
  },
  optionText: {
    fontSize: 14,
    color: '#aaa',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  slider: {
    position: 'absolute',
    bottom: 0,
    height: 5,
    width: width / 4, // Chiều rộng của slider theo mỗi mục
    backgroundColor: '#333',
    borderRadius: 5,
  },
});

export default CameraOptions;
