import React from "react";
import { Button, Flex, Result } from "antd";

const NotFound: React.FC = () => (
  <Flex vertical align="center" justify="center" style={{height: '100vh'}}>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" href="/">
          Back Home
        </Button>
      }
    />
  </Flex>
);

export default NotFound;
