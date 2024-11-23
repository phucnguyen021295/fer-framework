import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MenuItem, ThemeLayoutMode } from "../constants";

// Define a type for the slice state
interface appState {
  layoutMode: ThemeLayoutMode;
  header: {
    title: string;
    showTitle: boolean;
    logo: string;
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
  };
  memu: {
    showMenuToggler: boolean;
    showMenu: boolean;
    items: MenuItem[];
  };
  footer: {
    showFooter: boolean;
  };
  isMobile: boolean;
  theme: 'light' | 'dark';
}

// Define the initial state using that type
const initialState: appState = {
  layoutMode: "vertical-mix",
  header: {
    title: "TNTECH",
    showTitle: false,
    showLogo: true,
    logo: "",
    heightLogo: 32,
    headerHeight: 60,
  },
  sider: {
    showSider: true,
    inverted: false,
    collapsedSider: false,
    collapsedWidth: 80,
    width: 270,
  },
  memu: {
    showMenuToggler: false,
    showMenu: true,
    items: [],
  },
  footer: {
    showFooter: false,
  },
  isMobile: false,
  theme: 'light'
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
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

    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
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
} = appSlice.actions;

export const appSelector = appSlice.selectors;

// Other code such as selectors can use the imported `RootState` type
export default appSlice.reducer;
