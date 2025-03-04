"use client";
import React, { memo, useMemo, useRef, useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Drawer,
  Flex,
  Form,
  Input,
  Popover,
  Select,
  Slider,
  Tooltip,
  Typography,
} from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import { useSize } from "ahooks";
import { useMobile } from "@/fer-framework/fe-cores/common/mobile";
import SortPopover from "./SortPopover";

const { Text } = Typography;

// Định nghĩa kiểu dữ liệu cho filter item
interface FilterItem {
  title: string;
  placeholder: string;
  name: string;
  operation: string;
  type: "DatePicker" | "Select" | "Input" | "Slider";
  urlApi?: string;
  values?: Array<{ label: string; value: string }>;
  value?: any;
  format?: string;
  showTime?: boolean;
}

interface DynamicFilterProps {
  data: any;
  onApply: (values: any) => void;
  title?: string;
  add?: React.ReactNode;
}

const TableHeaderOperation: React.FC<DynamicFilterProps> = (props) => {
  const { styles, theme } = useStyles();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const ref = useRef(null);
  const size = useSize(ref);
  const isMobile = useMobile();

  const { data = {}, onApply, title = "Bộ lọc", add } = props;

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleApply = () => {
    const values = form.getFieldsValue();
    onApply(values);
    setOpen(false);
  };

  const onOpenDrawerFilter = (newOpen) => {
    setOpenDrawer(newOpen);
  };

  const renderFilterControl = (item: FilterItem, style = {}) => {
    switch (item.type) {
      case "DatePicker":
        return (
          <DatePicker
            placeholder={item.placeholder}
            style={{ width: "100%", ...style }}
            format={item.format}
            showTime={item.showTime}
          />
        );

      case "Select":
        return (
          <Select
            placeholder={item.placeholder}
            style={{ width: "100%", ...style }}
            options={item.values || []}
            allowClear
          />
        );

      case "Input":
        return (
          <Input
            placeholder={item.placeholder}
            prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            suffix={
              isMobile ? (
                <Tooltip title="Extra information">
                  <FilterOutlined
                    style={{ color: theme.colorPrimary }}
                    onClick={onOpenDrawerFilter}
                  />
                </Tooltip>
              ) : null
            }
          />
        );

      case "Slider":
        return (
          <>
            <Slider
              range
              defaultValue={item.value}
              min={item.value?.[0] || 0}
              max={item.value?.[1] || 100}
              style={style}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text type="secondary">{item.value?.[0].toLocaleString()}</Text>
              <Text type="secondary">{item.value?.[1].toLocaleString()}</Text>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const content = (
    <Form
      form={form}
      layout="vertical"
      initialValues={data.filters.reduce((acc, filter) => {
        if (filter.value) {
          acc[filter.name] = filter.value;
        }
        return acc;
      }, {})}
    >
      {data.filters.map((filter) => (
        <Form.Item
          key={filter.name}
          name={filter.name}
          label={filter.title}
          style={{ marginBottom: 16 }}
        >
          {renderFilterControl(filter)}
        </Form.Item>
      ))}

      <Divider style={{ margin: "12px 0" }} />

      <Form.Item style={{ marginBottom: 0 }}>
        <Flex flex={1} gap={12}>
          <Button onClick={handleReset} style={{ flex: 1 }}>
            Hủy lọc
          </Button>
          <Button type="primary" style={{ flex: 1 }} onClick={handleApply}>
            Áp dụng
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );

  const isFilterPin = useMemo(() => {
    if (!size) return false;
    const { width } = size;
    const numberFilter = data.filters.filter(
      (item) => item?.pin === true
    ).length;
    const _width = width - numberFilter * 280 - 440;
    return _width > 0;
  }, [size, data]);

  return (
    <Flex
      className={styles.container}
      gap={12}
      justify="space-between"
      ref={ref}
    >
      {data.search ? (
        <Flex style={{ flex: 1, maxWidth: 500 }}>
          {renderFilterControl(data.search)}
        </Flex>
      ) : null}
      <Flex gap={12}>
        {isFilterPin
          ? data.filters
              .filter((item) => item?.pin === true)
              .map((filter, index) => (
                <Form.Item
                  key={index}
                  label={filter.title}
                  style={{ marginBottom: 0 }}
                >
                  {renderFilterControl(filter, { minWidth: 180 })}
                </Form.Item>
              ))
          : null}
        {data.sorts && (
          <SortPopover options={data.sorts.values} title={data.sorts.title} />
        )}
        {!isMobile ? (
          <Popover
            content={
              <Flex vertical style={{ width: 300 }}>
                {content}
              </Flex>
            }
            title={title}
            trigger="click"
            open={open}
            arrow={false}
            onOpenChange={handleOpenChange}
            placement="bottom"
          >
            <Button type="primary" ghost icon={<FilterOutlined />} />
          </Popover>
        ) : (
          <Drawer
            title={title}
            onClose={() => setOpenDrawer(false)}
            open={openDrawer}
          >
            {content}
          </Drawer>
        )}

        {add && add}
      </Flex>
    </Flex>
  );
};

export default memo(TableHeaderOperation);

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding-block: 16px;
  `,
}));
