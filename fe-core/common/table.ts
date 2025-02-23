import type { TablePaginationConfig, TableProps } from "antd";
import { useBoolean, useHookTable } from "@sa/hooks";
import { Form } from "antd";
import { useMobile } from "./mobile";
import { useRef, useState } from "react";
import { useSize } from "ahooks";

type TableData = AntDesign.TableData;
type GetTableData<A extends AntDesign.TableApiFn> = AntDesign.GetTableData<A>;
type TableColumn<T> = AntDesign.TableColumn<T>;

export function useTable<A extends AntDesign.TableApiFn>(
  config: AntDesign.AntDesignTableConfig<A>,
  paginationConfig?: Omit<
    TablePaginationConfig,
    "total" | "current" | "pageSize" | "onChange"
  >
) {
  const isMobile = useMobile();

  const [total, setTotal] = useState<TablePaginationConfig["total"]>(0);

  const { apiFn, apiParams, immediate, rowKey = "id" } = config;

  const [form] = Form.useForm<AntDesign.AntDesignTableConfig<A>["apiParams"]>();

  const {
    loading,
    empty,
    data,
    columns,
    columnChecks,
    setColumnChecks,
    searchParams,
    updateSearchParams,
    resetSearchParams,
  } = useHookTable<
    A,
    GetTableData<A>,
    TableColumn<AntDesign.TableDataWithIndex<GetTableData<A>>>
  >({
    apiFn,
    apiParams,
    columns: config.columns,
    transformer: (res) => {
      const {
        records = [],
        current = 1,
        size = 10,
        total: totalNum = 0,
      } = res.data || {};

      const recordsWithIndex = records.map((item, index) => {
        return {
          ...item,
          index: (current - 1) * size + index + 1,
        };
      });

      return {
        data: recordsWithIndex,
        pageNum: current,
        pageSize: size,
        total: totalNum,
      };
    },
    getColumnChecks: (cols) => {
      const checks: AntDesign.TableColumnCheck[] = [];

      cols.forEach((column) => {
        if (column.key) {
          checks.push({
            key: column.key as string,
            title: column.title as string,
            checked: true,
          });
        }
      });

      return checks;
    },
    getColumns: (cols, checks) => {
      const columnMap = new Map<
        string,
        TableColumn<AntDesign.TableDataWithIndex<GetTableData<A>>>
      >();

      cols.forEach((column) => {
        if (column.key) {
          columnMap.set(column.key as string, column);
        }
      });

      const filteredColumns = checks
        .filter((item) => item.checked)
        .map((check) => columnMap.get(check.key));

      return filteredColumns as TableColumn<
        AntDesign.TableDataWithIndex<GetTableData<A>>
      >[];
    },
    onFetched: async (transformed) => {
      const { total: totalNum } = transformed;

      setTotal(totalNum);
    },
    immediate,
  });

  // this is for mobile, if the system does not support mobile, you can use `pagination` directly
  const pagination: TablePaginationConfig = {
    total,
    simple: isMobile,
    pageSizeOptions: ["10", "15", "20", "25", "30"],
    showSizeChanger: true,
    current: searchParams.current.current,
    pageSize: searchParams.current.size,
    onChange: async (current: number, size: number) => {
      updateSearchParams({
        current,
        size,
      });
    },
    ...paginationConfig,
  };

  function reset() {
    form.resetFields();
    resetSearchParams();
  }

  async function run(isResetCurrent: boolean = true) {
    const res = await form.validateFields();

    if (res) {
      if (isResetCurrent) {
        const { current = 1, ...rest } = res;
        updateSearchParams({ current, ...rest });
      } else {
        updateSearchParams(res);
      }
    }
  }

  return {
    tableProps: {
      loading,
      dataSource: data,
      columns,
      rowKey,
      pagination,
    },
    searchProps: {
      form,
      reset,
      search: run,
    },
    empty,
    data,
    columnChecks,
    run,
    setColumnChecks,
    searchParams,
  };
}

export function useTableOperate<T extends TableData = TableData>(
  data: T[],
  getData: (isResetCurrent?: boolean) => Promise<void>,
  executeResActions: (res: T, operateType: AntDesign.TableOperateType) => void
) {
  const {
    bool: drawerVisible,
    setTrue: openDrawer,
    setFalse: closeDrawer,
  } = useBoolean();

  const { t } = useTranslation();

  const [operateType, setOperateType] =
    useState<AntDesign.TableOperateType>("add");

  const [form] = Form.useForm<T>();

  function handleAdd() {
    setOperateType("add");
    openDrawer();
  }

  /** the editing row data */
  const [editingData, setEditingData] = useState<T>();

  function handleEdit(idOrData: T["id"] | T) {
    if (typeof idOrData === "object") {
      form.setFieldsValue(idOrData);

      setEditingData(idOrData);
    } else {
      const findItem = data.find((item) => item.id === idOrData);
      if (findItem) {
        form.setFieldsValue(findItem);

        setEditingData(findItem);
      }
    }

    setOperateType("edit");
    openDrawer();
  }

  /** the checked row keys of table */
  const [checkedRowKeys, setCheckedRowKeys] = useState<React.Key[]>([]);

  function onSelectChange(keys: React.Key[]) {
    setCheckedRowKeys(keys);
  }

  const rowSelection: TableProps<T>["rowSelection"] = {
    columnWidth: 48,
    type: "checkbox",
    fixed: true,
    selectedRowKeys: checkedRowKeys,
    onChange: onSelectChange,
  };

  function onClose() {
    closeDrawer();

    form.resetFields();
  }

  /** the hook after the batch delete operation is completed */
  async function onBatchDeleted() {
    window.$message?.success(t("common.deleteSuccess"));
    setCheckedRowKeys([]);

    await getData(false);
  }

  /** the hook after the delete operation is completed */
  async function onDeleted() {
    window.$message?.success(t("common.deleteSuccess"));

    await getData(false);
  }

  async function handleSubmit() {
    const res = await form.validateFields();

    // request
    await executeResActions(res, operateType);

    window.$message?.success(t("common.updateSuccess"));

    onClose();
    getData();
  }

  return {
    drawerVisible,
    openDrawer,
    closeDrawer,
    operateType,
    handleAdd,
    editingData,
    handleEdit,
    checkedRowKeys,
    onSelectChange,
    rowSelection,
    onBatchDeleted,
    onDeleted,
    generalPopupOperation: {
      onClose,
      handleSubmit,
      operateType,
      form,
      open: drawerVisible,
    },
  };
}

export function useTableScroll(scrollX: number = 702) {
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const size = useSize(tableWrapperRef);

  function getTableScrollY() {
    const height = size?.height;

    if (!height) return undefined;

    return height - 160;
  }

  const scrollConfig = {
    y: getTableScrollY(),
    x: scrollX,
  };

  return {
    tableWrapperRef,
    scrollConfig,
  };
}
