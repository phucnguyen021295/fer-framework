"use client";

import { Flex, Typography } from "antd";
import { createStyles } from "antd-style";

const {Title} = Typography;

function Ticketing() {
  const { styles } = useStyles();
  return (
    <Flex className={styles.container} vertical>
      <Flex className={styles.content} vertical>
        <Title level={3} style={{textAlign: 'center'}}>Tìm kiếm chuyến bay</Title>
      </Flex>
    </Flex>
  );
}

export default Ticketing;

const useStyles = createStyles(({ token, css }) => ({
  // Also supports obtaining the same writing experience as normal css through css string templates
  container: css`
    min-height: calc(100vh - 62px);
    width: 100%;
  `,

  content: css`
    margin: 20px;
    padding: 20px;
    min-height: calc(100vh - 102px);
    border-radius: 12px;
    background-color: ${token.colorBgContainer};
  `,
}));
