"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  PieChartOutlined,
  SettingOutlined,
  BorderHorizontalOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu } from "antd";
import Link from "next/link";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "home",
    label: (<Link href="/home" style={{textAlign: 'left'}}>Trang chủ</Link>),
    icon: <HomeOutlined />,
  },
  {
    key: "sub2",
    label: "Quản lý đặt chỗ",
    icon: <BorderHorizontalOutlined />,
    children: [
      { key: "5", label: "Đặt chỗ" },
      { key: "6", label: "Danh sách đặt chỗ" },
      { key: "7", label: (<Link href="/ticketing" style={{textAlign: 'left'}}>Nghiệp vụ vé</Link>) },
      { key: "8", label: "Nhồi booking" },
    ],
  },
  {
    key: "sub3",
    label: "Kế toán",
    icon: <PieChartOutlined />,
    // children: [
    //   { key: "5", label: "Đặt chỗ" },
    //   { key: "6", label: "Danh sách đặt chỗ" },
    //   { key: "7", label: "Nghiệp vụ vé" },
    //   { key: "8", label: "Nhồi booking" },
    // ],
  },
  {
    key: "sub4",
    label: "Cài đặt",
    icon: <SettingOutlined />,
  },
  {
    key: "sub5",
    label: "Cấu hình",
    icon: <AppstoreOutlined />,
  },
];

const MenuMain: React.FC = () => {  

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
        onClick={onClick}
        style={{ height: '100%'}}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        // theme="dark"
        items={items}
      />
  );
};

export default MenuMain;
