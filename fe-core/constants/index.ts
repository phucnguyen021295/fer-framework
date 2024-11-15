import { MenuProps } from "antd";

/**
 * The layout mode
 *
 * - vertical: the vertical menu in left
 * - horizontal: the horizontal menu in top
 * - vertical-mix: two vertical mixed menus in left
 * - horizontal-mix: the vertical menu in left and horizontal menu in top
 */
export type ThemeLayoutMode =
  | "vertical"
  | "horizontal"
  | "vertical-mix"
  | "horizontal-mix";

export const LAYOUT_MODE_VERTICAL: ThemeLayoutMode = "vertical";
export const LAYOUT_MODE_HORIZONTAL: ThemeLayoutMode = "horizontal";
export const LAYOUT_MODE_VERTICAL_MIX: ThemeLayoutMode = "vertical-mix";
export const LAYOUT_MODE_HORIZONTAL_MIX: ThemeLayoutMode = "horizontal-mix";

/** The global header props */
export interface HeaderProps {
  /** Whether to show the logo */
  showLogo?: boolean;
  /** Whether to show the menu toggler */
  showMenuToggler?: boolean;
  /** Whether to show the menu */
  showMenu?: boolean;
}

export interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  link?: string;
  children?: MenuItem[];
};

export const GLOBAL_HEADER_MENU_ID = "__GLOBAL_HEADER_MENU__";

export const GLOBAL_SIDER_MENU_ID = "__GLOBAL_SIDER_MENU__";


