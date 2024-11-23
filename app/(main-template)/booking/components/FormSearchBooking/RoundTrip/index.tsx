import React, { memo, useMemo, useRef } from "react";
import { Button, Col, Flex, Row, Segmented, Typography } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import SelectLocation from "../SelectLocation";
import SelectDate from "../SelectDate";
import { useDispatch, useSelector } from "react-redux";
import { uiActions, uiSelectors } from "@/app/reducers/ui";

const { Title, Text } = Typography;

interface Props {
  tripType: "OW" | "RT" | "MC";
  flightName?: string;
  numberRoute: number;
  isRemoveFlight: boolean;
}

const RoundTrip: React.FC<Props> = (props: Props) => {
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const { tripType, numberRoute, isRemoveFlight } = props;
  const destinationRef = useRef();
  const departureDateRef = useRef();
  const startDate = useSelector((state) =>
    uiSelectors.getStartDate(state, numberRoute)
  );
  const endDate = useSelector(uiSelectors.getEndDate);
  const route = useSelector((state) =>
    uiSelectors.getPoint(state, numberRoute)
  );

  const onSelectDeparturePoint = (item: string) => {
    dispatch(
      uiActions.setCalendarFlights({
        tripType,
        startPoint: item.airportCode,
        routeNo: numberRoute,
      })
    );
    destinationRef.current.setOpen(true);
  };

  const onSelectDestination = (item: string) => {
    dispatch(
      uiActions.setCalendarFlights({
        tripType,
        endPoint: item.airportCode,
        routeNo: numberRoute,
      })
    );
    departureDateRef.current.setOpen(true);
  };

  const onMinus = () => {
    console.log("numberRoute", numberRoute);
    dispatch(uiActions.remoteRouteByMC({ routeNo: numberRoute }));
  };

  const titleDeparturePoint = useMemo(() => {
    if (tripType === "OW") {
      return "Điểm khởi hành";
    }
    return "Điểm đi";
  }, [tripType]);

  return (
    <Row justify="center" gutter={[12, 12]} align={"middle"}>
      {tripType === "MC" ? (
        <Col xs={24} md={12} lg={6}>
          <Flex align="center" justify="space-between">
            {isRemoveFlight ? (
              <Button
                type="text"
                shape="circle"
                icon={
                  <MinusCircleOutlined
                    style={{
                      color: "#ed1c24",
                      fontSize: 20,
                    }}
                  />
                }
                onClick={onMinus}
              />
            ) : <div />}

            <Title level={5} style={{ marginBottom: 0 }}>
              Chuyến bay {numberRoute + 1}:{" "}
            </Title>
          </Flex>
        </Col>
      ) : null}
      <Col xs={24} md={12} lg={6}>
        <SelectLocation
          title={titleDeparturePoint}
          placeholder={`Chọn ${titleDeparturePoint}`}
          onSelect={onSelectDeparturePoint}
          airportCode={route?.startPoint}
          airportCodeNotSelect={route?.endPoint}
        />
      </Col>
      <Col xs={24} md={12} lg={6}>
        <SelectLocation
          ref={destinationRef}
          title="Điểm đến"
          placeholder="Chọn Điểm đến"
          onSelect={onSelectDestination}
          airportCode={route?.endPoint}
          airportCodeNotSelect={route?.startPoint}
        />
      </Col>
      <Col xs={24} md={12} lg={6}>
        <SelectDate
          ref={departureDateRef}
          title="Ngày đi"
          tripType={tripType}
          date={startDate}
          placeholder="Chọn ngày đi"
          routeNo={numberRoute}
          onSelect={onSelectDeparturePoint}
        />
      </Col>
      {tripType === "RT" ? (
        <Col xs={24} md={12} lg={6}>
          <SelectDate
            title="Ngày đến"
            tripType={tripType}
            date={endDate}
            placeholder="Chọn ngày đi"
            onSelect={onSelectDeparturePoint}
          />
        </Col>
      ) : null}
    </Row>
  );
};

export default memo(RoundTrip);

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    margin: 20px;
    padding: 20px;
    min-height: calc(100vh - 102px);
    border-radius: 12px;
    background-color: ${token.colorBgContainer};
  `,

  segmented: css`
    /* max-width: 600px; */
  `,
}));
