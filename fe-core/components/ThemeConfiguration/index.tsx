import React, { memo, useState } from "react";
import { Button, Drawer } from "antd";
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
      <Button type="text" icon={<LayoutOutlined />} onClick={showDrawer} />
      <Drawer title="Theme Configuration" onClose={onClose} open={open}>
        <DarkModeSider />
        <LayoutMode />
      </Drawer>
    </>
  );
};

export default memo(ThemeConfiguration);
