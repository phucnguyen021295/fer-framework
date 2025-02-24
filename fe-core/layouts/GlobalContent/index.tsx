"use client";
import { Flex } from "antd";
import useResponsivePadding from "@/fe-core/hooks/useResponsivePadding";

interface Props {
  children: React.ReactNode;
}

const GlobalContent: FC<Props> = (props: Props) => {
  const padding = useResponsivePadding();
  const { children } = props;

  return (
    <Flex gap={padding} vertical style={{ flex: 1 }}>
      {children}
    </Flex>
  );
};

export default memo(GlobalContent);
