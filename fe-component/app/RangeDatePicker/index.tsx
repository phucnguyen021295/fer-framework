import DateTimePickerUI from 'react-native-ui-datepicker';
import {memo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Text, useTheme} from 'react-native-paper';
import moment, {Moment} from 'moment';

import BottomSheet from '../BottomSheet';
import {SIZE, sizeProps} from '../theme';
import Button from '../Button';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  value: [Moment, Moment];
  size?: sizeProps;
  placeholder?: string;
  onChange: (value: Moment) => void;
  defaultValue?: [Moment, Moment];
  disabled?: boolean;
  containerStyle: any;
  allowClear?: boolean;
  onClearValue: () => void;
}

function RangeDatePicker(props: Props) {
  const {
    defaultValue = [moment(), moment()],
    value = [],
    size = 'medium',
    placeholder = '',
    onChange,
    disabled = false,
    containerStyle = {},
    allowClear = false,
    onClearValue
  } = props;
  const theme = useTheme();
  const [isVisible, setVisible] = useState(false);
  const [date, setDate] = useState(value.length > 1 ? value : defaultValue);

  const onChangeSelect = (date: string) => {
    setDate([date.startDate, date.endDate]);
    if (date.startDate && date.endDate) {
      setVisible(false);
      onChange([date.startDate, date.endDate]);
    }
  };

  const onClear = () => {
    setDate(defaultValue);
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
        <Text style={value.length === 2 ? styles.text : styles.placeholder}>
          {value.length === 2
            ? `${value[0].format('DD/MM/YYYY HH:mm')} - ${value[1].format(
                'DD/MM/YYYY HH:mm',
              )}`
            : placeholder}
        </Text>
        {allowClear && value.length === 2 ? (
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
        points={['25%', '55%']}>
        <View style={styles.dateContainer}>
          <DateTimePickerUI
            mode="range"
            locale="vi"
            startDate={date[0]}
            endDate={date[1]}
            displayFullDays
            firstDayOfWeek={1}
            onChange={params => onChangeSelect(params)}
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

export default memo(RangeDatePicker);

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
