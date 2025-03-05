"use client";
import { useMemo, useState, useEffect } from "react";
import { TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useHeightContent } from "../hooks/useHeightContent";
import { useResponsivePadding } from "../hooks/useResponsivePadding";
import { useMobile } from "./mobile";

type SIZE = { small: number; middle: number; large: number };

const HEADER_TABLE_SIZE: SIZE = {
  small: 39,
  middle: 47,
  large: 55,
};

const FOOTER_TABLE_SIZE: SIZE = {
  small: 56,
  middle: 56,
  large: 64,
};

const CARD_PADDING = 32;

const TABLE_HEADER_OPERAITION_HEIGHT = 65;

interface TableScrollProps {
  scrollX?: number;
  isHidePadding?: boolean;
  isHideCard?: boolean;
  size?: "small" | "middle" | "large";
  minHeight?: number;
  deductionHeight?: number;
  isPagination?: boolean;
  isFooter?: boolean;
  isTableHeaderOperaiton?: boolean;
}

/**
 * useTableScroll - Hook tính toán scroll của table
 * Mục đích - Bảng table luôn nằm trong 1 màn hình thì cần tính toán scroll table trong màn hình đó
 * @param {Object} props - Props của component
 * @param {number} props.scrollX - Giới hạn scrollX(Mặc định là 960)
 * @param {boolean} props.isHidePadding - Trạng thái padding trên dưới(khi padding trên dưới Content 1 khoảng padding thì trạng thái là false, ngược lại là true)
 * @param {boolean} props.isHideCard - Trạng thái table có dùng component Card bao ngoài hay không(nêú có dùng thì sẽ phải trừ khoảng padding trên dưới của Card)
 * @param {string} props.size - Size của table(Nhắm mục đính tính toán chiều cao Header, Footer của table)
 * @param {number} props.minHeight - Chiều cao nhỏ nhất của table
 * @param {number} props.deductionHeight - Chiều cao còn lại của Content đã dùng
 * @param {boolean} props.isPagination - Trạng thái phân trạng(nếu có phân trang thì sẽ phải trừ đi chiều cao của phân trang)
 * @param {boolean} props.isFooter - Trạng thái dùng footer(nếu có footer thì sẽ phải trừ đi chiều cao của footer)
 */

export function useTableScroll(props: TableScrollProps) {
  const {
    scrollX = 960,
    isHidePadding = false,
    isHideCard = false,
    size = "large",
    minHeight = 120,
    deductionHeight = 0,
    isFooter = false,
    isPagination = true,
    isTableHeaderOperaiton = false,
  } = props;
  const tableHeight = useHeightContent();
  const padding = useResponsivePadding();

  const scrollConfig = useMemo(() => {
    let PADDING = 0;
    let _CARD_PADDING = 0;
    let FOOTER_TABLE = 0;
    let PAGINATION_TABLE = 0;
    let _TABLE_HEADER_OPERAITION_HEIGHT = 0;
    if (!isHidePadding) {
      PADDING = padding;
    }

    if (!isHideCard) {
      _CARD_PADDING = CARD_PADDING;
    }

    if (isPagination) {
      PAGINATION_TABLE = FOOTER_TABLE_SIZE[size];
    }

    if (isFooter) {
      FOOTER_TABLE = FOOTER_TABLE_SIZE[size];
    }

    if (isTableHeaderOperaiton) {
      _TABLE_HEADER_OPERAITION_HEIGHT = TABLE_HEADER_OPERAITION_HEIGHT;
    }

    const HEADER_TABLE = HEADER_TABLE_SIZE[size];

    /**
     * scrollY - được tính toán lấy chiều cao của Content trừ đi các phần còn lại
     * đã hiển thị trên content, và các phần Header Footer Pagination của table
     */
    const scrollY =
      tableHeight -
      PADDING * 2 -
      HEADER_TABLE -
      FOOTER_TABLE -
      PAGINATION_TABLE -
      _CARD_PADDING -
      _TABLE_HEADER_OPERAITION_HEIGHT -
      deductionHeight;
    return { x: scrollX, y: Math.max(scrollY, minHeight) };
  }, [
    isHidePadding,
    isHideCard,
    size,
    tableHeight,
    deductionHeight,
    scrollX,
    minHeight,
    padding,
    isPagination,
  ]);

  return { scrollConfig };
}

/** ------------------------------------------------------------------------------ */

/**
 * Interface cho các tùy chọn của useTablePagination
 * @template RecordType - Kiểu dữ liệu của record trong bảng
 */
interface UseTablePaginationOptions<RecordType> {
  /** Tổng số items trong bảng */
  total?: number;
  /** Kích thước mặc định của trang */
  defaultPageSize?: number;
  /** Trang hiện tại mặc định */
  defaultCurrent?: number;
  /** Các tùy chọn pageSize hiển thị trong dropdown */
  pageSizeOptions?: string[];
  /** Callback khi thay đổi pagination, filters hoặc sorter */
  onChange?: (
    page: number,
    pageSize: number,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[]
  ) => void;
}

/**
 * Interface cho kết quả trả về từ getSliceIndices
 */
interface SliceIndices {
  /** Chỉ số bắt đầu cho việc slice dữ liệu */
  startIndex: number;
  /** Chỉ số kết thúc cho việc slice dữ liệu */
  endIndex: number;
}

/**
 * Interface cho kết quả trả về từ useTablePagination
 * @template RecordType - Kiểu dữ liệu của record trong bảng
 */
interface UseTablePaginationResult<RecordType> {
  /** Cấu hình pagination để truyền vào component Table */
  pagination: TablePaginationConfig;

  /**
   * Hàm xử lý sự kiện onChange của Table
   * @param newPagination - Cấu hình pagination mới
   * @param filters - Các filter hiện tại
   * @param sorter - Thông tin sắp xếp hiện tại
   */
  handleTableChange: (
    newPagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[]
  ) => void;

  /**
   * Đặt lại về trang đầu tiên
   */
  resetToFirstPage: () => void;

  /**
   * Đặt trang hiện tại
   * @param page - Số trang muốn thiết lập
   */
  setCurrentPage: (page: number) => void;

  /**
   * Đặt kích thước trang
   * @param size - Kích thước trang muốn thiết lập
   */
  setPageSize: (size: number) => void;

  /**
   * Lấy chỉ số bắt đầu và kết thúc cho việc slice dữ liệu ở client-side
   * @returns Đối tượng chứa startIndex và endIndex
   */
  getSliceIndices: () => SliceIndices;
}

/**
 * Custom hook để quản lý pagination cho Table của Ant Design
 *
 * @template RecordType - Kiểu dữ liệu của record trong bảng
 * @param options - Các tùy chọn cấu hình
 * @param options.total - Tổng số items trong bảng
 * @param options.defaultPageSize - Kích thước mặc định của trang (mặc định: 10)
 * @param options.defaultCurrent - Trang hiện tại mặc định (mặc định: 1)
 * @param options.pageSizeOptions - Các tùy chọn pageSize hiển thị trong dropdown (mặc định: ['10', '20', '50', '100'])
 * @param options.onChange - Callback khi thay đổi pagination, filters hoặc sorter
 *
 * @returns Đối tượng chứa pagination config và các helper methods
 *
 * @example
 * // Sử dụng với server-side pagination
 * const { pagination, handleTableChange } = useTablePagination<Product>({
 *   total: totalItems,
 *   onChange: (page, pageSize) => {
 *     fetchData(page, pageSize);
 *   }
 * });
 *
 * // Sử dụng với client-side pagination
 * const { pagination, handleTableChange, getSliceIndices } = useTablePagination<Product>({
 *   total: data.length
 * });
 * const { startIndex, endIndex } = getSliceIndices();
 * const currentPageData = data.slice(startIndex, endIndex);
 */
function useTablePagination<RecordType>(
  options: UseTablePaginationOptions<RecordType> = {}
): UseTablePaginationResult<RecordType> {
  const {
    total = 0,
    defaultPageSize = 10,
    defaultCurrent = 1,
    pageSizeOptions = ["10", "20", "50", "100"],
    onChange,
  } = options;

  // Cấu hình pagination state
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: defaultCurrent,
    pageSize: defaultPageSize,
    total,
    pageSizeOptions,
    showSizeChanger: true,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} của ${total} mục`,
    // Thêm các thuộc tính pagination khác nếu cần
  });

  // Cập nhật total khi dữ liệu thay đổi
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total,
    }));
  }, [total]);

  /**
   * Xử lý khi thay đổi trang, pageSize, filters hoặc sorter
   */
  const handleTableChange = (
    newPagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[]
  ): void => {
    const { current, pageSize } = newPagination;

    setPagination((prev) => ({
      ...prev,
      current,
      pageSize,
    }));

    // Gọi callback
    if (onChange && current && pageSize) {
      onChange(current, pageSize, filters, sorter);
    }
  };

  /**
   * Đặt lại về trang đầu tiên
   */
  const resetToFirstPage = (): void => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  /**
   * Đặt trang hiện tại
   */
  const setCurrentPage = (page: number): void => {
    setPagination((prev) => ({
      ...prev,
      current: page,
    }));
  };

  /**
   * Đặt kích thước trang và reset về trang đầu
   */
  const setPageSize = (size: number): void => {
    setPagination((prev) => ({
      ...prev,
      pageSize: size,
      current: 1, // Reset về trang đầu khi thay đổi pageSize
    }));
  };

  /**
   * Tính toán các chỉ số cho việc slice data ở client-side
   */
  const getSliceIndices = (): SliceIndices => {
    const current = pagination.current || defaultCurrent;
    const pageSize = pagination.pageSize || defaultPageSize;

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return { startIndex, endIndex };
  };

  // Trả về pagination config và các helper methods
  return {
    pagination,
    handleTableChange,
    resetToFirstPage,
    setCurrentPage,
    setPageSize,
    getSliceIndices,
  };
}

export default useTablePagination;

/** ------------------------------------------------------------------ */

interface SearchRequest {
  query: string;
  filters?: Record<string, any>;
}

interface SearchResponse {
  items: any[];
  total: number;
}

type UseSearchMutationHook = () => [
  (arg: SearchRequest) => Promise<
    | {
        data: SearchResponse;
      }
    | {
        error: unknown;
      }
  >,
  {
    data?: SearchResponse;
    error?: unknown;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
  }
];

interface ConfigProps {
  useSearchMutation: UseSearchMutationHook;
  apiBody: {
    keyword?: string;
    fieldsSearch?: string[];
    page: number;
    pageSize: number;
    filters?: {
      name: string;
      operation: "eq";
      value: number | string | string[] | number[];
    }[];
    sorts?: {
      property: string;
      direction: string;
    }[];
  };
  updateSearchBody: (body: any) => void;
}

export function useTable(
  config: ConfigProps,
  paginationConfig?: Omit<
    TablePaginationConfig,
    "total" | "current" | "pageSize" | "onChange"
  >
) {
  const { useSearchMutation, apiBody, updateSearchBody } = config;
  const isMobile = useMobile();
  const [searchTable, { data, isLoading, isSuccess, isError, reset }] =
    useSearchMutation();

  const searchTableApi = async (apiBody: unknown) => {
    try {
      const body: any = { body: apiBody };
      const result = await searchTable(body);
      console.log("searchTableApi", result);
    } catch (error) {
      console.log("searchTableApi", error);
    }
  };

  useEffect(() => {
    searchTableApi(apiBody).then();
  }, [apiBody, searchTableApi]);

  const total = useMemo(() => data?.total || 0, [data]);

  const pagination: TablePaginationConfig = {
    total,
    simple: isMobile,
    pageSizeOptions: ["10", "15", "20", "25", "30"],
    showSizeChanger: true,
    current: apiBody.page,
    pageSize: apiBody.pageSize,
    onChange: (page: number, pageSize: number) => {
      updateSearchBody({
        page,
        pageSize,
      });
    },
    ...paginationConfig,
  };

  return {
    tableProps: {
      loading: isLoading,
      pagination,
    },
    data,
    isSuccess: isSuccess,
    isError: isError,
    updateSearchBody,
  };
}
