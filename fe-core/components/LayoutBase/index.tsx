"use client";
configResponsive({ xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 });

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, theme } from "antd";
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
  LAYOUT_MODE_HORIZONTAL,
  LAYOUT_MODE_VERTICAL,
  LAYOUT_MODE_VERTICAL_MIX,
  ThemeLayoutMode,
} from "../../constants";
import GlobalMenu from "../GlobalMenu";
import { useTheme } from "@/fe-global/themes/ThemeProvider";

const { Header, Sider, Content, Footer } = Layout;

interface Props {
  children: React.ReactNode;
  layoutMode: ThemeLayoutMode; // Loai hiển thị layout
  headerHeight?: number; // Chiều cao header
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
    widthSider = 270,
    collapsedSider,
    showFooter,
    FooterComponent,
  } = props;
  const dispatch = useDispatch();
  const { mode } = useTheme();
  const {
    token: { headerBg },
  } = theme.useToken();
  const { md, lg, xl } = useResponsive();
  const darkModeSider = useSelector(appSelector.getDarkModeSider);
  const isMobile = !md;

  useLayoutEffect(() => {
    dispatch(setIsMobile(isMobile));
    if (isMobile) {
      dispatch(setLayoutMode(LAYOUT_MODE_VERTICAL));
      dispatch(setCollapsedSider(true));
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
  }, [layoutMode]);

  const HeaderLayout = useMemo(() => {
    return (
      <Header style={{ backgroundColor: headerBg, padding: 0 }}>
        <GlobalHeader
          mode={layoutMode}
          isMobile={isMobile}
          widthSider={widthSider}
        />
      </Header>
    );
  }, [layoutMode, isMobile, widthSider, headerBg]);

  const SiderLayout = useMemo(() => {
    if (!showSider) return null;

    return (
      <Sider
        theme={darkModeSider ? "dark" : mode} // Ưu tiên loại darkmode xong mới đến theme
        width={widthSider}
        style={siderStyle}
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
    <Layout style={layoutStyle}>
      {invertedSider ? SiderLayout : HeaderLayout}
      <Layout style={{ marginTop: invertedSider ? 0 : 2 }}>
        {invertedSider ? HeaderLayout : SiderLayout}
        <Content style={contentStyle}>{children}</Content>
        {/* Hiển thị Footer */}
        {showFooter && <Footer>{FooterComponent}</Footer>}
      </Layout>
      <GlobalMenu mode={layoutMode} />
    </Layout>
  );
}

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  lineHeight: "120px",
};

const siderStyle: React.CSSProperties = {
  lineHeight: "120px",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  height: "100vh",
};
