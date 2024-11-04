import { FC, memo } from "react";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { appSelector } from "../../reducers/app";

const { Title } = Typography;

interface Props extends LinkProps {
  /** Whether to show the title */
  isTitle?: boolean;
  href?: string;
}

const GlobalLogo: FC<Props> = (props: Props) => {
  const { title, showTitle, showLogo, logo, heightLogo } = useSelector(
    appSelector.getHeaderConfig
  );
  const { isTitle = true, href = "/", ...otherProps } = props;
  return (
    <Link href={href} {...otherProps}>
      {showLogo && (
        <Image
          src={logo ? logo : require("@/public/logo.png")}
          alt="Vercel Logo"
          width={"100%"}
          height={heightLogo}
          priority
          style={{
            cursor: "pointer",
          }}
        />
      )}

      {showTitle && isTitle && (
        <Title
          level={2}
          ellipsis={true}
          style={{ marginBottom: 0, paddingLeft: 8 }}
        >
          {title}
        </Title>
      )}
    </Link>
  );
};

export default memo(GlobalLogo);
