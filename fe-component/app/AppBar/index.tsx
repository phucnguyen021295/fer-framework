import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, AppbarProps} from 'react-native-paper';

interface Props extends AppbarProps {
  title?: string;
  children?: string;
  onSearch?: () => {};
  onMore?: () => {};
  onGoBack?: () => void;
  backgroundColor?: string;
  color?: string;
  hideGoBack?: boolean;
}

const AppBarBase = (props: Props) => {
  const {
    children,
    title,
    backgroundColor = '#fff',
    color,
    onSearch,
    onMore,
    onGoBack,
    hideGoBack
  } = props;
  const navigation = useNavigation();
  const _goBack = () => {
    if (onGoBack) {
      onGoBack();
      return;
    }
    navigation.goBack();
    return true;
  };

  const _handleSearch = () => {
    onSearch && onSearch();
  };

  const _handleMore = () => {
    onMore && onMore();
  };

  return (
    <Appbar.Header style={[styles.container, {backgroundColor}]}>
      {!hideGoBack && <Appbar.BackAction onPress={_goBack} color={color} />}
      {title && (
        <Appbar.Content
          title={title}
          titleStyle={[styles.titleStyle, {color: color || '#000'}]}
        />
      )}
      {children && children}
      {onSearch && <Appbar.Action icon="magnify" onPress={_handleSearch} />}
      {onMore && <Appbar.Action icon="dots-vertical" onPress={_handleMore} />}
    </Appbar.Header>
  );
};

export default React.memo(AppBarBase);

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#fff',
    borderBottomColor: '#f0eeee',
    borderBottomWidth: 0.5
  },
  titleStyle: {
    color: '#246BFD',
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
