"use client";
import React, { memo } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "../../reducers";
import { AUTH_ACTION } from "fe-base/actions";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

const LoginExpired: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const expired = useSelector(authSelectors.getExpired);

  const onOk = () => {
    dispatch({ type: AUTH_ACTION.LOGOUT });
    deleteCookie("token");
    router.refresh();
  };

  return (
    <Modal
      title="Hết phiên đăng nhập"
      centered
      open={expired}
      okText="Đăng nhập"
      cancelText={null}
      onOk={onOk}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <OkBtn />
        </>
      )}
      closable={false}
    >
      <p>
        Ứng dụng của bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại để được
        tiếp tục...
      </p>
    </Modal>
  );
};

export default memo(LoginExpired);
