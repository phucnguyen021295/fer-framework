"use client";
import { createStyles } from "antd-style";
import { addDays, format, getTime } from "date-fns";
import { memo, useMemo, useState } from "react";
import { LunarDate } from "vietnamese-lunar-calendar";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import vi from "date-fns/locale/vi";

import "../DateRangePicker/index.local.scss";
import { useResponsive } from "ahooks";

// https://github.com/tiendat77/vietnamese-lunar-calendar

function formatCurrencyVN(amount) {
  const formatted = (amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1); // Rút gọn thập phân nếu không cần thiết
  return `${formatted}k`;
}

function customDayContent(day, prices = []) {
  const lunarDate = new LunarDate(day);

  const lunar =
    lunarDate.getDate() === 1
      ? `${lunarDate.getDate()}/${lunarDate.getMonth()}`
      : lunarDate.getDate();

  const minFare = () => {
    const _price = prices.filter((price) => price.date === getTime(day));
    if (_price.length > 0) {
      return _price[0];
    }
    return "";
  };

  return (
    <div
      className={`date-cell${
        minFare()?.isMinPrice ? " date-cell-min-price" : ""
      }`}
    >
      <span className="date-cell-lunar">{lunar}</span>
      <span className="date-cell-day">{format(day, "d")}</span>
      {minFare()?.price ? (
        <span className="date-cell-price">
          {formatCurrencyVN(minFare()?.price)}
        </span>
      ) : null}
    </div>
  );
}

interface Props {
  data: string;
  onSelectCalendar: (item: any) => void
}

function CalendarBase(props: Props) {
  const { styles } = useStyles();
  const {data, onSelectCalendar} = props;
  const responsive = useResponsive() || { md: true };
  const isMobile = !responsive?.md;

  const [date, setDate] = useState(null);

  const onChange = (item) => {
    console.log("data", item);
    setDate(item)
    onSelectCalendar(item);
    // setState({ ...state, ...item });
  };

  return (
    <Calendar
      className={styles.container}
      onChange={onChange}
      date={date}
      locale={vi}
      months={2}
      minDate={new Date()}
      direction={isMobile ? "vertical" : "horizontal"}
      dayContentRenderer={(day) => customDayContent(day, data)}
    />
  );
}

export default memo(CalendarBase);

const useStyles = createStyles(({ token, css }) => ({
  // Also supports obtaining the same writing experience as normal css through css string templates
  container: css`
    width: "100%";
    & .rdrDefinedRangesWrapper {
      display: none;
    }

    & .rdrDateDisplayWrapper {
      display: none;
    }

    & .rdrCalendarWrapper {
      width: 890px; /* tùy chỉnh chiều rộng */
      height: 454px; /* tùy chỉnh chiều cao */
    }

    & .rdrWeekDays {
      height: 48px; /* tùy chỉnh chiều cao của mỗi ô ngày */
      display: flex;
      align-items: center;
    }

    & .rdrDay {
      width: 60px; /* tùy chỉnh chiều rộng của mỗi ô ngày */
      height: 48px; /* tùy chỉnh chiều cao của mỗi ô ngày */
      border-left: 1px solid ${token.colorBorder};
      border-top: 1px solid ${token.colorBorder};
    }

    & .rdrWeekDay:nth-child(1),
    .rdrWeekDay:nth-child(2),
    .rdrWeekDay:nth-child(3) {
      height: 100%; /* tùy chỉnh chiều cao của mỗi ô ngày */
      line-height: 48px;
      width: 60px;
      border-left: 1px solid ${token.colorBorder};
      border-top: 1px solid ${token.colorBorder};
      font-weight: 600;
    }

    & .rdrWeekDay:nth-child(5),
    .rdrWeekDay:nth-child(6),
    .rdrWeekDay:nth-child(7) {
      height: 100%; /* tùy chỉnh chiều cao của mỗi ô ngày */
      line-height: 48px;
      width: 60px;
      font-weight: 600;
      border-right: 1px solid ${token.colorBorder};
      border-top: 1px solid ${token.colorBorder};
    }

    & .rdrWeekDay:nth-child(4) {
      height: 100%; /* tùy chỉnh chiều cao của mỗi ô ngày */
      line-height: 48px;
      width: 60px;
      font-weight: 600;
      border-left: 1px solid ${token.colorBorder};
      border-right: 1px solid ${token.colorBorder};
      border-top: 1px solid ${token.colorBorder};
    }

    & .rdrWeekDay:nth-child(6),
    .rdrWeekDay:nth-child(7) {
      color: red;
    }

    & .rdrDayNumber {
      width: 60px; /* tùy chỉnh chiều rộng của mỗi ô ngày */
      height: 48px; /* tùy chỉnh chiều cao của mỗi ô ngày */
      top: 0;
      bottom: 0;
    }

    & .rdrDays {
      border-right: 1px solid ${token.colorBorder};
      border-bottom: 1px solid ${token.colorBorder};
    }

    & .rdrMonth {
      width: 441px;
    }

    & .rdrMonthName {
      height: 48px;
      line-height: 48px;
      align-items: center;
      display: flex;
    }

    & .rdrSelected,
    .rdrInRange,
    .rdrStartEdge,
    .rdrEndEdge {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 0;
      background-color: #F69493;
    }

    & .rdrInRange {
      background-color: #ffeaed;
    }

    & .rdrInRange:has(.rdrDay) {
        background-color: #ffeaed;
      }

    & .rdrMonthAndYearWrapper {
      height: 48px;
      padding-top: 0px;
    }

    & .rdrDayToday {
      background: yellow;

      & span:after {
        height: 0;
      }
    }
  `,

  cell: css``,
}));
