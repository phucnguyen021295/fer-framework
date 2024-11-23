import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Collapse,
  CollapseProps,
  Divider,
  Flex,
  Row,
  Typography,
} from "antd";
import { createStyles } from "antd-style";
import { RightOutlined, DownOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Title, Text } = Typography;

const FlightSelection = () => {
  const { styles } = useStyles();
  const [flights, setFlights] = useState([
    {
      id: 1,
      route: "Hà Nội (HAN) → TP HCM (SGN)",
      date: "Thứ 5, 25 thg 4 2024",
      selectedFlight: {
        airline: "VietJet Airs",
        flightCode: "VJ178",
        time: "21:05 - 23:15",
        duration: "1h40ph",
      },
    },
    {
      id: 2,
      route: "Hà Nội (HAN) → TP HCM (SGN)",
      date: "Thứ 5, 25 thg 4 2024",
      selectedFlight: null, // Chưa chọn chuyến bay
    },
  ]);
  const [collapse, setCollapse] = useState(true);
  const [totalPrice, setTotalPrice] = useState(13230000); // Tổng giá vé

  const handleSelectFlight = (id) => {
    console.log("Chọn chuyến bay mới cho id:", id);
    // Logic chọn chuyến bay
  };

  const canProceed = flights.every((flight) => flight.selectedFlight);

  return (
    <Flex className={styles.container} vertical>
      <Row gutter={[12, 12]}>
        {flights.map((flight, index) => (
          <Col
            xs={24}
            md={12}
            lg={6}
            key={flight.id}
            className={styles.flightCard}
          >
            <Flex gap={12} vertical>
              <Flex align="center" gap={12}>
                <Flex className={styles.number} align="center" justify="center">
                  <Text style={{ color: "#fff" }} strong>
                    {index + 1}
                  </Text>
                </Flex>
                <Flex vertical>
                  <Text className={styles.date}>{flight.date}</Text>
                  <Text className={styles.route}>{flight.route}</Text>
                </Flex>
              </Flex>

              {flight.selectedFlight ? (
                <Flex className={styles.flightDetails} align="center" gap={12}>
                  <Image
                    src={require("@/public/icon/vietjet-air.svg")}
                    alt="vietjet-air"
                  />
                  <Flex vertical style={{ flex: 1 }}>
                    <Text strong>{flight.selectedFlight.airline}</Text>
                    <Text type="secondary">
                      {flight.selectedFlight.flightCode} -{" "}
                      {flight.selectedFlight.time} -{" "}
                      {flight.selectedFlight.duration}
                    </Text>
                  </Flex>
                  <Button
                    type="primary"
                    ghost
                    onClick={() => handleSelectFlight(flight.id)}
                  >
                    Đổi chuyến
                  </Button>
                </Flex>
              ) : (
                <Flex className={styles.flightDetails} align="center" gap={12}>
                  <Image
                    src={require("@/public/icon/airplane.svg")}
                    alt="vietjet-air"
                  />
                  <Flex vertical>
                    <Text type="danger">Đang chọn chuyến bay...</Text>
                    <Text type="secondary">
                      Vui lòng chọn chuyến bay ở trên
                    </Text>
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Col>
        ))}
      </Row>

      <Divider style={{ margin: "12px  0" }} />

      <Flex justify="space-between" align="center">
        <Flex gap={12} align="center">
          <Button
            type="text"
            onClick={() => setCollapse(!collapse)}
            icon={!collapse ? <RightOutlined /> : <DownOutlined />}
          />
          <Flex vertical>
            <Text type="secondary">Tổng cộng cho 3 hành khách: </Text>
            <Text type="danger" strong>
              {totalPrice.toLocaleString()} VND
            </Text>
          </Flex>
        </Flex>
        <Button type="primary">Tiếp tục</Button>
      </Flex>
      <Row gutter={[12, 12]} style={{display: collapse ? 'flex' : 'none', transition: 'max-height 0.3s ease, opacity 0.3s ease'}}>
          <Col xs={24} md={12} lg={6}>
            <Flex vertical style={{ padding: 12 }} gap={4}>
              <Text strong>VietJet Airs</Text>
              <Flex justify="space-between" align="center">
                <Text type="secondary">+ VietJet Airs (Người lớn) (x1)</Text>
                <Text type="secondary">2.367.440 VND</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text type="secondary">+ VietJet Airs (Người lớn) (x1)</Text>
                <Text type="secondary">2.367.440 VND</Text>
              </Flex>
            </Flex>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Flex vertical style={{ padding: 12 }} gap={4}>
              <Text strong>VietJet Airs</Text>
              <Flex justify="space-between" align="center">
                <Text type="secondary">+ VietJet Airs (Người lớn) (x1)</Text>
                <Text type="secondary">2.367.440 VND</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text type="secondary">+ VietJet Airs (Người lớn) (x1)</Text>
                <Text type="secondary">2.367.440 VND</Text>
              </Flex>
            </Flex>
          </Col>
        </Row>
    </Flex>
  );
};

export default FlightSelection;

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    margin: auto;
    padding: 20px 40px;
    width: 100%;
    background: #fff;
    height: auto;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
  `,
  flightCard: css`
    margin-bottom: 16px;
  `,

  number: css`
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: #ed1c24;
  `,

  date: css`
    color: ${token.colorTextSecondary};
  `,

  route: css`
    font-weight: 600;
  `,

  flightHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  `,

  flightDetails: css`
    padding: 12px;
    border: 1px dashed ${token.colorBorder};
    border-radius: 4px;
  `,
}));
