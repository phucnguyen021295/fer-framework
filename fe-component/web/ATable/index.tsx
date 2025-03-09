import React, { memo } from "react";
import { Table, TableProps } from "antd";
import AEmpty from "../AEmpty";

function ATable(props: TableProps) {
  return (
    <Table
      locale={{
        emptyText: <AEmpty />,
      }}
      {...props}
    />
  );
}

export default memo(ATable);
