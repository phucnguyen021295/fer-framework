import React, {memo, useState} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {Divider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Text from '@/fe-component/Text';
import ListHeaderComponent from '../FlashList/ListHeaderComponent';

const expandAllNodes = (nodes, isExpanded = false) => {
  return nodes.map(node => {
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        isExpanded: isExpanded,
        children: expandAllNodes(node.children),
      };
    }
    return {...node, isExpanded: false}; // Node không có children sẽ không mở rộng
  });
};

const toggleExpand = (nodeId, tree) => {
  const updateTree = nodes => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return {...node, isExpanded: !node.isExpanded};
      }
      if (node.children && node.children.length > 0) {
        return {...node, children: updateTree(node.children)};
      }
      return node;
    });
  };

  return updateTree(tree);
};

const TreeNode = ({node, onNodePress, onSelect}) => {
  return (
    <>
      <View style={styles.nodeContainer}>
        <TouchableOpacity style={styles.node} onPress={() => onSelect(node)}>
          <Text
            size="Medium"
            mode={node.children ? 'SemiBold' : 'Regular'}
            numberOfLines={2}>
            {node.label}
          </Text>
          {node.children && node.children.length > 0 && (
            <Ionicons
              name={node.isExpanded ? 'chevron-down' : 'chevron-forward'}
              onPress={e => {
                e.stopPropagation(); // Ngăn không kích hoạt sự kiện onSelect
                onNodePress(node.id);
              }}
              size={24}
              color="black"
            />
          )}
        </TouchableOpacity>
        {node.isExpanded && node.children && (
          <View style={styles.children}>
            {node.children.length > 0 && <Divider />}
            {node.children.map(child => (
              <TreeNode
                key={child.id}
                node={child}
                onSelect={onSelect}
                onNodePress={onNodePress}
              />
            ))}
          </View>
        )}
      </View>
      <Divider />
    </>
  );
};

interface Props {
    data: {name: string, value: string, children?: []}[];
    onSelect: (value: string) => void;
    defaultExpand?: boolean;
}

const Tree = (props: Props) => {
  const {data, onSelect, defaultExpand = false} = props;
  const [treeData, setTreeData] = useState(() => expandAllNodes(data, defaultExpand));

  const handleNodePress = nodeId => {
    setTreeData(prevTree => toggleExpand(nodeId, prevTree));
  };

  const onSelectProblem = node => {
    onSelect(node);
  };

  return (
    <FlashList
      data={treeData}
      renderItem={({item}) => (
        <TreeNode
          node={item}
          onNodePress={handleNodePress}
          onSelect={onSelectProblem}
        />
      )}
      estimatedItemSize={100}
      ListHeaderComponent={<ListHeaderComponent data={data} isSuccess={true} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  nodeContainer: {
    marginVertical: 4,
  },
  node: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    borderRadius: 4,
    marginBottom: 4,
  },
  children: {
    paddingLeft: 20,
  },
});

export default memo(Tree);
