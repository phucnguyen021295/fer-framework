// import type {
//   LastLevelRouteKey,
//   RouteKey,
//   RouteMap,
// } from "@elegant-router/types";
// import type { RouteRecordNormalized } from "@sa/simple-router";
// import { $t } from "@/locales";
// import { getRoutePath } from "@/router/elegant/transform";
import { Route } from "next/dist/types";

/**
 * Get all tabs
 *
 * @param tabs Tabs
 * @param homeTab Home tab
 */
export function getAllTabs(tabs: any[], homeTab: any | null) {
  if (!homeTab) {
    return [];
  }

  const filterHomeTabs = tabs.filter((tab) => tab.id !== homeTab.id);

  const fixedTabs = filterHomeTabs
    .filter(isFixedTab)
    .sort((a, b) => a.fixedIndex! - b.fixedIndex!);

  const remainTabs = filterHomeTabs.filter((tab) => !isFixedTab(tab));

  const allTabs = [homeTab, ...fixedTabs, ...remainTabs];

  return updateTabsLabel(allTabs);
}

/**
 * Is fixed tab
 *
 * @param tab
 */
function isFixedTab(tab: any) {
  return tab.fixedIndex !== undefined && tab.fixedIndex !== null;
}

/**
 * Get tab id by route
 *
 * @param route
 */
export function getTabIdByRoute(route: any) {
  const { path, query = {}, meta } = route;

  let id = path;

  if (meta.multiTab) {
    const queryKeys = Object.keys(query).sort();
    const qs = queryKeys.map((key) => `${key}=${query[key]}`).join("&");

    id = `${path}?${qs}`;
  }

  return id;
}

/**
 * Get tab by route
 *
 * @param route
 */
// export function getTabByRoute(route: anyRoute) {
//   const { name, path, fullPath = path, meta } = route;
//   const { title, i18nKey, fixedIndexInTab } = meta;

//   // Get icon and localIcon from getRouteIcons function
//   const { icon, localIcon } = getRouteIcons(route);

//   const tab: any = {
//     id: getTabIdByRoute(route),
//     label: title,
//     routeKey: name as LastLevelRouteKey,
//     routePath: path as RouteMap[LastLevelRouteKey],
//     fullPath,
//     fixedIndex: fixedIndexInTab,
//     icon,
//     oldLabel: i18nKey || title,
//     newLabel: "",
//     localIcon,
//     i18nKey,
//   };

//   return tab;
// }

/**
 * The vue router will automatically merge the meta of all matched items, and the icons here may be affected by other
 * matching items, so they need to be processed separately
 *
 * @param route
 */
export function getRouteIcons(route: any) {
  // Set default value for icon at the beginning
  let icon: string = route?.meta?.localIcon;
  let localIcon: string | undefined = route?.meta?.localIcon;

  // Route.matched only appears when there are multiple matches,so check if route.matched exists
  if (route.matched) {
    // Find the meta of the current route from matched
    const currentRoute = route.matched.find((r: any) => r.name === route.name);
    // If icon exists in currentRoute.meta, it will overwrite the default value
    icon = currentRoute?.meta?.icon || icon;
    localIcon = currentRoute?.meta?.localIcon;
  }

  return { icon, localIcon };
}

/**
 * Get default home tab
 *
 * @param router
 * @param homeRouteName routeHome in useRouteStore
 */
// export function getDefaultHomeTab({
//   route,
//   homeRouteName,
// }: {
//   route: false;
//   homeRouteName: LastLevelRouteKey;
// }) {
//   const homeRoutePath = getRoutePath(homeRouteName);
//   const i18nLabel = $t(`route.${homeRouteName}`);

//   let homeTab: any = {
//     id: getRoutePath(homeRouteName),
//     label: i18nLabel || homeRouteName,
//     routeKey: homeRouteName,
//     routePath: homeRoutePath,
//     fullPath: homeRoutePath,
//   };

//   if (route) {
//     homeTab = getTabByRoute(route);
//   }

//   return homeTab;
// }

/**
 * Is tab in tabs
 *
 * @param tab
 * @param tabs
 */
export function isTabInTabs(tabId: string, tabs: Route[]) {
  return tabs.some((tab) => tab === tabId);
}

/**
 * Filter tabs by id
 *
 * @param tabId
 * @param tabs
 */
export function filterTabsById(tabId: string, tabs: Route[]) {
  return tabs.filter((tab) => tab !== tabId);
}

/**
 * Filter tabs by ids
 *
 * @param tabIds
 * @param tabs
 */
export function filterTabsByIds(tabIds: string[], tabs: any[]) {
  return tabs.filter((tab) => !tabIds.includes(tab.id));
}

/**
 * extract tabs by all routes
 *
 * @param router
 * @param tabs
 */
export function extractTabsByAllRoutes(routeNames: string[], tabs: any[]) {
  return tabs.filter((tab) => routeNames.includes(tab.routeKey));
}

/**
 * Get fixed tabs
 *
 * @param tabs
 */
export function getFixedTabs(tabs: any[]) {
  return tabs.filter((tab) => tab.fixedIndex !== undefined);
}

/**
 * Get fixed tab ids
 *
 * @param tabs
 */
export function getFixedTabIds(tabs: any[]) {
  const fixedTabs = getFixedTabs(tabs);

  return fixedTabs.map((tab) => tab.id);
}

/**
 * Update tabs label
 *
 * @param tabs
 */
function updateTabsLabel(tabs: any[]) {
  const updated = tabs.map((tab) => ({
    ...tab,
    label: tab.newLabel || tab.oldLabel || tab.label,
  }));

  return updated;
}

/**
 * Update tab by i18n key
 *
 * @param tab
 */
export function updateTabByI18nKey(tab: any) {
  const { i18nKey, label } = tab;

  return {
    ...tab,
    label: i18nKey ? i18nKey : label,
  };
}

/**
 * Update tabs by i18n key
 *
 * @param tabs
 */
export function updateTabsByI18nKey(tabs: any[]) {
  return tabs.map((tab) => updateTabByI18nKey(tab));
}

/**
 * find tab by route name
 *
 * @param name
 * @param tabs
 */
// export function findTabByRouteName(name: RouteKey, tabs: any[]) {
//   const routePath = getRoutePath(name);

//   const tabId = routePath;
//   const multiTabId = `${routePath}?`;

//   return tabs.find((tab) => tab.id === tabId || tab.id.startsWith(multiTabId));
// }

export function getActiveFirstLevelMenuKey(route: any) {
  const { hideInMenu, activeMenu } = route.meta;
  const name = route.name as string;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  const [firstLevelRouteName] = routeName.split("_");

  return firstLevelRouteName;
}
