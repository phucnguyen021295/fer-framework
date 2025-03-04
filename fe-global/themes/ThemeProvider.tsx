"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  ConfigProvider,
  ConfigProviderProps,
  ThemeConfig,
  theme as themConfig,
} from "antd";
import { merge } from "lodash";

const ThemeContext = createContext({
  mode: "light",
  toggleTheme: (_mode: "dark" | "light") => {},
});

// Hàm kiểm tra thời gian hiện tại và thiết lập theme mặc định
const checkTimeForTheme = () => {
  const currentHour = new Date().getHours();
  return currentHour >= 18 || currentHour < 6; // Tối: 18h - 6h sáng
};

const getInitMode = (defaultTheme?: "dark" | "light") => {
  // TH1: Thiết lập trạng thái theme ban đầu từ localStorage nếu có
  if (localStorage.getItem("mode")) {
    return localStorage.getItem("mode") || "light";
  }

  // TH2: Thiết lập trạng thái theme ban đầu mặc định của ứng dụng
  if (defaultTheme) return defaultTheme;

  // TH3: Thiết lập trạng thái theme ban đầu theo thời gian
  return checkTimeForTheme() ? "dark" : "light";
};

interface Props extends ConfigProviderProps {
  children: React.ReactNode;
  defaultTheme?: "dark" | "light";
  theme?: ThemeConfig;
}

const ThemeProvider = (props: Props) => {
  const { children, defaultTheme, theme = {}, ...otherProps } = props;
  const [mode, setMode] = useState("");
  const {
    token: { colorBgContainer, headerBg },
  }: { token: any } = themConfig.useToken();

  // // Thiết lập trạng thái theme ban đầu từ localStorage nếu có
  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem("mode");
    if (storedTheme !== null) {
      setMode(storedTheme);
    } else {
      setMode(checkTimeForTheme() ? "dark" : "light"); // Nếu không có trong localStorage, dựa vào giờ
    }
  }, []);

  // Lắng nghe thay đổi theo giờ
  useEffect(() => {
    checkTimeForTheme(); // Kiểm tra khi load trang
    const interval = setInterval(checkTimeForTheme, 60 * 1000); // Kiểm tra mỗi phút
    return () => clearInterval(interval); // Cleanup
  }, []);

  // Lắng nghe thay đổi theme và lưu vào localStorage
  const toggleTheme = (_mode: "light" | "dark") => {
    setMode(_mode);
    localStorage.setItem("mode", _mode);
  };

  const _themeConfig = merge(
    {
      algorithm:
        mode === "dark"
          ? themConfig.darkAlgorithm
          : themConfig.defaultAlgorithm,
      token: {
        headerBg: mode === "dark" ? headerBg : colorBgContainer,
      },
    },
    theme
  );

  if (!mode) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ConfigProvider theme={_themeConfig} {...otherProps}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

// Hook để truy cập context
const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
