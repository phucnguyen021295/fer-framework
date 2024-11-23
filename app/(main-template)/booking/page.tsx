"use client";

import { Affix, Flex } from "antd";
import { createStyles } from "antd-style";

import PriceTracking from "./components/PriceTracking";
import FlightCard from "./components/Flight";
import FormSearchBooking from "./components/FormSearchBooking";
import { useSearchFlightMutation } from "@/app/apis/search";
import DATA from "./data.json";
import FlightSelection from "./components/FlightSelection";
import { useSelector } from "react-redux";
import { appSelector } from "@/fer-framework/fe-core/reducers/app";
import { useMemo } from "react";

function Booking() {
  const { styles } = useStyles();
  const sider = useSelector(appSelector.getSider);
  const isMobile = useSelector(appSelector.getIsMobile);
  const [searchFlight, { isSuccess, isLoading }] = useSearchFlightMutation();

  const onSearchFlight = (data: any) => {
    searchFlight({ body: data }).then();
  };

  const marginLeft = useMemo(() => {
    if(isMobile) return 0;
    if(sider.collapsedSider) return sider.collapsedWidth;
    return sider.width
  }, [sider, isMobile])

  return (
    <Flex className={styles.container} vertical>
      {/* <FormSearchBooking
        onSearchFlight={onSearchFlight}
        isLoading={isLoading}
      /> */}
      <PriceTracking />
      <FlightCard />
      <Flex className={styles.bottom} style={{marginLeft}}>
        <FlightSelection />
      </Flex>
    </Flex>
  );
}

export default Booking;

const useStyles = createStyles(({ token, css }) => ({
  // Also supports obtaining the same writing experience as normal css through css string templates
  container: css`
    min-height: calc(100vh - 62px);
    height: calc(100vh - 62px);
    width: 100%;
    padding: 20px;
    overflow-y: auto;
    position: relative;
  `,

  content: css`
    margin: 20px;
    padding: 20px;
    min-height: calc(100vh - 102px);
    border-radius: 12px;
    background-color: ${token.colorBgContainer};
  `,

  bottom: css`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
  `,
}));
