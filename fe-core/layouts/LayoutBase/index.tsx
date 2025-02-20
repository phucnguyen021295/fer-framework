"use client";
configResponsive({ xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 });

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import { configResponsive, useResponsive } from "ahooks";

import GlobalHeader from "../GlobalHeader";
import GlobalSider from "../GlobalSider";

// Reducer
import {
  appSelector,
  setCollapsedSider,
  setIsMobile,
  setLayoutMode,
  setTheme,
} from "../../reducers/app";

// Constants
import {
  GLOBAL_PAGE_TAB_ID,
  LAYOUT_MODE_HORIZONTAL,
  LAYOUT_MODE_VERTICAL,
  LAYOUT_MODE_VERTICAL_MIX,
  ThemeLayoutMode,
} from "../../constants";
import GlobalMenu from "../GlobalMenu";
import { useTheme } from "@/fe-global/themes/ThemeProvider";
import { createStyles } from "antd-style";
import GlobalTab from "../GlobalTab";
import useResponsivePadding from "../../hooks/useResponsivePadding";

const { Header, Sider, Content, Footer } = Layout;

interface Props {
  children: React.ReactNode;
  layoutMode: ThemeLayoutMode; // Loai hiển thị layout
  headerHeight?: number; // Chiều cao header
  isPageTab?: boolean;
  widthSider?: number;
  collapsedSider: boolean;
  showFooter?: boolean; // Trạng thái ẩn hiện footer
  FooterComponent?: React.ReactNode;
}

export default function LayoutBase(props: Props) {
  const {
    children,
    layoutMode,
    headerHeight = 64,
    widthSider = 280,
    collapsedSider,
    showFooter,
    FooterComponent,
    isPageTab,
  } = props;
  const padding = useResponsivePadding();
  const { styles, theme } = useStyles();
  const dispatch = useDispatch();
  const { mode } = useTheme();
  // const {
  //   token: { headerBg },
  // } = theme.useToken();
  const { md, lg, xl } = useResponsive();
  const darkModeSider = useSelector(appSelector.getDarkModeSider);
  const isMobile = !md;

  useLayoutEffect(() => {
    dispatch(setIsMobile(isMobile));
    if (isMobile) {
      dispatch(setLayoutMode(LAYOUT_MODE_VERTICAL));
      dispatch(setCollapsedSider(false));
      return;
    }
    if (!lg || (lg && !xl)) {
      dispatch(setCollapsedSider(true));
    }
  }, [isMobile, lg, xl, dispatch]);

  useEffect(() => {
    dispatch(setTheme(mode));
  }, [mode]);

  const toggleCollapsed = () => {
    dispatch(setCollapsedSider(!collapsedSider));
  };

  const { showSider, invertedSider } = useMemo(() => {
    if (isMobile) {
      return { showSider: false, invertedSider: true };
    }
    // Trường hợp layout có header, content, footer
    if (layoutMode === LAYOUT_MODE_HORIZONTAL) {
      return { showSider: false, invertedSider: true };
    }

    if (layoutMode === LAYOUT_MODE_VERTICAL) {
      return { showSider: true, invertedSider: true };
    }

    if (layoutMode === LAYOUT_MODE_VERTICAL_MIX) {
      return { showSider: true, invertedSider: false };
    }

    return { showSider: true, invertedSider: false };
  }, [layoutMode, isMobile]);

  const HeaderLayout = useMemo(() => {
    return (
      <Header
        style={{
          backgroundColor: theme.headerBg,
          padding: 0,
          borderBottom: `1px solid ${theme.colorBorderSecondary}`,
        }}
      >
        <GlobalHeader
          mode={layoutMode}
          isMobile={isMobile}
          widthSider={widthSider}
        />
      </Header>
    );
  }, [layoutMode, isMobile, widthSider, theme]);

  const SiderLayout = useMemo(() => {
    if (!showSider) return null;

    return (
      <Sider
        theme={darkModeSider ? "dark" : mode} // Ưu tiên loại darkmode xong mới đến theme
        width={widthSider}
        className={styles.sider}
        collapsed={collapsedSider}
        collapsible
        collapsedWidth={isMobile ? 0 : 80}
        onCollapse={toggleCollapsed}
      >
        <GlobalSider
          siderCollapse={collapsedSider}
          headerHeight={headerHeight}
          mode={layoutMode}
        />
      </Sider>
    );
  }, [collapsedSider, showSider, layoutMode, mode, isMobile, darkModeSider]);

  return (
    <Layout className={styles.container}>
      {invertedSider ? SiderLayout : HeaderLayout}
      <Layout
        style={{
          borderInlineEnd: `${invertedSider ? 0 : 1}px solid ${
            theme.colorBorderSecondary
          }`,
        }}
      >
        {invertedSider ? HeaderLayout : SiderLayout}
        <Content
          id={GLOBAL_PAGE_TAB_ID}
          className={styles.content}
          style={{
            minHeight: `calc(100vh - ${headerHeight}px)`,
            backgroundColor: theme.colorBgLayout,
          }}
        >
          {isPageTab && <GlobalTab isMobile={isMobile} />}
          {children}
        </Content>
        {/* Hiển thị Footer */}
        {showFooter && <Footer>{FooterComponent}</Footer>}
      </Layout>
      <GlobalMenu mode={layoutMode} />
    </Layout>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    border-radius: 8;
    overflow: "hidden";
    height: "100vh";
  `,

  sider: css`
    line-height: "120px";
    border-inline-end: 1px solid ${token.colorBorderSecondary};
    & .ant-menu-light.ant-menu-root.ant-menu-inline,
    & .ant-menu-light.ant-menu-root.ant-menu-vertical {
      border-inline-end: 0;
    }
    & .ant-layout-sider-trigger {
      border-inline-end: 1px solid ${token.colorBorderSecondary};
    }
  `,

  content: css`
    /* min-height: 120%; */
    /* line-height: "120px"; */
  `,
}));
