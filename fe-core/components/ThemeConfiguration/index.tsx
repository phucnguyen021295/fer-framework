import React, { memo, useState } from "react";
import { Button, Drawer } from "antd";
import { LayoutOutlined } from "@ant-design/icons";
import {
  LAYOUT_MODE_HORIZONTAL,
  LAYOUT_MODE_HORIZONTAL_MIX,
  LAYOUT_MODE_VERTICAL,
  LAYOUT_MODE_VERTICAL_MIX,
  ThemeLayoutMode,
} from "../../constants";
import { setLayoutMode } from "../../reducers/app";
import { useDispatch } from "react-redux";

const ThemeConfiguration: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleInverted = (inverted: ThemeLayoutMode) => {
    dispatch(setLayoutMode(inverted));
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="text" icon={<LayoutOutlined />} onClick={showDrawer} />
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <Button onClick={() => toggleInverted(LAYOUT_MODE_VERTICAL)}>
          vertical
        </Button>
        <Button onClick={() => toggleInverted(LAYOUT_MODE_HORIZONTAL)}>
          horizontal
        </Button>
        <Button onClick={() => toggleInverted(LAYOUT_MODE_VERTICAL_MIX)}>
          vertical-mix
        </Button>
        <Button onClick={() => toggleInverted(LAYOUT_MODE_HORIZONTAL_MIX)}>
          horizontal-mix
        </Button>
      </Drawer>
    </>
  );
};

export default memo(ThemeConfiguration);
