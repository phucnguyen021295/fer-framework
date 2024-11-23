import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  Button,
  Checkbox,
  Flex,
  Input,
  List,
  Popover,
  Tabs,
  Typography,
} from "antd";
import { createStyles } from "antd-style";
import { DownOutlined } from "@ant-design/icons";
import { useGetRegionQuery } from "@/app/apis/region";

const { Text } = Typography;

const OPTION = [
  {
    title: "Hãng nội địa",
    items: [
      { label: "Vietnam Airlines (VN)", value: "VN" },
      { label: "VietJet Air (VJ)", value: "VJ" },
      { label: "Bamboo Airways (QH)", value: "QH" },
    ],
  },
  {
    title: "Hãng quốc tế",
    items: [
      { label: "Air Asian (AK)", value: "AK" },
      { label: "Qatar Airways (QR)", value: "QR" },
      { label: "Malaysia Airlines (MH)", value: "MH" },
    ],
  },
];

interface Props {
  title: string;
  onSelect: (id: string) => void;
  placeholder: string;
}

const Airlines: React.FC<Props> = (props: Props, ref) => {
  const { styles } = useStyles();
  const { title, onSelect, placeholder } = props;
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState();
  const { data } = useGetRegionQuery({});
  const [selectedAirlines, setSelectedAirlines] = useState([]);

  const handleCheckboxChange = (checkedValues) => {
    setSelectedAirlines(checkedValues);
  };

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const onChoose = (item) => {
    setArea(item);
    onSelect(item.id);
    setOpen(false);
  };

  const content = useMemo(() => {
    // if (!data?.items) {
    //   return null;
    // }
    return (
      <div
        style={{
          width: '100%'
        }}
      >
        <Input placeholder="Tìm hãng hàng không" style={{ marginBottom: 16 }} />

        {OPTION.map((item, index) => {
          return (
            <div key={index}>
              <Typography.Text
                strong
                style={{ marginBottom: 8, display: "block" }}
              >
                {item.title}
              </Typography.Text>
              <Checkbox.Group
                options={item.items}
                value={selectedAirlines}
                onChange={handleCheckboxChange}
                style={{ marginLeft: 12, display: "flex", flexDirection: "column", gap: 12 }}
              />
              {/* {index !== Object.entries(airlineOptions).length - 1 && <Divider />} */}
            </div>
          );
        })}
      </div>
    );
  }, [data, onChoose]);

  return (
    <Popover
      content={content}
      title={title}
      trigger="click"
      open={open}
      arrow={false}
      overlayStyle={{ width: 300 }}
      overlayClassName={styles.popover}
      placement="bottomLeft"
      onOpenChange={handleOpenChange}
    >
      <Flex vertical className={styles.btnSelect}>
        <Flex justify="space-between" align="center">
          <Text className={area ? styles.name : styles.placeholder}>
            {area ? area.name : placeholder}
          </Text>
          <DownOutlined />
        </Flex>
      </Flex>
    </Popover>
  );
};

export default forwardRef(Airlines);

const useStyles = createStyles(({ token, css }) => ({
  btnSelect: css`
    padding: 8px 16px;
    /* background-color: ${token.colorBgLayout}; */
    border: 1px solid ${token.colorBgLayout};
    border-radius: 8px;
  `,

  label: css`
    color: ${token.colorTextLabel};
    text-align: left;
  `,

  popover: css`
    & .ant-popover-inner-content {
      max-height: 300px;
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
