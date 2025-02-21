"use client";
import { FC, memo, useMemo } from "react";
import { Flex } from "antd";
import useResponsivePadding from "@/fe-core/hooks/useResponsivePadding";

interface Props {
  children: React.ReactNode;
}

const GlobalContent: FC<Props> = (props: Props) => {
  const padding = useResponsivePadding();
  const { children } = props;

  return (
    <Flex gap={padding} style={{ padding: padding }} vertical>
      {children}
    </Flex>
  );
};

export default memo(GlobalContent);
