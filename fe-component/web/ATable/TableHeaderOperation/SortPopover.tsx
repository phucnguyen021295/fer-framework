import { Button, Flex, List, Popover, theme, Typography } from "antd";
import { memo, useEffect, useState } from "react";
import { AlignLeftOutlined } from "@ant-design/icons";
import { useResponsive } from "ahooks";

const { Text } = Typography;

interface SortPopoverProps {
  title: string;
  options: { label: string; direction: string; property: string }[];
}

const SortPopover: React.FC<SortPopoverProps> = (props) => {
  const { sm } = useResponsive();
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{
    label: string;
    direction: string;
    property: string;
  } | null>();
  const { options = [], title = "" } = props;

  useEffect(() => {
    if (options.length > 0) {
      setSelected(options[0]);
    }
  }, []);

  const handleSelect = (item: {
    property: string;
    label: string;
    direction: string;
  }) => {
    setSelected(item);
    setOpen(false);
  };

  const content = (
    <List
      dataSource={options}
      renderItem={(item) => (
        <List.Item
          onClick={() => handleSelect(item)}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            backgroundColor:
              selected?.property === item.property
                ? token.colorBgLayout
                : token.colorBgContainer,
          }}
        >
          {item.label}
        </List.Item>
      )}
      style={{ width: 200 }}
    />
  );

  return (
    <Popover
      content={content}
      trigger="click"
      arrow={false}
      placement="bottomRight"
      open={open}
      onOpenChange={(visible) => setOpen(visible)}
    >
      <Flex align="center" gap={8}>
        {title ? <Text>{title}:</Text> : null}
        <Button
          icon={<AlignLeftOutlined />}
          style={{
            minWidth: sm ? 180 : "auto",
            justifyContent: sm ? "flex-start" : "center",
          }}
        >
          {sm ? selected?.label : ""}
        </Button>
      </Flex>
    </Popover>
  );
};

export default memo(SortPopover);
