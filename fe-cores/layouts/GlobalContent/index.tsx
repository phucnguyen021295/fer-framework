"use client";
import React, { memo } from "react";
import { Flex } from "antd";
import { useResponsivePadding } from "../../hooks/useResponsivePadding";

interface Props {
  children: React.ReactNode;
}

const GlobalContent = (props: Props) => {
  const padding = useResponsivePadding();
  const { children } = props;

  return (
    <Flex gap={padding} vertical style={{ flex: 1 }}>
      {children}
    </Flex>
  );
};

export default memo(GlobalContent);
