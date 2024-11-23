"use client";

import { Flex, Layout } from "antd";
import Image from "next/image";
import { createStyles } from "antd-style";
import FormLogin from "@/fe-module-auth/components/FormLogin";

import "./page.local.scss";

const { Content } = Layout;

export default function Login() {
    const {styles, cx, theme} = useStyles();
    return (
        <Layout className={cx('airagent-login')} style={{height: '100vh'}}>
            <Content>
                <Flex
                    style={{ height: "100%" }}
                    vertical
                    align="center"
                    justify="center"
                >
                    <Flex className={styles.logo}>
                    <Image
                        src={require('@/public/logo.png')}
                        alt="Vercel Logo"
                        width={150}
                        // height={64}
                        priority
                        // style={{marginBottom: 40, boxShadow: '0px 0px 15px 0px rgba(0, 0, 0, 0.25)'}}
                    />
                    </Flex>
                    
                    <FormLogin />
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
    `,
  }));
