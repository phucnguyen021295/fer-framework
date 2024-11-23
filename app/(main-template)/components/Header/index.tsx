"use client";
import { Button, Flex } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GlobalOutlined } from "@ant-design/icons";

// Components
import Account from "@/app/(main-template)/components/Account";

const Header: React.FC = () => {
  const router = useRouter();

  const onClickLogo = () => {
    router.refresh();
  };

  return (
    <Flex style={{height: '100%'}} align="center" justify="space-between">
      <Image
        src={require("@/public/logo.png")}
        alt="Vercel Logo"
        width={112}
        height={48}
        priority
        style={{
          cursor: "pointer",
        }}
        onClick={onClickLogo}
      />
      <Flex align="center" gap={12}>
        {/* <Button type="text" icon={require('@/public/icon/notification.svg')} /> */}
        <Button type="text" icon={<GlobalOutlined />}>
          Tiếng Việt
        </Button>

        <Account />
      </Flex>
    </Flex>
  );
};

export default Header;
