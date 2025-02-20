import { useFullscreen } from "ahooks";
import { FC, memo } from "react";
import { Flex } from "antd";
import {
  HeaderProps,
  ThemeLayoutMode,
  GLOBAL_HEADER_MENU_ID,
} from "@/fe-core/constants";
import Account from "./components/Account";
import MenuToggler from "./components/MenuToggler";
import ChangeTheme from "../../components/ChangeTheme";
import ThemeConfiguration from "../../components/ThemeConfiguration";
import GlobalBreadcrumb from "../GlobalBreadcrumb";
import GlobalLogo from "../GlobalLogo";
import FullScreen from "../../components/FullScreen";

const HEADER_PROPS_CONFIG: Record<ThemeLayoutMode, HeaderProps> = {
  vertical: {
    showLogo: false,
    showMenu: false,
    showMenuToggler: true,
  },
  "vertical-mix": {
    showLogo: true,
    showMenu: false,
    showMenuToggler: false,
  },
  horizontal: {
    showLogo: true,
    showMenu: true,
    showMenuToggler: false,
  },
  "horizontal-mix": {
    showLogo: true,
    showMenu: true,
    showMenuToggler: false,
  },
};

interface Props {
  isMobile: boolean;
  mode: ThemeLayoutMode;
  widthSider: number;
  reverse?: boolean;
}

const GlobalHeader: FC<Props> = (props: Props) => {
  const { mode, isMobile, widthSider, reverse } = props;
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

  const { showLogo, showMenu, showMenuToggler } = HEADER_PROPS_CONFIG[mode];

  // const showToggler = reverse ? true : showMenuToggler;

  return (
    <Flex align="center" justify="space-between" style={{ height: "100%" }}>
      <Flex style={{ height: "100%" }} flex={1} align="center">
        {!isMobile && showLogo && (
          <GlobalLogo
            style={{
              width: widthSider,
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          />
        )}

        {isMobile ? <MenuToggler /> : null}
        {/* <div>{reverse ? true : showMenuToggler}</div> */}

        <div id={GLOBAL_HEADER_MENU_ID} style={{ flex: 1 }}>
          {!isMobile && !showMenu && <GlobalBreadcrumb />}
        </div>
      </Flex>

      <Flex align="center" gap={8} style={{ paddingRight: isMobile ? 12 : 28 }}>
        {/* <GlobalSearch /> */}
        {!isMobile && (
          <FullScreen full={isFullscreen} toggleFullscreen={toggleFullscreen} />
        )}
        {/* <ThemeSchemaSwitch className="px-12px" />
          <ThemeButton /> */}

        <ChangeTheme />
        <ThemeConfiguration />
        <Account />
      </Flex>
    </Flex>
  );
};

export default memo(GlobalHeader);
