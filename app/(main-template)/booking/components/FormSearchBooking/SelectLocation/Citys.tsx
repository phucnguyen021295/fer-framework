import React, { memo, useMemo, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Affix, Input, List, Typography } from "antd";
import { useGetListCityQuery } from "@/app/apis/city";
import { createStyles } from "antd-style";
import InfiniteScroll from "react-infinite-scroll-component";

const { Text } = Typography;

interface Props {
  id: number;
  onChoose: (item: any) => void;
  airportCode: string;
}

const Citys: React.FC<Props> = (props: Props, ref) => {
  const { styles } = useStyles();
  const { onChoose, id, airportCode } = props;
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const { data, isLoading, isFetching } = useGetListCityQuery({
    region_id: id,
    page: page,
    page_size: 12,
    keyword: keyword,
  });
  const [cities, setCities] = useState<any[]>([]);

  // Update data khi có phản hồi mới
  React.useEffect(() => {
    if (data?.items) {
      setCities((prev) => [...prev, ...data.items]);
    }
  }, [data]);

  const fetchMoreData = () => {
    if (!isFetching && cities.length < data?.total) {
      setPage((prev) => prev + 1);
    }
  };

  const header = (
    <Input
      placeholder="Tìm kiếm sân bay"
      onChange={(value) => setKeyword(value)}
      prefix={<SearchOutlined />}
    />
  );

  const dataSource = useMemo(() => {
    return cities.filter((city) => city.airportCode !== airportCode);
  }, [cities, airportCode]);
  console.log("airportCode", airportCode);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
      }}
    >
      <InfiniteScroll
        dataLength={cities.length}
        next={fetchMoreData}
        hasMore={cities.length < data?.total}
        loader={<Text>Loading...</Text>}
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout="horizontal"
          loading={isLoading}
          className={styles.container}
          header={header}
          dataSource={dataSource}
          renderItem={(item, index) => (
            <List.Item onClick={() => onChoose(item)}>
              {`${item.name} (${item.airportCode})`}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default memo(Citys);

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    & .ant-list-header {
      padding-top: 4px;
    }
  `,
}));
