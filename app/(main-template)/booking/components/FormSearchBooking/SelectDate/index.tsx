import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Flex, Popover, Typography } from "antd";
import { createStyles } from "antd-style";
import { DownOutlined } from "@ant-design/icons";
import DateRangePickerBase from "@/app/components/DateRangePicker";
import Calendar from "@/app/components/Calendar";
import { useGetMinFareFlightBookingQuery } from "@/app/apis/booking";
import { useDispatch, useSelector } from "react-redux";
import { uiActions, uiSelectors } from "@/app/reducers/ui";
import moment from "moment";

const { Text } = Typography;

interface Props {
  title: string;
  onSelect: (id: string) => void;
  placeholder: string;
  tripType: string;
  date: number;
}

const _date = new Date();

const SelectDate: React.FC<Props> = (props: Props, ref) => {
  const { styles } = useStyles();
  const rangeDateRef = useRef(0);
  const dispatch = useDispatch();
  const { title, onSelect, placeholder, tripType, date, routeNo} = props;
  const [open, setOpen] = useState(false);
  const route = useSelector((state) => uiSelectors.getRoute(state, routeNo));

  const { data } = useGetMinFareFlightBookingQuery({
    from_time: _date.getTime(),
    to_time: new Date(_date.getFullYear(), _date.getMonth() + 2, 0).getTime(),
    route: route,
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        setOpen: setOpen,
      };
    },
    []
  );

  useEffect(() => {
    rangeDateRef.current = 0;
  }, [route]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const onSelectDateRangePicker = (item) => {
    dispatch(
      uiActions.setCalendarFlights({
        tripType,
        startDate: item.selection.startDate.getTime(),
        endDate: item.selection.endDate.getTime(),
      })
    );
    rangeDateRef.current++;
    if (tripType === "RT" && rangeDateRef.current === 2) {
      setOpen(false);
      rangeDateRef.current = 0;
      return;
    }
  };

  const onSelectCalendar = (date) => {
    dispatch(
      uiActions.setCalendarFlights({
        tripType,
        startDate: date.getTime(),
        endDate: date.getTime(),
        routeNo: routeNo
      })
    );
    setOpen(false);
  }

  const content =
    tripType === "RT" ? (
      <DateRangePickerBase
        data={data}
        onSelectDateRangePicker={onSelectDateRangePicker}
      />
    ) : (
      <Calendar data={data} onSelectCalendar={onSelectCalendar} />
    );

  return (
    <Popover
      content={content}
      title={title}
      trigger="click"
      open={open}
      arrow={false}
      overlayClassName={styles.popover}
      placement="bottom"
      onOpenChange={handleOpenChange}
    >
      <Flex vertical className={styles.btnSelect}>
        <Text className={styles.label}>{title}</Text>
        <Flex justify="space-between" align="center">
          <Text className={date ? styles.name : styles.placeholder}>
            {date ? moment(date).format("DD/MM/YYYY") : placeholder}
          </Text>
          <DownOutlined />
        </Flex>
      </Flex>
    </Popover>
  );
};

export default forwardRef(SelectDate);

const useStyles = createStyles(({ token, css }) => ({
  btnSelect: css`
    padding: 8px 16px;
    background-color: ${token.colorBgLayout};
    border-radius: 8px;
  `,

  label: css`
    color: ${token.colorTextLabel};
    text-align: left;
  `,

  popover: css`
    & .ant-popover-inner-content {
      max-height: 454px;
      overflow-y: auto;
    }
  `,

  name: css`
    font-weight: 600;
  `,

  placeholder: css`
    color: ${token.colorTextSecondary};
  `,
}));
