import React, { memo } from "react";
import { Flex, Switch, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { appSelector, setDarkModeSider } from "../../reducers/app";

const { Title } = Typography;

const DarkModeSider: React.FC = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(appSelector.getDarkModeSider);

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    dispatch(setDarkModeSider(checked));
  };
  return (
    <Flex justify="space-between" align="center">
      <Title level={5}>Dark mode sider</Title>
      <Switch value={darkMode} onChange={onChange} />
    </Flex>
  );
};

export default memo(DarkModeSider);
