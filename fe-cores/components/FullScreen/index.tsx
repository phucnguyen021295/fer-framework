import React, { FC, memo } from "react";
import { Button, Tooltip } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface Props {
  full?: boolean;
  toggleFullscreen: () => void;
}

const FullScreen: FC<Props> = ({ full, toggleFullscreen }) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={full ? "Thoát toàn màn hình" : "Toàn màn hình"}>
      <Button
        type="text"
        onClick={toggleFullscreen}
        icon={full ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      />
    </Tooltip>
  );
};

export default memo(FullScreen);
