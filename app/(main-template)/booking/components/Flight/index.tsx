import React from "react";
import {
  Card,
  Row,
  Col,
  Flex,
  Typography,
  Button,
  Select,
  Space,
  Divider,
  Tag,
} from "antd";
import { CrownOutlined, DownOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import Image from "next/image";

const { Text, Title } = Typography;
const { Option } = Select;

const FlightCard: React.FC = () => {
  const { styles } = useStyles();
  return (
    <Flex className={styles.container} vertical>
      <Row gutter={[24, 12]} align="middle" justify={"space-between"}>
        <Col md={12} lg={6} xl={5} xxl={4}>
          <Flex align="center" gap={12}>
            <Image
              src={require("@/public/icon/vietjet-air.svg")}
              alt="vietjet-air"
            />
            <Flex vertical>
              <Title level={5} style={{marginBottom: 0}}>VietJet Air</Title>
              <Text>VJ178</Text>
            </Flex>
          </Flex>
        </Col>
        <Col md={12} lg={6} xl={5} xxl={4}>
          <Flex align="center" gap={8} justify="flex-end">
            <Flex vertical align="center">
              <Title level={4} style={{ marginBottom: 0 }}>
                20:05
              </Title>
              <Text type="secondary">HAN</Text>
            </Flex>
            <Image src={require("@/public/icon/flight.svg")} alt="flight" />
            <Flex vertical align="center">
              <Title level={4} style={{ marginBottom: 0 }}>
                22:05
              </Title>
              <Text type="secondary">HAN</Text>
            </Flex>
          </Flex>
        </Col>
        <Col md={12} lg={6} xl={5} xxl={4}>
          <Flex>
            <Select
              defaultValue="Hạng phổ thông"
              size="large"
              // suffixIcon={<CrownOutlined />}
              suffixIcon={<DownOutlined />}
            >
              <Option value="eco">Hạng phổ thông</Option>
              <Option value="business">
                <CrownOutlined style={{ color: "#E5A400" }} /> Hạng thương gia
              </Option>
            </Select>
          </Flex>
        </Col>
        <Col md={12} lg={6} xl={5} xxl={4}>
          <Flex gap={12} align="center" justify="flex-end">
            <Flex vertical align="flex-end">
              <Text type="success" strong style={{ fontSize: 12 }}>
                Giảm 667.440 VNĐ
              </Text>
              <Title level={5} style={{ margin: 0 }}>
                1.589.000 VNĐ<Text type="secondary">/khách</Text>
              </Title>
              <Text
                type="danger"
                style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.67 }}
              >
                Còn 16 vé
              </Text>
            </Flex>
          </Flex>
        </Col>
      </Row>
      <Divider style={{ margin: "16px 0" }} />
      <Row gutter={[14, 12]} align="middle" justify={"space-between"}>
        <Col md={12}>
          <Flex>
            <Button type="text">Chi tiết</Button>
            <Button type="text">Chi tiết giá vé</Button>
            <Button type="text">Tiện ích đi kèm</Button>
            <Button type="default" shape="circle">
              23
            </Button>
          </Flex>
        </Col>
        <Col md={12}>
          <Flex justify="flex-end">
            {/* <Tag color="geekblue">geekblue</Tag> */}
            {/* <Tag color="purple">purple</Tag> */}
            <Button style={{ width: 112 }} type="primary">
              Chọn
            </Button>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};

export default FlightCard;

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: 16px;
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
