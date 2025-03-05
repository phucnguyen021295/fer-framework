import React, { memo, useState } from "react";
import { Button, Drawer, Flex, Tooltip } from "antd";
import { LayoutOutlined } from "@ant-design/icons";
import LayoutMode from "./LayoutMode";
import DarkModeSider from "./DarkModeSider";

const ThemeConfiguration: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={"Cấu hình theme"}>
        <Button type="text" icon={<LayoutOutlined />} onClick={showDrawer} />
      </Tooltip>
      <Drawer title="Theme Configuration" onClose={onClose} open={open}>
        <Flex gap={12} vertical>
          <DarkModeSider />
          <LayoutMode />
        </Flex>
      </Drawer>
    </>
  );
};

export default memo(ThemeConfiguration);
