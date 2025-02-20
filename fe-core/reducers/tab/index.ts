import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Route } from "next/dist/types";
import { appSelector } from "../app";
// import { router } from "@/router";
// import { localStg } from "@/utils/storage";
// import { getThemeSettings } from "../theme";
// import type { AppThunk } from "../../index";
import {
  // extractTabsByAllRoutes,
  filterTabsById,
  // filterTabsByIds,
  // findTabByRouteName,
  // getActiveFirstLevelMenuKey,
  // getAllTabs,
  // getDefaultHomeTab,
  // getFixedTabIds,
  // getTabByRoute,
  isTabInTabs,
} from "./shared";
import { MenuItem } from "../../constants";
import { ReduxThunkAction } from "@/fer-framework/fe-base/reducers/store";

interface InitialStateType {
  tabs: string[];
  activeTabId: string;
  homeTab: string;
  removeCacheKey: Route | null;
  activeFirstLevelMenuKey: string;
}

const initialState: InitialStateType = {
  /** Tabs */
  tabs: [],
  /** Active tab id */
  activeTabId: "",
  /** Get active tab */
  homeTab: "",

  removeCacheKey: null,

  activeFirstLevelMenuKey: "",
};
const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    /**
     * Set active tab id
     *
     * @param id Tab id
     */
    setActiveTabId(state, { payload }: PayloadAction<string>) {
      state.activeTabId = payload;
    },
    /**
     * Add tab
     *
     * @param route Tab route
     * @param active Whether to activate the added tab
     */
    addTab(state, { payload }: PayloadAction<App.Global.Tab>) {
      state.tabs.push(payload);
    },
    changeTabLabel(
      state,
      { payload }: PayloadAction<{ label?: string; index: number }>
    ) {
      const { label, index } = payload;

      if (label) {
        state.tabs[index].i18nKey = label;
      } else {
        state.tabs[index].i18nKey = state.tabs[index].oldLabel;
      }
    },
    setTabs(state, { payload }: PayloadAction<App.Global.Tab[]>) {
      state.tabs = payload;
    },
    setActiveFirstLevelMenuKey(state, { payload }: PayloadAction<string>) {
      state.activeFirstLevelMenuKey = payload;
    },

    // initHomeTab(
    //   state,
    //   {
    //     payload,
    //   }: PayloadAction<{
    //     route: RouteRecordNormalized | false;
    //     homeRouteName: LastLevelRouteKey;
    //   }>
    // ) {
    //   state.homeTab = getDefaultHomeTab(payload);
    // },
  },
  selectors: {
    getTabs: (tab) => tab.tabs,
    getActiveTabId: (tab) => tab.activeTabId,
    getHomeTab: (tab) => tab.homeTab,
    selectActiveFirstLevelMenuKey: (tab) => tab.activeFirstLevelMenuKey,
  },
});

export const tabActions = tabSlice.actions;

export const tabSelectors = tabSlice.selectors;

export default tabSlice.reducer;

const getMenuItemsByPaths = (
  tabs: Route[],
  menuItems: MenuItem,
  rootTab: Route
) => {
  const result = [];

  // Hàm đệ quy để tìm kiếm menu item phù hợp
  const findMenuItem = (items, paths) => {
    items.forEach((item) => {
      if (paths.includes(item.key)) {
        // Thêm item vào kết quả nếu key của nó nằm trong paths
        result.push({
          key: item.key,
          label: item.label,
          icon: item.icon,
          link: item.link,
          closable: !(rootTab === item.key),
        });
      }

      // Nếu item có children, tiếp tục tìm kiếm đệ quy
      if (item.children && item.children.length > 0) {
        findMenuItem(item.children, paths);
      }
    });
  };

  findMenuItem(menuItems, tabs);
  return result;
};

export const selectAllTabs = createSelector(
  [tabSelectors.getTabs, appSelector.getItemsMenu, appSelector.getRootRoute],
  (tabs, items, rootRoute) => {
    const allTabs = getMenuItemsByPaths(tabs, items, rootRoute);
    return allTabs;
  }
);

/**
 * Init tab store
 *
 * @param currentRoute Current route
 */
export const initTabStore = (): ReduxThunkAction => (dispatch, getState) => {
  // const storageTabs = localStg.get("globalTabs");
  // const themeSettings = getThemeSettings(getState());

  const rootRoute = appSelector.getRootRoute(getState());

  dispatch(tabActions.setTabs([rootRoute]));
};

/**
 * Remove tab
 *
 * @param tabId Tab id
 */
export const removeTab =
  (tabId: string, route): ReduxThunkAction =>
  async (dispatch, getState) => {
    const activeTabId = tabSelectors.getActiveTabId(getState());
    const tabs = tabSelectors.getTabs(getState());
    const isRemoveActiveTab = activeTabId === tabId;
    const updatedTabs = filterTabsById(tabId, tabs);
    function update() {
      dispatch(tabActions.setTabs(updatedTabs));
    }

    if (!isRemoveActiveTab) {
      update();
      return;
    }

    const homeTab = appSelector.getRootRoute(getState());

    const activeTab = updatedTabs.at(-1) || homeTab;
    if (activeTab) {
      await switchRouteByTab(activeTab, route);
      update();
    }
  };

// /** remove active tab */
// export const removeActiveTab = (): AppThunk => (dispatch, getState) => {
//   const activeTabId = getActiveTabId(getState());
//   dispatch(removeTab(activeTabId));
// };

/**
 * Add tab
 *
 * @param route Tab route
 * @param active Whether to activate the added tab
 */
export const addTabByRoute =
  (route: Route, active = true): ReduxThunkAction =>
  (dispatch, getState) => {
    const state = getState();
    const rootTab = appSelector.getRootRoute(getState());

    const tabs = tabSelectors.getTabs(state);

    if (!isTabInTabs(route, tabs)) {
      dispatch(tabActions.addTab(route));
    }

    if (active) {
      dispatch(tabActions.setActiveTabId(route));

      // const firstLevelRouteName = getActiveFirstLevelMenuKey(route);
      // dispatch(setActiveFirstLevelMenuKey(firstLevelRouteName));
    }
  };

// /**
//  * Is tab retain
//  *
//  * @param tabId
//  */
// export const isTabRetain =
//   (tabId: string): AppThunk<boolean> =>
//   (_, getState) => {
//     const homeTab = getHomeTab(getState());
//     if (tabId === homeTab?.id) return true;
//     const tabs = getTabs(getState());
//     const fixedTabIds = getFixedTabIds(tabs);

//     return fixedTabIds.includes(tabId);
//   };

// /** Cache tabs */
// export const cacheTabs = (): AppThunk => (_, getState) => {
//   const themeSettings = getThemeSettings(getState());
//   if (!themeSettings.tab.cache) return;
//   const tabs = getTabs(getState());

//   localStg.set("globalTabs", tabs);
// };

/**
 * Switch route by tab
 *
 * @param tab
 */
async function switchRouteByTab(tab: Route, route) {
  const fail = await route.push(tab);
  if (!fail) {
    tabActions.setActiveTabId(tab);
  }
}

// /**
//  * Clear tabs
//  *
//  * @param excludes Exclude tab ids
//  */
// export const clearTabs =
//   (excludes: string[] = []): AppThunk<Promise<void>> =>
//   async (dispatch, getState) => {
//     const tabs = getTabs(getState());
//     const remainTabIds = [...getFixedTabIds(tabs), ...excludes];
//     const removedTabsIds = tabs
//       .map((tab) => tab.id)
//       .filter((id) => !remainTabIds.includes(id));

//     const activeTabId = getActiveTabId(getState());
//     const isRemoveActiveTab = removedTabsIds.includes(activeTabId);
//     const updatedTabs = filterTabsByIds(removedTabsIds, tabs);

//     function update() {
//       dispatch(setTabs(updatedTabs));
//     }

//     if (!isRemoveActiveTab) {
//       update();
//       return;
//     }
//     const homeTab = getHomeTab(getState());

//     const activeTab = updatedTabs[updatedTabs.length - 1] || homeTab;
//     await switchRouteByTab(activeTab);

//     update();
//   };

// /**
//  * Clear left tabs
//  *
//  * @param tabId
//  */
// export const clearLeftTabs =
//   (tabId: string): AppThunk =>
//   (dispatch, getState) => {
//     const tabs = getTabs(getState());
//     const tabIds = tabs.map((tab) => tab.id);
//     const index = tabIds.indexOf(tabId);
//     if (index === -1) return;

//     const excludes = tabIds.slice(index);
//     dispatch(clearTabs(excludes));
//   };

// /**
//  * remove tab by route name
//  *
//  * @param routeName route name
//  */
// export const removeTabByRouteName =
//   (routeName: RouteKey): AppThunk =>
//   (dispatch, getState) => {
//     const tabs = getTabs(getState());
//     const tab = findTabByRouteName(routeName, tabs);

//     if (!tab) return;

//     dispatch(removeTab(tab.id));
//   };

// /**
//  * Clear right tabs
//  *
//  * @param tabId
//  */
// export const clearRightTabs =
//   (tabId: string): AppThunk =>
//   (dispatch, getState) => {
//     const homeTab = getHomeTab(getState());
//     const isHomeTab = tabId === homeTab?.id;

//     if (isHomeTab) {
//       dispatch(clearTabs());
//       return;
//     }

//     const tabs = getTabs(getState());
//     const tabIds = tabs.map((tab) => tab.id);
//     const index = tabIds.indexOf(tabId);
//     if (index === -1) return;

//     const excludes = tabIds.slice(0, index + 1);
//     dispatch(clearTabs(excludes));
//   };

// /**
//  * Set new label of tab
//  *
//  * @default activeTabId
//  * @param label New tab label
//  * @param tabId Tab id
//  */
// export const setTabLabel =
//   (label: string, tabId?: string): AppThunk =>
//   (dispatch, getState) => {
//     const activeTabId = getActiveTabId(getState());
//     const tabs = getTabs(getState());
//     const id = tabId || activeTabId;
//     const tab = tabs.findIndex((item) => item.id === id);

//     if (tab < 0) return;

//     dispatch(changeTabLabel({ label, index: tab }));
//   };

// /**
//  * Reset tab label
//  *
//  * @default activeTabId
//  * @param tabId Tab id
//  */
// export const resetTabLabel =
//   (tabId?: string): AppThunk =>
//   (dispatch, getState) => {
//     const activeTabId = getActiveTabId(getState());
//     const tabs = getTabs(getState());
//     const id = tabId || activeTabId;

//     const tab = tabs.findIndex((item) => item.id === id);
//     if (tab < 0) return;

//     dispatch(changeTabLabel({ index: tab }));
//   };
