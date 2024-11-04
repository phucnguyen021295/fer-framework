"use client";
import React, { memo, useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { appSelector } from "@/fer-framework/fe-core/reducers/app";
import { usePathname } from "next/navigation";

interface Props {
  mode: 'inline' | 'horizontal'
}

const MenuBase: React.FC<Props> = (props: Props) => {
  const path = usePathname();
  const {mode = 'inline'} = props;
  const items = useSelector(appSelector.getItemsMenu);
  const theme = useSelector(appSelector.getTheme);
  const collapsed = useSelector(appSelector.getCollapsedSider);
  const [current, setCurrent] = useState(path);
  const [openKeys, setOpenKeys] = useState([]);

  const getDefaultOpenKeys = (path) => {
    const openKeys = [];
    items.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (child.key === path) {
            openKeys.push(item.key);
          }
        });
      }
    });
    return openKeys;
  };

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key)
  };

  return (
    <Menu
      theme={theme}
      onClick={onClick}
      selectedKeys={[current]}
      style={{ height: "100%" }}
      defaultSelectedKeys={[current]}
      defaultOpenKeys={getDefaultOpenKeys(path)}
      mode={mode}
      inlineCollapsed={collapsed}
      items={items}
    />
  );
};

export default memo(MenuBase);
