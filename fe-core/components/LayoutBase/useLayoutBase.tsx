"use client";
import { useSelector } from "react-redux";
import { appSelector } from "../../reducers/app";

function useLayoutBase() {
  const layoutMode = useSelector(appSelector.getLayoutMode);
  const collapsedSider = useSelector(appSelector.getCollapsedSider);
  const showFooter = useSelector(appSelector.getShowFooter);

  return {
    layoutMode,
    collapsedSider,
    showFooter,
  };
}

export default useLayoutBase;
