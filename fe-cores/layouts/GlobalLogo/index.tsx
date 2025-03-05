// @ts-nocheck
"use client";
import React, { FC, memo, useMemo } from "react";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { appSelector } from "../../reducers/app";
import useLayoutBase from "../LayoutBase/useLayoutBase";

const { Title } = Typography;

interface Props extends LinkProps {
  /** Whether to show the title */
  href?: string;
  style: unknown;
  showTitle?: boolean;
}

const GlobalLogo: FC<Props> = (props: Props) => {
  const { title, showTitle, showLogo, logo, logoCompact, heightLogo } =
    useSelector(appSelector.getHeaderConfig);
  const { collapsedSider, layoutMode, isMobile } = useLayoutBase();
  const { href = "/", style = {}, ...otherProps } = props;

  const isCollap = useMemo(() => {
    if (layoutMode === "vertical" && collapsedSider && !isMobile) {
      return true;
    }
    return false;
  }, [collapsedSider, layoutMode, isMobile]);

  const _logo = useMemo(() => {
    if (layoutMode === "vertical" && collapsedSider && !isMobile) {
      return logoCompact;
    }
    return logo;
  }, [collapsedSider, layoutMode, logoCompact, logo, isMobile]);

  return (
    <Link
      href={href}
      style={{
        ...style,
        ...{
          paddingLeft: isCollap ? 0 : 28,
          justifyContent: isCollap ? "center" : "flex-start",
        },
      }}
      {...otherProps}
    >
      {showLogo && (
        <Image
          src={_logo}
          alt="Vercel Logo"
          width={"100%"}
          height={heightLogo}
          priority
          style={{
            cursor: "pointer",
          }}
        />
      )}

      {showTitle ? (
        <Title
          level={2}
          ellipsis={true}
          style={{ marginBottom: 0, paddingLeft: 8 }}
        >
          {title}
        </Title>
      ) : null}
    </Link>
  );
};

export default memo(GlobalLogo);
