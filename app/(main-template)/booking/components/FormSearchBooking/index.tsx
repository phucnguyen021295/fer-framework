import React, { useRef, useState } from "react";
import { Button, Col, Flex, Row, Segmented, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import RoundTrip from "./RoundTrip";
import SelectPassenger from "./SelectPassenger";
import SelectClass from "./SelectClass";
import ServiceFee from "./ServiceFee";
import { useDispatch, useSelector } from "react-redux";
import { uiActions, uiSelectors } from "@/app/reducers/ui";
import { useSearchFlightMutation } from "@/app/apis/search";

const { Title, Text } = Typography;

interface Props {
  isModal?: boolean;
  onSearchFlight: (data: any) => void;
  isLoading: boolean
}

const FormSearchBooking: React.FC<Props> = (props: Props) => {
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const searchData = useSelector(uiSelectors.getSearchFlights);
  const tripType = useSelector(uiSelectors.getTripType);
  const numberRoutes = useSelector((state) =>
    uiSelectors.getNumberRoute(state, tripType)
  );

  const { isModal, onSearchFlight, isLoading } = props;

  const onChangeTripType = (tripType: "OW" | "RT" | "MC") => {
    dispatch(uiActions.setSearchFlights({ tripType }));
    dispatch(uiActions.setTripType({ tripType }));
  };

  const onSearch = () => {
    onSearchFlight(searchData);
    // searchFlight({ body: searchData }).then();
  };

  const onAddFlight = () => {
    dispatch(uiActions.addRouteByMC({}));
  };

  return (
    <Flex className={styles.container} vertical>
      {!isModal && (
        <Title level={3} style={{ textAlign: "center", marginTop: 12 }}>
          Tìm kiếm chuyến bay
        </Title>
      )}

      <Row justify="center" style={{ marginTop: 12, marginBottom: 20 }}>
        <Col xs={24} md={16} xl={10}>
          <Segmented
            size="large"
            value={tripType}
            onChange={onChangeTripType}
            options={[
              { label: "Một chiều", value: "OW" },
              { label: "Khứ hồi", value: "RT" },
              { label: "Đa hành trình", value: "MC" },
            ]}
            block
            className={styles.segmented}
          />
        </Col>
      </Row>

      <Row justify={"center"} gutter={[12, 12]} style={{ paddingBottom: 20 }}>
        <Col xs={24} md={12} lg={6}>
          <SelectPassenger title="Số hành khách" />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Flex>
            <SelectClass />
          </Flex>
        </Col>
        <Col xs={24} md={24} lg={12}>
          <Flex justify="flex-end">
            <ServiceFee />
          </Flex>
        </Col>
      </Row>
      <Flex vertical gap={12}>
        {numberRoutes.map((item) => (
          <RoundTrip
            key={item}
            tripType={tripType}
            numberRoute={item}
            isRemoveFlight={numberRoutes.length > 2}
          />
        ))}
      </Flex>

      <Row gutter={12} style={{ paddingTop: 24, paddingBottom: 16 }}>
        <Col xs={24} md={12} lg={{span: 6}}>
          {tripType === "MC" && (
            <Flex>
              <Button
                type="primary"
                size="large"
                style={{ width: "100%" }}
                loading={isLoading}
                ghost
                onClick={onAddFlight}
                icon={<PlusOutlined />}
              >
                Thêm chuyến bay
              </Button>
            </Flex>
          )}
        </Col>
        <Col xs={24} md={12} lg={{span: 6, offset: 12}}>
          <Flex>
            <Button
              type="primary"
              style={{ width: "100%" }}
              size="large"
              loading={isLoading}
              onClick={onSearch}
              icon={<SearchOutlined />}
            >
              Tìm chuyến bay
            </Button>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};

export default FormSearchBooking;

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: 20px;
    /* min-height: calc(100vh - 102px); */
    border-radius: 12px;
    background-color: ${token.colorBgContainer};
  `,

  segmented: css`
    /* max-width: 600px; */
    & .ant-segmented-item-selected {
      background: ${token.colorPrimary};
      & .ant-segmented-item-label {
        font-weight: 500;
        color: ${token.colorWhite};
      }
    }
  `,
}));
