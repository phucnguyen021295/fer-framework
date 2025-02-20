import React, { memo, useEffect } from "react";
import { Flex, Tabs } from "antd";
import { createStyles } from "antd-style";
import useResponsivePadding from "../../hooks/useResponsivePadding";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addTabByRoute,
  initTabStore,
  removeTab,
  selectAllTabs,
  tabSelectors,
} from "../../reducers/tab";
import { useFullscreen } from "ahooks";
import FullScreen from "../../components/FullScreen";
import { GLOBAL_PAGE_TAB_ID } from "../../constants";
import ReloadPage from "../../components/ReloadPage";

interface Props {
  isMobile: boolean;
}

const GlobalTab: React.FC<Props> = (props: Props) => {
  const { styles } = useStyles();
  const padding = useResponsivePadding();
  const route = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const { isMobile } = props;
  const activeTabId = useSelector(tabSelectors.getActiveTabId);
  const items = useSelector(selectAllTabs);
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(
    document.getElementById(GLOBAL_PAGE_TAB_ID)
  );

  useEffect(() => {
    dispatch(initTabStore());
  }, []);

  useEffect(() => {
    dispatch(addTabByRoute(path));
  }, [path]);

  const onChange = (newActiveKey: string) => {
    route.push(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    dispatch(removeTab(targetKey, route));
  };

  return (
    <Flex
      className={styles.container}
      style={{ paddingInline: padding }}
      justify="space-between"
    >
      <Tabs
        hideAdd
        size="small"
        type="editable-card"
        onChange={onChange}
        className={styles.tabs}
        activeKey={activeTabId}
        onEdit={onEdit}
        items={items}
      />
      <Flex gap={8}>
        <ReloadPage handClick={() => route.refresh()} />
        {!isMobile && (
          <FullScreen full={isFullscreen} toggleFullscreen={toggleFullscreen} />
        )}
      </Flex>
    </Flex>
  );
};

export default memo(GlobalTab);

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    background-color: ${token.colorBgContainer};
    border-bottom: 1px solid ${token.colorBorderSecondary};
    padding-top: 11px;
    padding-inline: 12px;
  `,

  tabs: css`
    background-color: ${token.colorBgContainer};
    /* border-bottom: 1px solid #e8e8e8; */

    & .ant-tabs-nav {
      margin: 0;
    }

    & .ant-tabs-nav::before {
      border-bottom: 0;
    }
  `,
}));
