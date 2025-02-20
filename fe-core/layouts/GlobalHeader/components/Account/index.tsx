"use client";
import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Flex, Typography } from "antd";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { authSelectors } from "@/fe-module-auth/reducers";
import { useResponsive } from "ahooks";

const { Text } = Typography;

const items: MenuProps["items"] = [
  // {
  //     key: "1",
  //     label: "Cấu hình chung",
  // },
  {
    key: "2",
    label: "Đổi mật khẩu",
  },
  {
    key: "3",
    label: "Đăng xuất",
  },
];

const Account: React.FC = () => {
  const router = useRouter();
  const me = useSelector(authSelectors.getMe);
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
          src={require("./images/avatar.jpg")}
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
