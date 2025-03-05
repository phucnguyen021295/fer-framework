"use client";
import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Flex, Typography } from "antd";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {
  DownOutlined,
  KeyOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { authSelectors } from "../../reducers";
import { useResponsive } from "ahooks";

const { Text } = Typography;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Thông tin cá nhân",
    icon: <UserOutlined />,
  },
  {
    key: "2",
    label: "Đổi mật khẩu",
    icon: <KeyOutlined />,
  },
  {
    key: "3",
    label: "Đăng xuất",
    icon: <LogoutOutlined />,
  },
];

const Account: React.FC = () => {
  const router = useRouter();
  const me: any = useSelector(authSelectors.getMe);
  const { sm } = useResponsive();

  const onClick = (event: any) => {
    console.log("onChange", event);
    if (event.key === "3") {
      deleteCookie("token");
      router.refresh();
    }
  };

  return (
    <Dropdown menu={{ items, onClick }} placement="bottomRight">
      <Flex align="center" gap={8} style={{ height: "100%" }}>
        <Image
          src={require("@/public/avatar.jpg")}
          width={32}
          height={32}
          alt="avatar"
          style={{ borderRadius: 24 }}
        />
        {sm && <Text>{me?.fullName}</Text>}
        <DownOutlined />
      </Flex>
    </Dropdown>
  );
};

export default Account;
