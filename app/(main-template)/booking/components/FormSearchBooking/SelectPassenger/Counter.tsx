import React, { useState } from "react";
import { Button, Space, Typography } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";

const {Text} = Typography;

interface Props {
    max: number;
    min: number;
    limited: number;
    defaultValue: number;
    onChange: (count: number) => void
}

const Counter = (props: Props) => {
    const {max, min, limited, defaultValue, onChange} = props;
    const {styles} = useStyles();
  const [count, setCount] = useState(defaultValue);

  const handleIncrement = () => {
    setCount(count + 1);
    onChange(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
    onChange(count - 1);
  };

  return (
    <Space align="center">
      <Button
        type="text"
        shape="circle"
        icon={<MinusCircleOutlined style={{ color: count === min ? "#f9cacf" : "#ed1c24", fontSize: 20 }} />}
        onClick={handleDecrement}
        disabled={count === min}
      />
      <Text className={styles.count}>{count}</Text>
      <Button
        type="text"
        shape="circle"
        icon={<PlusCircleOutlined style={{ color: (max === count || limited === 0) ? "#f9cacf" : "#ed1c24", fontSize: 20 }} />}
        onClick={handleIncrement}
        disabled={ max === count || limited === 0 }
      />
    </Space>
  );
};

export default Counter;

const useStyles = createStyles(({ token, css }) => ({
    count: css`
      font-size: 16px;
      font-weight: 500;
    `,
  }));
