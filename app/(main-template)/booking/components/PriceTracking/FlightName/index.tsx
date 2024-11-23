import React, { useRef, useState } from "react";
import { Button, Col, Flex, Row, Segmented, Typography } from "antd";
import { createStyles } from "antd-style";
import { SwapOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const FlightName: React.FC = () => {
  const { styles } = useStyles();

  return (
    <Flex align="center" gap={12}>
      <Text strong>Hà nội (HAN)</Text>
      <SwapOutlined />
      <Text strong>TP HCM (SGN)</Text>
    </Flex>
  );
};

export default FlightName;

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    margin: 20px;
    padding: 20px;
    /* min-height: calc(100vh - 102px); */
    border-radius: 12px;
    background-color: ${token.colorBgContainer};
  `,
}));
