import { Button, Drawer, Flex } from "antd";
import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Image from "next/image";

import { appSelector, setCollapsedSider } from "@/fe-core/reducers/app";
import GlobalMenu from "../../../GlobalMenu";
import { GLOBAL_SIDER_MENU_ID } from "@/fer-framework/fe-core/constants";
import { createStyles } from "antd-style";
import GlobalLogo from "../../../GlobalLogo";

interface Props {
  /** Arrow style icon */
  arrowIcon?: boolean;
}

const MenuToggler: FC<Props> = ({ arrowIcon }) => {
  const dispatch = useDispatch();
  const { styles, theme } = useStyles();
  const { logo, heightLogo } = useSelector(appSelector.getHeaderConfig);
  const collapsed = useSelector(appSelector.getCollapsedSider);

  const onToggler = () => {
    dispatch(setCollapsedSider(!collapsed));
  };

  return (
    <Flex style={{ paddingLeft: 8 }} align="center">
      <Button
        type="text"
        size="large"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggler}
      />
      <Image
        src={logo}
        alt="Vercel Logo 1"
        width={"100%"}
        height={heightLogo}
        priority
        style={{
          marginLeft: 6,
          display: !collapsed ? "block" : "none",
          cursor: "pointer",
        }}
      />
      <Drawer
        title={
          <Flex
            justify="space-between"
            align="center"
            style={{ paddingRight: 8 }}
          >
            <GlobalLogo
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            />
            <Button
              type="text"
              size="large"
              icon={<MenuUnfoldOutlined />}
              onClick={onToggler}
            />
          </Flex>
        }
        placement="left"
        width={320}
        style={{ background: theme.colorBgBase }}
        className={styles.drawer}
        closable={false}
        onClose={onToggler}
        open={collapsed}
      >
        <div id={GLOBAL_SIDER_MENU_ID} />
      </Drawer>
    </Flex>
  );
};

export default memo(MenuToggler);

const useStyles = createStyles(({ token, css }) => ({
  drawer: css`
    & .ant-drawer-body {
      padding: 0;
    }
    & .ant-drawer-header {
      padding: 12px 0;
    }
  `,
}));
