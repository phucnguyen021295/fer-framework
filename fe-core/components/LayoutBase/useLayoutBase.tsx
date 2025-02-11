"use client";
import { useSelector } from "react-redux";
import { appSelector } from "../../reducers/app";

function useLayoutBase() {
  const layoutMode = useSelector(appSelector.getLayoutMode);
  const collapsedSider = useSelector(appSelector.getCollapsedSider);
  const showFooter = useSelector(appSelector.getShowFooter);
  const isMobile = useSelector(appSelector.getIsMobile);

  return {
    layoutMode,
    collapsedSider,
    showFooter,
    isMobile,
  };
}

export default useLayoutBase;
