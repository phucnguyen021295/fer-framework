import React from "react";
import { Button, Tooltip } from "antd";
import { SunFilled, MoonFilled } from "@ant-design/icons";
import { useTheme } from "fe-global/themes";

const ChangeTheme: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  return (
    <Tooltip title={mode === "dark" ? "Sáng" : "Tối"}>
      <Button
        type="text"
        icon={mode === "dark" ? <SunFilled /> : <MoonFilled />}
        onClick={() => toggleTheme(mode === "dark" ? "light" : "dark")}
      />
    </Tooltip>
  );
};

export default ChangeTheme;
