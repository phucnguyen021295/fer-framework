import React, { memo } from "react";
import { DatePicker, Input, Select, Slider, Typography } from "antd";

const { Text } = Typography;

// Định nghĩa kiểu dữ liệu cho filter item
interface FilterItem {
  title: string;
  placeholder: string;
  name: string;
  operation: string;
  type: "DatePicker" | "Select" | "Input" | "Slider";
  urlApi?: string;
  values?: Array<{ label: string; value: string }>;
  value?: any;
  format?: string;
  showTime?: boolean;
}

interface Props {
  item: FilterItem;
  style?: any;
}

const FilterControl = (props: Props) => {
  const { item, style, ...otherProps } = props;
  switch (item.type) {
    case "DatePicker":
      return (
        <DatePicker
          placeholder={item.placeholder}
          style={{ width: "100%", ...style }}
          format={item.format}
          showTime={item.showTime}
          {...otherProps}
        />
      );

    case "Select":
      return (
        <Select
          placeholder={item.placeholder}
          style={{ width: "100%", ...style }}
          options={item.values || []}
          allowClear
          {...otherProps}
        />
      );

    case "Input":
      return <Input placeholder={item.placeholder} {...otherProps} />;
    case "Slider":
      return (
        <>
          <Slider
            range
            defaultValue={item.value}
            min={item.value?.[0] || 0}
            max={item.value?.[1] || 100}
            style={style}
            {...otherProps}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <Text type="secondary">{item.value?.[0].toLocaleString()}</Text>
            <Text type="secondary">{item.value?.[1].toLocaleString()}</Text>
          </div>
        </>
      );

    default:
      return null;
  }
};

export default memo(FilterControl);
