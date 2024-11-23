import React, { useRef, useState } from "react";
import { Button, Col, Divider, Flex, Row, Segmented, Typography } from "antd";
import { createStyles } from "antd-style";
import { SearchOutlined } from "@ant-design/icons";
import FlightName from "./FlightName";
import Airlines from "./Airlines";
import SearchModal from "../SearchModal";

const { Title, Text } = Typography;

const PriceTracking: React.FC = () => {
  const { styles } = useStyles();

  return (
    <Flex className={styles.container} vertical gap={12}>
      <Flex justify="space-between" wrap className={styles.row1}>
        <Flex align="center" wrap gap={12}>
          <SearchModal />
          <FlightName />
          <Divider type="vertical" />
          <Text strong>Thứ 5, 25 thg 4 2024</Text>
          <Divider type="vertical" />
          <Text strong>1 hành khách</Text>
          <Divider type="vertical" />
          <Text strong>Phổ thông</Text>
        </Flex>
      </Flex>

      <Row gutter={12} style={{ paddingBottom: 20 }}>
        <Col xs={24} md={12} lg={8} xl={5}>
          <Airlines placeholder="Hãng hàng không" />
        </Col>
        <Col xs={24} md={12} lg={6} xl={5} style={{ display: "flex" }}></Col>
        <Col xs={24} md={12} lg={12} xl={10}></Col>
      </Row>
    </Flex>
  );
};

export default PriceTracking;

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    margin: 20px 0;
    padding: 12px;
    /* min-height: calc(100vh - 102px); */
    border-radius: 12px;
    background-color: ${token.colorBgContainer};
  `,

  row1: css`
    padding: 12px;
    border-radius: 12px;
    background-color: ${token.colorBgLayout};
  `,
}));
