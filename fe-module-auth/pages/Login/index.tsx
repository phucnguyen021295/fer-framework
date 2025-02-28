"use client";

import { Flex, Layout } from "antd";
import Image from "next/image";
import { createStyles } from "antd-style";
import FormLogin from "@/fe-module-auth/components/FormLogin";

import { useSelector } from "react-redux";
import { appSelector } from "@/fe-core/reducers/app";
import { configLogin } from "./config";

const { Content } = Layout;

export default function Login(props) {
  const { styles, cx, theme } = useStyles();
  const { config = configLogin } = props;
  const { logo } = useSelector(appSelector.getHeaderConfig);
  return (
    <Layout className={cx("airagent-login")} style={{ height: "100vh" }}>
      <Image
        src={config.backgroundImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        // style={{ filter: "blur(3px)" }}
      />
      <Content>
        <Flex
          style={{ height: "100%" }}
          vertical
          align="center"
          justify="center"
        >
          {config.isLogo && (
            <Flex className={styles.logo}>
              <Image src={logo} alt="Vercel Logo" width={150} priority />
            </Flex>
          )}

          <FormLogin {...config?.form} />
        </Flex>
      </Content>
    </Layout>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  // Also supports obtaining the same writing experience as normal css through css string templates
  logo: css`
    position: absolute;
    left: 50px;
    top: 30px;

    /* For even smaller screens */
    @media (max-width: 480px) {
      padding: 20px;
      left: 0;
    }
  `,
}));
