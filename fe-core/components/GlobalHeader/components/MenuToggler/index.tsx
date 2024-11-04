import { Button, Flex } from "antd";
import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Image from "next/image";

import { appSelector, setCollapsedSider } from "@/fe-core/reducers/app";

interface Props {
  /** Arrow style icon */
  arrowIcon?: boolean;
}

const MenuToggler: FC<Props> = ({ arrowIcon }) => {
  const dispatch = useDispatch();
  const { logo, heightLogo } = useSelector(appSelector.getHeaderConfig);
  const collapsed = useSelector(appSelector.getCollapsedSider);

  const onToggler = () => {
    dispatch(setCollapsedSider(!collapsed));
  };

  console.log("MenuToggler", "-----");
  return (
    <Flex style={{ paddingLeft: 8 }} align="center">
      <Button
        type="text"
        size="large"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggler}
      />
      <Image
        src={logo ? logo : require("@/public/logo.png")}
        alt="Vercel Logo"
        width={"100%"}
        height={heightLogo}
        priority
        style={{ marginLeft: 6, display: collapsed ? "block" : "none", cursor: "pointer" }}
      />
    </Flex>
  );
};

export default memo(MenuToggler);
