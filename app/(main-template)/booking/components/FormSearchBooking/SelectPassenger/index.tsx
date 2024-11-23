import React, { useEffect, useMemo, useState } from "react";
import { Button, Divider, Flex, Popover, Typography } from "antd";
import { createStyles } from "antd-style";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";
import { uiActions, uiSelectors } from "@/app/reducers/ui";

const { Text } = Typography;

const FormPassenger = ({ setNumberPassenger }) => {
  const { styles } = useStyles();
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);

  useEffect(() => {
    setNumberPassenger({
      adultCount: adult,
      childCount: child,
      infantCount: infant,
    });
  }, [adult, child, infant]);

  const limited = useMemo(() => {
    return 9 - adult - child - infant;
  }, [adult, child, infant]);

  return (
    <Flex className={styles.content} vertical>
      <Flex justify="space-between" align="center">
        <Flex vertical>
          <Text className={styles.title}>Người lớn</Text>
          <Text className={styles.note}>Người lớn (từ 12 tuổi)</Text>
        </Flex>
        <Flex>
          <Counter
            max={9}
            min={1}
            limited={limited}
            defaultValue={adult}
            onChange={(count) => setAdult(count)}
          />
        </Flex>
      </Flex>
      <Divider style={{ margin: "12px 0" }} />
      <Flex justify="space-between" align="center">
        <Flex vertical>
          <Text className={styles.title}>Trẻ em</Text>
          <Text className={styles.note}>Trẻ em (2 đến 11 tuổi)</Text>
        </Flex>
        <Flex>
          <Counter
            max={2}
            min={0}
            limited={limited}
            defaultValue={child}
            onChange={(count) => setChild(count)}
          />
        </Flex>
      </Flex>
      <Divider style={{ margin: "12px 0" }} />
      <Flex justify="space-between" align="center">
        <Flex vertical>
          <Text className={styles.title}>Trẻ em</Text>
          <Text className={styles.note}>Trẻ em (dưới 2 tuổi)</Text>
        </Flex>
        <Flex>
          <Counter
            max={1}
            min={0}
            limited={limited}
            defaultValue={infant}
            onChange={(count) => setInfant(count)}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

interface Props {
  title: string;
}

const SelectPassenger: React.FC<Props> = (props: Props) => {
  const { styles } = useStyles();
  const { title } = props;
  const dispatch = useDispatch();
  const numberPassenger = useSelector(uiSelectors.getNumberPassenger);
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const setNumberPassenger = (data: any) => {
    dispatch(uiActions.setSearchFlights(data))
  }

  const _number = useMemo(
    () =>
      numberPassenger.adultCount +
      numberPassenger.childCount +
      numberPassenger.infantCount,
    [numberPassenger]
  );

  const content = <FormPassenger setNumberPassenger={setNumberPassenger} />;

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
      <Flex className={styles.btnSelect} justify="space-between">
        <Flex>
          <UserOutlined />
          <Text className={styles.label}>{`${_number} hành khách`}</Text>
        </Flex>
        <DownOutlined />
      </Flex>
    </Popover>
  );
};

export default SelectPassenger;

const useStyles = createStyles(({ token, css }) => ({
  btnSelect: css`
    padding: 9px 16px;
    background-color: ${token.colorBgLayout};
    border-radius: 8px;
  `,

  label: css`
    color: ${token.colorTextLabel};
    padding-left: 4px;
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

  content: css`
    min-width: 320px;
  `,

  title: css`
    font-weight: 500;
    line-height: 22px;
  `,

  note: css`
    font-size: 12px;
    line-height: 20px;
    color: ${token.colorTextSecondary};
  `,
}));
