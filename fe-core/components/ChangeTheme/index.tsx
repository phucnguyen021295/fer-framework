import React from "react";
import { Button } from "antd";
import { SunFilled, MoonFilled } from "@ant-design/icons";

import { useTheme } from "@/fe-global/themes/ThemeProvider";

const ChangeTheme: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  return (
    <Button
      type="text"
      icon={mode === "dark" ? <SunFilled /> : <MoonFilled />}
      onClick={() => toggleTheme(mode === "dark" ? "light" : "dark")}
    />
  );
};

export default ChangeTheme;
