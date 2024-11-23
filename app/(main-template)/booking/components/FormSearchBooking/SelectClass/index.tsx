import React, { useEffect, useMemo } from "react";
import { Select } from "antd";
import { createStyles } from "antd-style";
import { useGetFlightClassBookingQuery } from "@/app/apis/booking";
import { useDispatch, useSelector } from "react-redux";
import { uiActions, uiSelectors } from "@/app/reducers/ui";

const SelectClass: React.FC = (props) => {
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const {data} = useGetFlightClassBookingQuery({});
  const classCode = useSelector(uiSelectors.getClassCodee)

  useEffect(() => {
    if(data?.items) {
      dispatch(uiActions.setSearchFlights({classCode: data?.items[0].classCode}))
    }
  }, [data])

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    dispatch(uiActions.setSearchFlights({classCode: value}))
  };

  const options = useMemo(() => {
    if(data?.items) {
      return data?.items.map((item) => ({label: item.description, value: item.classCode}))
    }
    return [];
  }, [data?.items])

  return (
    <Select
      className={styles.btnSelect}
      style={{ width: '100%' }}
      placeholder={'Hạng'}
      variant="filled"
      size="large"
      value={classCode}
      onChange={handleChange}
      options={options}
    />
  );
};

export default SelectClass;

const useStyles = createStyles(({ token, css }) => ({
  btnSelect: css`
    & .ant-select-selection-item {
      font-size: 14px;
    }
  `,

  label: css`
    color: ${token.colorTextLabel};
    padding-left: 8px;
    font-size: 14px;
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
