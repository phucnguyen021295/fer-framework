import { Flex } from "antd";
import { FC, memo } from "react";
import GlobalLogo from "../GlobalLogo";
import {
  GLOBAL_SIDER_MENU_ID,
  ThemeLayoutMode,
  LAYOUT_MODE_VERTICAL_MIX,
  LAYOUT_MODE_HORIZONTAL_MIX,
} from "../../constants";

interface Props {
  mode: ThemeLayoutMode;
  headerHeight: number;
  siderCollapse: boolean;
  inverted?: boolean;
}

const GlobalSider: FC<Props> = (props: Props) => {
  const { mode, headerHeight, siderCollapse, inverted } = props;
  const showLogo =
    mode !== LAYOUT_MODE_VERTICAL_MIX && mode !== LAYOUT_MODE_HORIZONTAL_MIX;

  return (
    <Flex vertical>
      {showLogo && (
        <GlobalLogo
          showTitle={!siderCollapse}
          style={{
            height: headerHeight,
            display: "flex",
            alignItems: "center",
            paddingLeft: 32,
          }}
        />
      )}
      <div
        id={GLOBAL_SIDER_MENU_ID}
        // style={{ display: showLogo ? "none" : "block" }}
        // className={showLogo ? "flex-1-hidden" : "h-full"}
      />
    </Flex>
  );
};

export default memo(GlobalSider);
