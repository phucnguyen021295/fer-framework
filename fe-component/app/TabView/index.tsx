import React, {memo, forwardRef, useImperativeHandle, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  TabView,
  Route,
  SceneRendererProps,
  SceneMap,
} from 'react-native-tab-view';

interface Props {
  tabIndex?: number;
  routes: Route[];
  renderScene: (props: SceneRendererProps & {route: T}) => React.ReactNode;
}

export {SceneMap};

function TabViewBase(props: Props, ref) {
  const {routes, renderScene, tabIndex = 0} = props;
  const {width} = useWindowDimensions();
  const [index, setIndex] = React.useState(tabIndex);
  const position = useRef(new Animated.Value(0));

  useImperativeHandle(
    ref,
    () => {
      return {
        handleIndexChange: _handleIndexChange,
      };
    },
    [],
  );

  const _handleIndexChange = index => {
    Animated.timing(position.current, {
      toValue: index,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setIndex(index);
  };

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    const translateX = position.current.interpolate({
      inputRange,
      outputRange: inputRange.map(i => i * 200), // Điều chỉnh độ dịch chuyển tab
    });

    return (
      <View style={styles.tabBar}>
        <Animated.View
          style={[
            styles.indicator,
            {
              left: index === 0 ? 4 : 0,
              width: width / 5 - 48,
              transform: [{translateX}],
            },
          ]}
        />
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[styles.tabItem, index === i ? styles.focusTab : {}]}
              onPress={() => _handleIndexChange(i)}>
              <Animated.Text
                style={[
                  styles.tabLabel,
                  index === i ? styles.focusedLabel : null,
                ]}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: width}}
      renderTabBar={renderTabBar}
      lazy
    />
  );
}

export default memo(forwardRef(TabViewBase));

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f9f7f8',
    paddingVertical: 4,
    paddingHorizontal: 4,
    position: 'relative',
    marginHorizontal: 16,
    borderRadius: 24,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  focusTab: {
    backgroundColor: '#E3ECFF',
    borderRadius: 25,
  },
  indicator: {
    position: 'absolute',
    top: 4,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 25,
  },
  tabLabel: {
    fontWeight: '600',
    fontFamily: 'SVN-Gilroy',
  },
  focusedLabel: {
    color: '#246BFD',
  },
});
