"use client";
import { useSelector } from "react-redux";
import { appSelector } from "../../reducers/app";

function useLayoutBase() {
  const layoutMode = useSelector(appSelector.getLayoutMode);
  const collapsedSider = useSelector(appSelector.getCollapsedSider);
  const showFooter = useSelector(appSelector.getShowFooter);
  const isMobile = useSelector(appSelector.getIsMobile);
  const pageTab = useSelector(appSelector.getPageTab);

  return {
    layoutMode,
    collapsedSider,
    showFooter,
    isMobile,
    ...pageTab,
  };
}

export default useLayoutBase;
