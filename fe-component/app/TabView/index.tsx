import React, {memo, forwardRef, useImperativeHandle, useRef, useEffect} from 'react';
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
import Text from '../Text';

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

  useEffect(() => {
    Animated.timing(position.current, {
      toValue: index,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [])

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
              left: index === 0 ? 8 : 0,
              width: (width - 48) / 2,
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
              {/* <View style={styles.badge}>
                <Text mode="SemiBold" style={{color: '#fff'}}>9</Text>
              </View> */}
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
    flexDirection: 'row',
    justifyContent: 'center'
  },
  focusTab: {
    backgroundColor: 'rgb(198, 231, 255)',
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
    color: '#00AEEF',
  },

  badge: {
    backgroundColor: 'rgb(255, 91, 5)',
    paddingHorizontal: 8,
    borderRadius: 12,
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
