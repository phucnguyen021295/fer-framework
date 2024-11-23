import React, { forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { Button, Flex, List, Popover, Tabs, Typography } from "antd";
import { createStyles } from "antd-style";
import { DownOutlined } from "@ant-design/icons";
import { useGetRegionQuery } from "@/app/apis/region";
import Citys from "./Citys";
import { useSelector } from "react-redux";
import { citySelectors } from "@/app/reducers/city";

const { Text } = Typography;

interface Props {
  title: string;
  onSelect: (item: any) => void;
  placeholder: string;
  airportCode: string;
  airportCodeNotSelect: string;
}

const SelectLocation: React.FC<Props> = (props: Props, ref) => {
  const { styles } = useStyles();
  const { title, onSelect, placeholder, airportCode, airportCodeNotSelect } = props;
  const city = useSelector((state) => citySelectors.getCityNameByAirportCode(state, airportCode))
  const [open, setOpen] = useState(false);
  const {data} = useGetRegionQuery({})

  useImperativeHandle(ref, () => {
    return {
        setOpen: setOpen
    };
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const onChoose = (item) => {
    onSelect(item);
    setOpen(false);
  };

  const content = useMemo(() => {
    if(!data?.items) {
      return null
    }
    return (
      <Tabs
        tabPosition={"left"}
        items={data.items.map((area, i) => {
          // const citys = ITEMS.citys[area.id];
          return {
            label: area.name,
            key: area.id,
            children: (
              <Citys id={area.id} onChoose={onChoose} airportCode={airportCodeNotSelect} />
            ),
          };
        })}
      />
    )
  }, [data, onChoose, airportCodeNotSelect]);

  return (
    <Popover
      content={content}
      title={title}
      trigger="click"
      open={open}
      arrow={false}
      overlayClassName={styles.popover}
      placement="bottomLeft"
      onOpenChange={handleOpenChange}
    >
      <Flex vertical className={styles.btnSelect}>
        <Text className={styles.label}>{title}</Text>
        <Flex justify="space-between" align="center">
          <Text className={city.length > 0 ? styles.name : styles.placeholder}>
            {city.length > 0 ? city[0].name : placeholder}
          </Text>
          <DownOutlined />
        </Flex>
      </Flex>
    </Popover>
  );
};

export default forwardRef(SelectLocation);

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
      max-height: 300px;
      overflow-y: hidden;;
    }

    & .ant-tabs-content {
      overflow-y: auto;
      max-height: 300px;
      width: 220px;
    }
  `,

  name: css`
    font-weight: 600;
  `,

  placeholder: css`
    color: ${token.colorTextSecondary};
  `,
}));
