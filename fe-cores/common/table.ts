"use client";
import { useMemo, useState, useEffect, useCallback } from "react";
import { TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useHeightContent } from "../hooks/useHeightContent";
import { useResponsivePadding } from "../hooks/useResponsivePadding";
import { useMobile } from "./mobile";
import {
  cloneDeep,
  findIndex,
  has,
  includes,
  isArray,
  isEmpty,
  isObject,
  isString,
  merge,
  remove,
  some,
} from "lodash";

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
  isHeaderOperaiton?: boolean;
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
    isHeaderOperaiton = false,
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

    if (isHeaderOperaiton) {
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

/** ------------------------------------------------------------------ */

interface SearchRequest {
  query: string;
  filters?: Record<string, any>;
}

interface SearchResponse {
  items: any[];
  total: number;
}

interface SearchBody {
  page: number;
  pageSize: number;
  keyword: string;
  fieldsSearch?: string[];
  filters: {
    name: string;
    operation: "eq" | "in" | "gt" | "lt" | "between";
    value: number | string | string[] | number[];
  }[];
  sorts?: {
    property: string;
    direction: string;
  }[];
}

interface ConfigProps {
  useSearchMutation: any;
  bodyApi: SearchBody;
  updateSearchBody: (body: any) => void;
  columns: any[];
}

export function useHookTable(
  config: ConfigProps,
  paginationConfig?: Omit<
    TablePaginationConfig,
    "total" | "current" | "pageSize" | "onChange"
  >
) {
  const isMobile = useMobile();
  const { useSearchMutation, bodyApi, updateSearchBody, columns } = config;
  const [searchTable, { data, isLoading, isSuccess, isError, reset }] =
    useSearchMutation();
  const [isInitialFetchDone, setIsInitialFetchDone] = useState(false);

  // Memoize bodyApi để tránh re-render không cần thiết
  const currentBodyApi = useMemo(
    () => bodyApi,
    [
      bodyApi.page,
      bodyApi.pageSize,
      // Serialize các filter khác để so sánh
      JSON.stringify(
        Object.fromEntries(
          Object.entries(bodyApi).filter(
            ([key]) => !["page", "pageSize"].includes(key)
          )
        )
      ),
    ]
  );

  // Gọi API search table
  const searchTableApi = useCallback(
    async (body: SearchBody) => {
      try {
        const result = await searchTable(body);
        return result;
      } catch (error) {
        console.error("Error in searchTableApi:", error);
        return null;
      }
    },
    [searchTable]
  );

  // Gọi API khi bodyApi thay đổi
  useEffect(() => {
    const fetchData = async () => {
      await searchTableApi(currentBodyApi);
      if (!isInitialFetchDone) {
        setIsInitialFetchDone(true);
      }
    };

    fetchData();
  }, [currentBodyApi, searchTableApi]);

  // Tính toán total từ dữ liệu
  const total = useMemo(() => data?.total || 0, [data]);

  // Cấu hình pagination
  const pagination: TablePaginationConfig = useMemo(
    () => ({
      total,
      simple: isMobile,
      pageSizeOptions: ["10", "15", "20", "25", "30"],
      showSizeChanger: true,
      current: bodyApi.page,
      pageSize: bodyApi.pageSize,
      onChange: (page: number, pageSize: number) => {
        updateSearchBody({
          page,
          pageSize,
        });
      },
      showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
      ...paginationConfig,
    }),
    [
      total,
      isMobile,
      bodyApi.page,
      bodyApi.pageSize,
      updateSearchBody,
      paginationConfig,
    ]
  );

  // Force refresh bảng
  const refreshTable = useCallback(async () => {
    return searchTableApi(currentBodyApi);
  }, [currentBodyApi, searchTableApi]);

  // Reset về trang đầu tiên
  const resetToFirstPage = useCallback(() => {
    updateSearchBody({
      page: 1,
    });
  }, [updateSearchBody]);

  return {
    tableProps: {
      loading: isLoading,
      pagination,
      dataSource: data?.items || [],
    },
    data,
    columns,
    isInitialFetchDone,
    isSuccess,
    isError,
    updateSearchBody,
    refreshTable,
    resetToFirstPage,
    reset,
  };
}

/** ==================================================== */

const defaultFilter: SearchBody = {
  keyword: "",
  pageSize: 10,
  page: 1,
  filters: [],
};

type UpdateFilterParam = string | Partial<SearchBody> | "reset";

export const useHookFilter = (initialFilter?: Partial<SearchBody>) => {
  const [filters, setFilters] = useState<SearchBody>(
    merge({}, defaultFilter, initialFilter)
  );

  const isEmptyValue = (value: any): boolean =>
    isEmpty(value) || value === null || value === undefined;

  const updateFilter = useCallback(
    (keyOrObj: UpdateFilterParam, value?: any) => {
      // Case: Reset filters
      if (keyOrObj === "reset") {
        setFilters(defaultFilter);
        return;
      }

      setFilters((prev) => {
        // Case: Update via object
        if (isObject(keyOrObj) && !isString(keyOrObj)) {
          const newState = cloneDeep(prev);
          const updatedFields = keyOrObj as Partial<SearchBody>;

          // Determine if we need to reset page
          let shouldResetPage = some(["keyword", "pageSize"], (key) =>
            has(updatedFields, key)
          );

          // Xử lý đặc biệt cho mảng filters
          if ("filters" in updatedFields && updatedFields.filters) {
            // Tạo một mảng mới cho filters
            let newFilters = cloneDeep(prev.filters);

            // Xử lý từng filter trong updatedFields.filters
            updatedFields.filters.forEach((newFilter) => {
              const existingIndex = findIndex(newFilters, {
                name: newFilter.name,
              });

              if (existingIndex === -1) {
                // Filter chưa tồn tại
                if (!isEmptyValue(newFilter.value)) {
                  // Thêm mới nếu có giá trị
                  newFilters.push(newFilter);
                }
              } else {
                // Filter đã tồn tại
                if (isEmptyValue(newFilter.value)) {
                  // Xóa filter nếu giá trị rỗng
                  newFilters = newFilters.filter((_, i) => i !== existingIndex);
                } else {
                  // Cập nhật giá trị
                  newFilters[existingIndex].value = newFilter.value;
                }
              }
            });

            newState.filters = newFilters;
            shouldResetPage = true;
          }

          // Cập nhật các trường cơ bản khác
          if ("keyword" in updatedFields)
            newState.keyword = updatedFields.keyword || "";
          if ("pageSize" in updatedFields)
            newState.pageSize = updatedFields.pageSize || 10;
          if ("page" in updatedFields) newState.page = updatedFields.page || 1;

          // Reset page if needed
          if (shouldResetPage && !("page" in updatedFields)) {
            newState.page = 1;
          }

          return newState;
        }

        // Case: Update base property
        if (includes(["keyword", "pageSize", "page"], keyOrObj)) {
          const resetPage = includes(["keyword", "pageSize"], keyOrObj);
          return {
            ...prev,
            [keyOrObj]: value,
            page: resetPage ? 1 : prev.page,
          };
        }

        // Case: Update filter
        const newFilters = cloneDeep(prev.filters);
        const filterIndex = findIndex(newFilters, { name: keyOrObj });

        if (filterIndex === -1) {
          // Filter không tồn tại, thêm mới nếu giá trị không rỗng
          if (!isEmptyValue(value)) {
            newFilters.push({
              name: keyOrObj as string,
              operation: isArray(value) ? "in" : "eq",
              value,
            });
          }
        } else {
          // Filter đã tồn tại
          if (isEmptyValue(value)) {
            // Xóa filter nếu giá trị rỗng
            remove(newFilters, (_, i) => i === filterIndex);
          } else {
            // Cập nhật giá trị
            newFilters[filterIndex].value = value;
          }
        }

        return {
          ...prev,
          filters: newFilters,
          page: 1, // Reset page when updating filters
        };
      });
    },
    []
  );

  // // Hàm này trả về filters đã loại bỏ các giá trị rỗng
  // const getCleanFilters = useCallback(() => {
  //   return {
  //     ...filters,
  //     filters: filters.filters.filter((filter) => !isEmptyValue(filter.value)),
  //   };
  // }, [filters]);

  return { filters, updateFilter };
};
