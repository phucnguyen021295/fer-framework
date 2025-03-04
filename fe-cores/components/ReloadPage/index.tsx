"use client";
import React, { FC, memo } from "react";
import { Button, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { ReloadOutlined } from "@ant-design/icons";

interface Props {
  loading?: boolean;
  handClick?: () => void;
}
const ReloadPage: FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const { loading, handClick } = props;

  return (
    <Tooltip title={"Tải lại trang"}>
      <Button
        type="text"
        loading={loading}
        onClick={handClick}
        icon={<ReloadOutlined />}
      />
    </Tooltip>
  );
};

export default memo(ReloadPage);
