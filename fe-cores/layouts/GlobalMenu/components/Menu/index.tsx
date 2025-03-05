"use client";
import React, { memo, useEffect, useMemo, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { appSelector } from "../../../../reducers/app";
import useLayoutBase from "../../../LayoutBase/useLayoutBase";

interface Props {
  mode: "inline" | "horizontal";
}

const menuData = [
  {
    key: "/home",
    label: "Trang chủ",
    // icon: <HomeOutlined />,
    link: "/home",
  },
  {
    key: "/manage-booking",
    label: "Quản lý đặt chỗ",
    // icon: <BorderHorizontalOutlined />,
    children: [
      { key: "/booking", label: "Đặt chỗ", link: "/booking" },
      {
        key: "/booking-list",
        label: "Danh sách đặt chỗ",
        link: "/booking-list",
      },
      { key: "/ticketing", label: "Nghiệp vụ vé", link: "/ticketing" },
      { key: "/stuffed", label: "Nhồi booking", link: "/stuffed" },
    ],
  },
  {
    key: "/accountant",
    label: "Kế toán",
    // icon: <PieChartOutlined />,
    link: "/accountant",
  },
  {
    key: "/setting",
    label: "Cài đặt",
    // icon: <SettingOutlined />,
    link: "/setting",
  },
  {
    key: "/config",
    label: "Cấu hình",
    // icon: <AppstoreOutlined />,
    link: "/config",
  },
];

const mapMenuItems = (items: any) => {
  return items.map((item: any) => {
    if (item.children) {
      // Nếu có children, render thành SubMenu
      return (
        <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
          {mapMenuItems(item.children)} {/* Đệ quy render children */}
        </Menu.SubMenu>
      );
    }
    // Nếu không có children, render thành Menu.Item
    return (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link href={item.link}>{item.label}</Link>
      </Menu.Item>
    );
  });
};

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const MenuBase: React.FC<Props> = (props: Props) => {
  const path = usePathname();
  const { mode = "inline" } = props;
  const items = useSelector(appSelector.getItemsMenu);
  const theme = useSelector(appSelector.getTheme);
  const { isMobile, collapsedSider } = useLayoutBase();
  const darkMode = useSelector(appSelector.getDarkModeSider);
  const [current, setCurrent] = useState(path);
  const [stateOpenKeys, setStateOpenKeys] = useState([]);

  useEffect(() => {
    setCurrent(path);
    setStateOpenKeys(getDefaultOpenKeys(path));
  }, [path]);

  const getDefaultOpenKeys = (path: string) => {
    const openKeys: any = [];
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
    setCurrent(e.key);
  };

  const setOpenKeys = (openKeys: any) => {
    const levelKeys = getLevelKeys(items as LevelKeysProps[]);

    const currentOpenKey = openKeys.find(
      (key: string) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    setOpenKeys(openKeys);
  };

  // Trường hợp mobile thì luôn hiển thị thông tin chi tiết menu
  const _inlineCollapsed = useMemo(() => {
    if (isMobile) {
      return false;
    }
    return collapsedSider;
  }, [collapsedSider, isMobile]);

  return (
    <Menu
      theme={darkMode && mode === "inline" ? "dark" : theme}
      onClick={onClick}
      selectedKeys={[current]}
      defaultSelectedKeys={[current]}
      style={{ height: "100%" }}
      defaultOpenKeys={getDefaultOpenKeys(path)}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      mode={mode}
      inlineCollapsed={_inlineCollapsed}
    >
      {mapMenuItems(items)}
    </Menu>
  );
};

export default memo(MenuBase);
