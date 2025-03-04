"use client";

import React, { memo, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { usePostLoginMutation } from "@/fe-module-auth/apis";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { createStyles } from "antd-style";
import Image from "next/image";
import { useSelector } from "react-redux";
import { appSelector } from "@/fer-framework/fe-core/reducers/app";
import { useForm } from "antd/es/form/Form";

const { Title, Text } = Typography;

interface Props {
  isRemember: boolean;
  isForgotPassword: boolean;
  isLogo: boolean;
  textDispersion: string;
  isRegister: boolean;
}

const FormLogin: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const { isRemember, isForgotPassword, isLogo, textDispersion, isRegister } =
    props;
  const { styles } = useStyles();
  const [postLogin, response] = usePostLoginMutation();
  const [form] = Form.useForm();
  const [textError, setTextError] = useState("");
  const { logo } = useSelector(appSelector.getHeaderConfig);
  const { isLoading, isError } = response;

  const onFinish = async (values: any) => {
    try {
      const data = await postLogin({
        body: { username: values.username, password: values.password },
      }).unwrap();
      // const redirect = searchParams.get("redirect");
      setCookie("token", data.token);
      // localStorage.setItem("profile", JSON.stringify(data.profile));
      router.replace(process.env.DEFAULT_ROUTE, { scroll: false });
    } catch (error) {
      console.log(error);
      if (error?.message) {
        setTextError(error?.message);
      }
    }
  };

  return (
    <Flex className={styles.container} vertical>
      <Flex vertical gap={16} style={{ marginTop: 12 }}>
        {isLogo && (
          <Flex justify="center">
            <Image src={logo} alt="Vercel Logo" width={130} priority />
          </Flex>
        )}

        {textDispersion && <Text type="secondary">{textDispersion}</Text>}

        <Title
          level={4}
          style={{ textAlign: "center", marginBottom: 20, marginTop: 0 }}
        >
          ĐĂNG NHẬP
        </Title>
      </Flex>
      <Form
        name="normal_login"
        className="login-form"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tài khoản!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            size="large"
            placeholder="Tài khoản"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            size="large"
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>

        {(isRemember || isForgotPassword) && (
          <Form.Item>
            <Flex justify="space-between" align="center">
              {isRemember && (
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ mật khẩu</Checkbox>
                </Form.Item>
              )}

              {isForgotPassword && (
                <Button
                  type="link"
                  className={styles.btnForgotPassword}
                  style={{ paddingRight: 0 }}
                >
                  Quên mật khẩu ?
                </Button>
              )}
            </Flex>
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="login-form-button"
            loading={isLoading}
            style={{ marginTop: 8 }}
          >
            Đăng nhập
          </Button>

          {textError && (
            <Flex style={{ height: 24 }} align="flex-end">
              <Text type="danger">{textError}</Text>
            </Flex>
          )}
        </Form.Item>

        {isRegister && (
          <Flex justify="center" style={{ paddingBottom: 12 }}>
            <Text style={{ fontWeight: "500" }}>
              Bạn chưa có tài khoản?{" "}
              <Text style={{ color: "#ED1C24" }}>Đăng ký</Text>
            </Text>
          </Flex>
        )}
      </Form>
    </Flex>
  );
};

export default memo(FormLogin);

const useStyles = createStyles(({ token, css }) => ({
  // Also supports obtaining the same writing experience as normal css through css string templates
  container: css`
    width: 396px;
    z-index: 1;
    background: ${token.colorBgContainer};
    border-radius: 16px;
    padding: 20px 32px;
    margin-bottom: 80px;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.25);
    border: 0.5px solid rgba(255, 255, 255, 1);

    /* For even smaller screens */
    @media (max-width: 480px) {
      padding: 20px;
      width: 350px;
    }
  `,

  btnForgotPassword: css`
    padding: "4px 0";
    color: ${token.colorText};
  `,
}));
