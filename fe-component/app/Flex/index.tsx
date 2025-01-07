import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type FlexProps = {
  direction?: 'row' | 'column';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number;
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
};

const Flex: React.FC<FlexProps> = ({
  direction = 'row',
  justify = 'flex-start',
  align = 'center',
  wrap = 'nowrap',
  gap = 0,
  style,
  children,
}) => {
  // Automatically apply gap between children
  const renderChildrenWithGap = () => {
    return React.Children.map(children, (child, index) => (
      <View
        style={[
          index !== 0 && {
            [direction === 'row' ? 'marginLeft' : 'marginTop']: gap,
          },
        ]}
      >
        {child}
      </View>
    ));
  };

  return (
    <View
      style={[
        styles.flex,
        { flexDirection: direction, justifyContent: justify, alignItems: align, flexWrap: wrap },
        style,
      ]}
    >
      {renderChildrenWithGap()}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
  },
});

export default Flex;
