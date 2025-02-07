import React, { memo } from "react";
import { Typography, Card, Flex } from "antd";
import {
  LAYOUT_MODE_HORIZONTAL,
  LAYOUT_MODE_HORIZONTAL_MIX,
  LAYOUT_MODE_VERTICAL,
  LAYOUT_MODE_VERTICAL_MIX,
  ThemeLayoutMode,
} from "../../constants";
import { setLayoutMode, appSelector } from "../../reducers/app";
import { useDispatch, useSelector } from "react-redux";
import { createStyles } from "antd-style";

const { Title } = Typography;

const LayoutMode: React.FC = () => {
  const { styles, theme } = useStyles();
  const dispatch = useDispatch();
  const layoutMode = useSelector(appSelector.getLayoutMode);
  const toggleInverted = (inverted: ThemeLayoutMode) => {
    dispatch(setLayoutMode(inverted));
  };

  return (
    <Flex vertical>
      <Title level={5} style={{ marginBottom: 12 }}>
        Layout Mode
      </Title>
      <Flex wrap gap={12} align="center" justify="center">
        <Card
          hoverable
          onClick={() => toggleInverted(LAYOUT_MODE_VERTICAL)}
          rootClassName={styles.container}
          style={{
            width: "120px",
            borderRadius: 8,
            border:
              layoutMode === LAYOUT_MODE_VERTICAL
                ? `2px solid ${theme.colorPrimary}`
                : "2px solid #ddd",
            flexDirection: "column",
            padding: 8,
          }}
        >
          <Flex gap={4}>
            <div
              style={{
                width: 30,
                backgroundColor: theme.colorPrimaryBgHover,
                height: 80,
                borderRadius: 4,
              }}
            />
            <Flex vertical flex={1} gap={4}>
              <div
                style={{
                  width: "100%",
                  backgroundColor: theme.colorPrimary,
                  height: 20,
                  borderRadius: 4,
                }}
              />
              <div
                style={{
                  width: "100%",
                  flex: 1,
                  backgroundColor: theme.colorPrimaryBgHover,
                  height: "100%",
                  borderRadius: 4,
                }}
              />
            </Flex>
          </Flex>
        </Card>

        <Card
          hoverable
          onClick={() => toggleInverted(LAYOUT_MODE_HORIZONTAL)}
          rootClassName={styles.container}
          style={{
            width: "120px",
            borderRadius: 8,
            border:
              layoutMode === LAYOUT_MODE_HORIZONTAL
                ? `2px solid ${theme.colorPrimary}`
                : "2px solid #ddd",
            flexDirection: "column",
            padding: 8,
          }}
        >
          <Flex vertical flex={1} gap={4}>
            <div
              style={{
                width: "100%",
                backgroundColor: theme.colorPrimary,
                height: 20,
                borderRadius: 4,
              }}
            />
            <div
              style={{
                width: "100%",
                backgroundColor: theme.colorPrimaryBgHover,
                height: 60,
                borderRadius: 4,
              }}
            />
          </Flex>
        </Card>
        <Card
          hoverable
          onClick={() => toggleInverted(LAYOUT_MODE_VERTICAL_MIX)}
          rootClassName={styles.container}
          style={{
            width: "120px",
            borderRadius: 8,
            border:
              layoutMode === LAYOUT_MODE_VERTICAL_MIX
                ? `2px solid ${theme.colorPrimary}`
                : "2px solid #ddd",
            flexDirection: "column",
            padding: 8,
          }}
        >
          <Flex vertical gap={4}>
            <div
              style={{
                width: "100%",
                backgroundColor: theme.colorPrimary,
                height: 20,
                borderRadius: 4,
              }}
            />
            <Flex gap={4}>
              <div
                style={{
                  width: 30,
                  backgroundColor: theme.colorPrimaryBgHover,
                  height: 60,
                  borderRadius: 4,
                }}
              />
              <div
                style={{
                  width: "100%",
                  backgroundColor: theme.colorPrimaryBgHover,
                  height: 60,
                  borderRadius: 4,
                }}
              />
            </Flex>
          </Flex>
        </Card>
        <Card
          hoverable
          onClick={() => toggleInverted(LAYOUT_MODE_HORIZONTAL_MIX)}
          rootClassName={styles.container}
          style={{
            width: "120px",
            borderRadius: 8,
            border:
              layoutMode === LAYOUT_MODE_HORIZONTAL_MIX
                ? `2px solid ${theme.colorPrimary}`
                : "2px solid #ddd",
            flexDirection: "column",
            padding: 8,
          }}
        >
          <Flex gap={4}>
            <div
              style={{
                width: 10,
                backgroundColor: theme.colorPrimaryBgHover,
                height: 80,
                borderRadius: 4,
              }}
            />
            <Flex vertical flex={1} gap={4}>
              <div
                style={{
                  width: "100%",
                  backgroundColor: theme.colorPrimary,
                  height: 20,
                  borderRadius: 4,
                }}
              />
              <div
                style={{
                  width: "100%",
                  flex: 1,
                  backgroundColor: theme.colorPrimaryBgHover,
                  height: "100%",
                  borderRadius: 4,
                }}
              />
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default memo(LayoutMode);

const useStyles = createStyles(({ token, css }) => ({
  // Also supports obtaining the same writing experience as normal css through css string templates
  container: css`
    & .ant-card-body {
      padding: 0;
    }
  `,
}));
