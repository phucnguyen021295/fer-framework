import React, { memo } from "react";
import { Empty } from "antd";
import { EmptyProps } from "antd/es/empty";

interface AEmptyProps extends EmptyProps {
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

const AEmpty: React.FC<AEmptyProps> = ({
  description = "Không có dữ liệu",
  icon,
  ...restProps
}) => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={description}
      {...restProps}
    />
  );
};

export default memo(AEmpty);
