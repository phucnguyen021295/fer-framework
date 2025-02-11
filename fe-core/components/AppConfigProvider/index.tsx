"use client";
import React, { useEffect, useState } from "react";
import { Flex, Spin, Layout } from "antd";
import { APP_STATE, appAction } from "../../reducers/app";
import { useDispatch } from "react-redux";

interface Props {
  config: APP_STATE;
  children: React.ReactNode;
}

const GlobalAppConfig: React.FC<Props> = (props: Props) => {
  const { config, children } = props;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appAction.setAppConfig(config));
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (loading) {
    return (
      <Layout style={{ height: "100vh" }}>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{ height: "100vh" }}
        >
          <Spin />
        </Flex>
      </Layout>
    );
  }

  return children;
};

export default GlobalAppConfig;
