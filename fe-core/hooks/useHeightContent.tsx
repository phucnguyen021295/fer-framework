"use client";
import { useMemo } from "react";
import { useSize } from "ahooks";
import { PAGE_TAB_HEIGHT } from "../constants";
import { useSelector } from "react-redux";
import { appSelector } from "@/fe-core/reducers/app";

export const useHeightContent = () => {
  const size = useSize(document.body);
  const headerHeight = useSelector(appSelector.getHeaderHeight);

  const heightContent = useMemo(() => {
    if (!size?.height) return 0;
    return size?.height - headerHeight - PAGE_TAB_HEIGHT;
  }, [size, headerHeight]);

  return heightContent;
};
