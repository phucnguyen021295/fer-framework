import DateTimePickerUI from 'react-native-ui-datepicker';
import {memo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import BottomSheet from '../BottomSheet';
import {SIZE, sizeProps} from '../theme';
import {Text, useTheme} from 'react-native-paper';
import moment, {Moment} from 'moment';
import Button from '../Button';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  value: Moment;
  size?: sizeProps;
  placeholder?: string;
  onChange: (value: Moment) => void;
  defaultValue?: Moment;
  disabled?: boolean;
  containerStyle?: any;
  allowClear?: boolean;
  onClearValue: () => void;
}

function DateTimePicker(props: Props) {
  const {
    value,
    size = 'medium',
    placeholder = '',
    onChange,
    disabled = false,
    containerStyle = {},
    allowClear,
    onClearValue,
  } = props;
  const theme = useTheme();
  const [isVisible, setVisible] = useState(false);
  const [date, setDate] = useState(moment());

  const onChangeSelect = (date: string) => {
    setDate(date);
    setVisible(false);
    onChange(date);
  };

  const onClear = () => {
    onChangeSelect(moment());
    onClearValue();
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
        onPress={() => setVisible(!isVisible)}
        disabled={disabled}>
        <Text style={value ? styles.text : styles.placeholder}>
          {value ? value.format('DD/MM/YYYY') : placeholder}
        </Text>
        {allowClear && value ? (
          <AntDesign
            name="closecircleo"
            size={20}
            color="#898989"
            style={{paddingRight: 8}}
            onPress={onClear}
          />
        ) : (
          <Fontisto
            name="date"
            size={24}
            style={{paddingRight: 8}}
            color={theme.colors.primary}
          />
        )}
      </TouchableOpacity>
      <BottomSheet
        // title={placeholder}
        isVisible={isVisible}
        index={2}
        points={['25%', '56%']}>
        <View style={styles.dateContainer}>
          <DateTimePickerUI
            mode="single"
            locale="vi"
            date={date}
            displayFullDays
            firstDayOfWeek={1}
            onChange={params => onChangeSelect(params.date)}
          />
          <Button
            type="ghost"
            style={{marginHorizontal: 8}}
            onPress={() => setVisible(!isVisible)}>
            Đóng
          </Button>
        </View>
      </BottomSheet>
    </>
  );
}

export default memo(DateTimePicker);

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

  placeholder: {
    fontSize: 16, // Kích thước chữ
    color: '#a8a8a8', //
  },

  itemContainer: {
    paddingVertical: 16,
    // backgroundColor: "#eee",
  },

  disabled: {
    backgroundColor: '#F0F0F0',
  },

  text: {
    fontSize: 16, // Kích thước chữ
    color: '#000000', //
  },

  dateContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
    gap: 12,
  },
});
