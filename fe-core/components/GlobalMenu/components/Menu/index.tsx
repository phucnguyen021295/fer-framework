"use client";
import React, { memo, useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { appSelector } from "@/fer-framework/fe-core/reducers/app";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
      { key: "/booking-list", label: "Danh sách đặt chỗ", link: "/booking-list" },
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


const mapMenuItems = (items) => {
  return items.map((item) => {
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

const MenuBase: React.FC<Props> = (props: Props) => {
  const path = usePathname();
  const { mode = "inline" } = props;
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
    setCurrent(e.key);
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
      // items={items}
    >
      
      {mapMenuItems(items)}
    </Menu>
  );
};

export default memo(MenuBase);
