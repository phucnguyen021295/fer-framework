import {
  AppstoreOutlined,
  HomeOutlined,
  PieChartOutlined,
  SettingOutlined,
  BorderHorizontalOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { MenuItem } from "@/fe-core/constants";

export const items_menu: MenuItem[] = [
  {
    key: "/home",
    label: "Trang chủ",
    icon: <HomeOutlined />,
    link: "/home",
  },
  {
    key: "/manage-booking",
    label: "Quản lý đặt chỗ",
    icon: <BorderHorizontalOutlined />,
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
    icon: <PieChartOutlined />,
    link: "/accountant",
  },
  {
    key: "/setting",
    label: "Cài đặt",
    icon: <SettingOutlined />,
    link: "/setting",
  },
  {
    key: "/config",
    label: "Cấu hình",
    icon: <AppstoreOutlined />,
    link: "/config",
  },
];
