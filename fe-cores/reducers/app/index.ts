import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  HEADER_HEIGHT,
  LOGO_HEIGHT,
  MenuItem,
  PAGE_TAB_HEIGHT,
  SIDER_COLLAPSED_WIDTH,
  SIDER_WIDTH,
  ThemeLayoutMode,
} from "../../constants";
import { merge } from "lodash";
import { Route } from "next/dist/types";

// Define a type for the slice state
export interface APP_STATE {
  layoutMode: ThemeLayoutMode;
  header: {
    title: string;
    showTitle: boolean;
    logo: string;
    logoCompact: string;
    showLogo: boolean;
    heightLogo: number;
    headerHeight: number;
  };
  sider: {
    showSider: boolean;
    inverted: boolean;
    collapsedWidth: number;
    width: number;
    collapsedSider: boolean;
    darkMode: boolean;
  };
  memu: {
    showMenuToggler: boolean;
    showMenu: boolean;
    items: MenuItem[];
  };
  pageTab: {
    isPageTab: boolean;
  };
  footer: {
    showFooter: boolean;
  };
  isMobile: boolean;
  theme: "light" | "dark";
  rootRoute: Route;
}

// Define the initial state using that type
const initialState: APP_STATE = {
  layoutMode: "vertical-mix",
  header: {
    title: "AUTIC",
    showTitle: false,
    showLogo: true,
    logo: "",
    logoCompact: "",
    heightLogo: LOGO_HEIGHT,
    headerHeight: HEADER_HEIGHT,
  },
  sider: {
    showSider: true,
    inverted: false,
    collapsedSider: false,
    collapsedWidth: SIDER_COLLAPSED_WIDTH,
    width: SIDER_WIDTH,
    darkMode: false,
  },
  memu: {
    showMenuToggler: false,
    showMenu: true,
    items: [],
  },
  pageTab: {
    isPageTab: false,
  },
  footer: {
    showFooter: false,
  },
  isMobile: false,
  theme: "light",
  rootRoute: "/home",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppConfig: (state, action: PayloadAction<APP_STATE>) => {
      state = merge(state, action.payload);
    },

    setLayoutMode: (state, action: PayloadAction<ThemeLayoutMode>) => {
      state.layoutMode = action.payload;
    },

    setIsSider: (state, action: PayloadAction<boolean>) => {
      state.sider.showSider = action.payload;
    },
    setCollapsedSider: (state, action: PayloadAction<boolean>) => {
      state.sider.collapsedSider = action.payload;
    },
    setUpdateShowSider: (state, action: PayloadAction<boolean>) => {
      state.sider.showSider = action.payload;
    },

    setInvertedSider: (state, action: PayloadAction<boolean>) => {
      state.sider.inverted = action.payload;
    },

    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },

    setItemsMenu: (state, action: PayloadAction<MenuItem[]>) => {
      state.memu.items = action.payload;
    },

    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },

    setDarkModeSider: (state, action: PayloadAction<boolean>) => {
      state.sider.darkMode = action.payload;
    },
  },
  selectors: {
    getLayoutMode: (state) => state.layoutMode,

    getHeaderConfig: (state) => state.header,

    getHeaderHeight: (state) => state.header.headerHeight,

    getHeightLogo: (state) => state.header.heightLogo,

    getCollapsedSider: (state) => state.sider.collapsedSider,

    getSider: (state) => state.sider,

    getShowSider: (state) => state.sider.showSider,

    getInvertedSider: (state) => state.sider.inverted,

    getShowFooter: (state) => state.footer.showFooter,

    getIsMobile: (state) => state.isMobile,

    getItemsMenu: (state) => state.memu.items,

    getTheme: (state) => state.theme,

    getDarkModeSider: (state) => state.sider.darkMode,

    getRootRoute: (state) => state.rootRoute,

    getPageTab: (state) => state.pageTab,
  },
});

export const {
  setIsSider,
  setCollapsedSider,
  setInvertedSider,
  setLayoutMode,
  setIsMobile,
  setItemsMenu,
  setTheme,
  setDarkModeSider,
} = appSlice.actions;

export const appAction = appSlice.actions;

export const appSelector = appSlice.selectors;

export const appReducer = appSlice.reducer;
