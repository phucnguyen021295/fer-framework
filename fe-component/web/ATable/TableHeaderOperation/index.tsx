"use client";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  Button,
  Divider,
  Drawer,
  Flex,
  Form,
  Input,
  Popover,
  Tooltip,
} from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import { useSize } from "ahooks";
import { useMobile } from "fe-cores/common/mobile";
import SortPopover from "./SortPopover";
import FilterControl from "./FilterControl";
import { debounce } from "lodash";

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
  pin?: boolean;
}

function transformData(filters, data) {
  return filters
    .map((filter) => ({
      name: filter.name,
      operation: filter.operation,
      value: data[filter.name],
    }))
    .filter((item) => item.value !== undefined); // Bỏ qua các item có value là undefined
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
    onApply({ filters: transformData(data.filters, values) });
    setOpen(false);
  };

  const onSearch = useCallback(
    debounce((e: any) => {
      onApply({ keyword: e.target.value });
    }, 1000), // Delay 2 giây
    [onApply]
  );

  const content = useMemo(() => {
    return (
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
        {data.filters.map((filter: any) => (
          <Form.Item
            key={filter.name}
            name={filter.name}
            label={filter.title}
            style={{ marginBottom: 16 }}
          >
            <FilterControl item={filter} />
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
  }, [data, form]);

  const isFilterPin = useMemo(() => {
    if (!size) return false;
    const { width } = size;
    const numberFilter = data.filters.filter(
      (item: FilterItem) => item?.pin === true
    ).length;
    const _width = width - numberFilter * 280 - 440;
    return _width > 0;
  }, [size, data]);

  const isBtnFilter = useMemo(() => {
    const numberFilter = data.filters.filter(
      (item: FilterItem) => item?.pin === true
    ).length;
    if (isFilterPin && numberFilter === data.filters.length) {
      return false;
    }
    return true;
  }, [isFilterPin, data.filters]);

  return (
    <Flex
      className={styles.container}
      gap={12}
      justify="space-between"
      ref={ref}
    >
      {data.search ? (
        <Flex style={{ flex: 1, maxWidth: !isMobile ? 500 : "100%" }}>
          <Input
            placeholder={data.search.placeholder}
            prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            onChange={onSearch}
            allowClear
            suffix={
              isMobile ? (
                <Tooltip title="Extra information">
                  <FilterOutlined
                    style={{ color: theme.colorPrimary }}
                    onClick={() => setOpen(true)}
                  />
                </Tooltip>
              ) : null
            }
          />
        </Flex>
      ) : null}
      <Flex gap={12}>
        {isFilterPin
          ? data.filters
              .filter((item) => item?.pin === true)
              .map((filter: FilterItem, index: number) => (
                <Form.Item
                  key={index}
                  label={filter.title}
                  style={{ marginBottom: 0 }}
                >
                  <FilterControl
                    item={filter}
                    style={{ minWidth: 180 }}
                    onChange={(value) => {
                      // Xử lý sự thay đổi giá trị tại đây
                      console.log(`Filter ${filter.name} changed to:`, value);
                      onApply({
                        filters: [
                          {
                            name: filter.name,
                            operation: filter.operation,
                            value: value,
                          },
                        ],
                      });
                      // Thực hiện hành động tương ứng
                    }}
                  />
                </Form.Item>
              ))
          : null}
        {data.sorts && (
          <SortPopover options={data.sorts.values} title={data.sorts.title} />
        )}
        {isBtnFilter && !isMobile ? (
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
          <Drawer title={title} onClose={() => setOpen(false)} open={open}>
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
