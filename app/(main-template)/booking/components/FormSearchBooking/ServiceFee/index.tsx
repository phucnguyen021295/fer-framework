import React, { useState } from "react";
import { Flex, InputNumber, Typography } from "antd";

const { Text } = Typography;

const ServiceFee = () => {
    const [value, setValue] = useState(0);
    const onChange = (_value) => {
        setValue(_value)
    }

  return (
    <Flex gap={8} align="center">
      <Text>Phí dịch vụ(VNĐ): </Text>
      <InputNumber
        style={{ width: "100%", flex: 1 }}
        value={value}
        size="large"
        onChange={onChange}
        // formatter={(value) =>
        //   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ"
        // }
        // parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        min={0} // Giá trị tối thiểu là 0
        step={1000} // Bước nhảy giá trị là 1.000 VNĐ
        placeholder="Nhập số tiền VNĐ"
      />
    </Flex>
  );
};

export default ServiceFee;
