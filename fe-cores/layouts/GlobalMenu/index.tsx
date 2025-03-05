import React, { FC, memo, useMemo } from "react";

import HorizontalMenu from "./modules/Horizontal";
import VerticalMenu from "./modules/Vertical";
import HorizontalMixMenu from "./modules/HorizontalMix";
import VerticalMixMenu from "./modules/VerticalMix";

import { ThemeLayoutMode } from "../../constants";

interface Props {
  mode: ThemeLayoutMode;
}

const GlobalMenu: FC<Props> = (props: Props) => {
  const { mode } = props;
  const componentsMap = useMemo(
    () => ({
      vertical: <VerticalMenu />,
      "vertical-mix": <VerticalMixMenu />,
      horizontal: <HorizontalMenu />,
      "horizontal-mix": <HorizontalMixMenu />,
    }),
    [mode]
  );

  return componentsMap[mode];
};

export default memo(GlobalMenu);
