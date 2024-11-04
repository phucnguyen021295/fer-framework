"use client";
configResponsive({ sm: 640 });

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Layout, theme } from "antd";
import { configResponsive, useResponsive } from "ahooks";

import GlobalHeader from "../GlobalHeader";
import GlobalSider from "../GlobalSider";

// Reducer
import {
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
  headerHeight: number; // Chiều cao header
  widthSider: number;
  collapsedSider: boolean;
  showFooter: boolean; // Trạng thái ẩn hiện footer
  FooterComponent?: React.ReactNode;
}

export default function LayoutBase(props: Props) {
  const {
    children,
    layoutMode,
    headerHeight = 60,
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
  const responsive = useResponsive() || { sm: true };
  const isMobile = !responsive?.sm;

  useLayoutEffect(() => {
    dispatch(setIsMobile(isMobile));
    if (isMobile) {
      dispatch(setLayoutMode(LAYOUT_MODE_VERTICAL));
      dispatch(setCollapsedSider(true));
    }
  }, [isMobile, dispatch]);

  useEffect(() => {
    dispatch(setTheme(mode))
  }, [mode])

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
        theme={mode}
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
  }, [collapsedSider, showSider, layoutMode, mode, isMobile]);

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

const headerStyle: React.CSSProperties = {
  height: 60,
  padding: 0,
  lineHeight: "60px",
  boxShadow:
    "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
  backdropFilter: "blur(8px)",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  height: "100vh",
};
