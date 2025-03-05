// @ts-nocheck
"use client";

configResponsive({ xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 });

import React from "react";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import { configResponsive, useResponsive } from "ahooks";
import { createStyles } from "antd-style";

// Components
import GlobalHeader from "../GlobalHeader";
import GlobalSider from "../GlobalSider";
import GlobalMenu from "../GlobalMenu";

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
  PAGE_TAB_HEIGHT,
  ThemeLayoutMode,
} from "../../constants";
import { useTheme } from "fe-global/themes";
import GlobalTab from "../GlobalTab";

const { Header, Sider, Content, Footer } = Layout;

interface Props {
  children: React.ReactNode;
  layoutMode: ThemeLayoutMode; // Loai hiển thị layout
  headerHeight?: number; // Chiều cao header
  isPageTab: boolean;
  widthSider?: number;
  collapsedSider: boolean;
  showFooter?: boolean; // Trạng thái ẩn hiện footer
  FooterComponent?: React.ReactNode;
  AccountComponent?: React.ReactNode;
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
    AccountComponent,
    isPageTab,
  } = props;
  const { styles, theme }: { styles: any; theme: any } = useStyles();
  const dispatch = useDispatch();
  const { mode }: { mode: "light" | "dark" } = useTheme();
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
          AccountComponent={AccountComponent}
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

  const _heightHeader = useMemo(() => {
    if (isPageTab) {
      return headerHeight + PAGE_TAB_HEIGHT;
    }

    return headerHeight;
  }, [isPageTab]);

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
        <Layout id={GLOBAL_PAGE_TAB_ID}>
          {isPageTab && <GlobalTab isMobile={isMobile} />}
          <Content
            className={styles.content}
            style={{
              height: `calc(100vh - ${_heightHeader}px)`,
              backgroundColor: theme.colorBgLayout,
              overflowY: "auto",
              overflowX: "hidden",
              minHeight: `calc(100vh - ${_heightHeader}px)`,
            }}
          >
            {children}
          </Content>
        </Layout>

        {/* Hiển thị Footer */}
        {showFooter && <Footer>{FooterComponent}</Footer>}
      </Layout>
      <GlobalMenu mode={layoutMode} />
    </Layout>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    overflow: "hidden";
    height: "100vh";
  `,

  sider: css`
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
