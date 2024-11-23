"use client";
import LayoutBase from "@/fe-core/components/LayoutBase";
import useLayoutBase from "@/fe-core/components/LayoutBase/useLayoutBase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setItemsMenu } from "@/fer-framework/fe-core/reducers/app";
import { items_menu } from "./constants/menu";

export default function LayoutRoot({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const {layoutMode, collapsedSider, showFooter } = useLayoutBase();

  useEffect(() => {
    dispatch(setItemsMenu(items_menu))
  }, [])

  return (
    <LayoutBase
      layoutMode={layoutMode}
      collapsedSider={collapsedSider}
      showFooter={showFooter}
    >
      {children}
    </LayoutBase>
  );
}
