"use client";
import React, { createContext, memo, useContext, useRef } from "react";
import { Form, Input, Button, message } from "antd";

// Tạo Context
export const UploadContext = createContext();

const UploadProvider = ({ children }) => {
  const forms = useRef([]);

  // Đăng ký form vào danh sách
  const registerUpload = (form) => {
    const key = Object.keys(form)[0];
    if (forms.current.some((obj) => key in obj)) {
      return;
    }
    forms.current.push(form);
  };

  const unRegisterUpload = (formKey) => {
    forms.current.filter((item) => !item.hasOwnProperty(formKey));
  };

  // Validate tất cả các form
  const validateAllForms = async () => {
    const errorList = []; // Danh sách chứa lỗi từ các form
    for (const form of forms.current) {
      try {
        await Object.values(form)[0].validateFields();
      } catch (err) {
        errorList.push(err);
      }
    }

    if (errorList.length > 0) {
      // Hiển thị thông báo lỗi tổng hợp
      message.error("Vui lòng kiểm tra lại các form!");
      return false;
      //   console.error("Danh sách lỗi:", errorList);
    } else {
      return true;
    }
  };

  // Lấy dữ liệu từ tất cả các form
  const getAllFormValues = () => {
    const allValues = forms.current.map((form) => {
      const key = Object.keys(form);
      const object = Object.values(form);
      return {
        [key[0]]: object[0].getFieldsValue(),
      };
    });
    console.log("Dữ liệu từ tất cả các form:", allValues);
    return allValues;
  };

  return (
    <UploadContext.Provider
      value={{
        registerUpload,
        unRegisterUpload,
        validateAllForms,
        getAllFormValues,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default UploadProvider;
