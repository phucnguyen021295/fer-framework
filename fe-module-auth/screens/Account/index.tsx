import {authActions, authSelector} from '@/app/reducers/auth';
import Text from '@/fe-component/Text';
import {useNavigation} from '@react-navigation/native';
import React, {memo, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from '@d11/react-native-fast-image';
import EditAvatar from '@/fe-component/Avatar/EditAvatar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN } from '../index';

// Components

function AccountScreen(props) {
  const {width} = useWindowDimensions();
  const user = useSelector(authSelector.getMe);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLogout, setIsLogout] = useState(false);

  const onLogout = () => {
    dispatch(authActions.logout({}));
    dispatch({type: 'RESET_STORE'});
    setTimeout(() => {
      navigation.navigate(SCREEN.CHECK_AUTH);
    }, 500);
  };
  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <FastImage
          style={{
            width,
            height: 300,
            borderBottomRightRadius: 40,
            borderBottomLeftRadius: 40,
          }}
          source={require('./images/banner.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.banner}>
          <EditAvatar uri="" size="Bigger" onUploadImage={() => {}} />
          <Text style={{paddingTop: 8}} size="Larger" mode="Bold">
            {user?.fullName}
          </Text>
          <Text type="Secondary" style={{textAlign: 'center'}}>
            {user?.organization?.branch[0]?.jobTitleName} -{' '}
            {user?.organization?.branch[0]?.branchName}
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.row}
          onPress={() => navigation.navigate(SCREEN.PERSONAL_INFORMATION)}>
          <AntDesign name={'infocirlceo'} size={22} color={'#000'} />
          <Text style={styles.textRow} size="Medium">Thông tin cá nhân</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#c3c3c3" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.row}
          onPress={() => Alert.alert("Chức năng đang phát triển")}>
          <AntDesign name={'setting'} size={24} color={'#000'} />
          <Text style={styles.textRow} size="Medium">Cài đặt</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#c3c3c3" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.row}
          onPress={onLogout}>
          <MaterialIcons name="logout" size={24} color="red" />
          <Text style={[styles.textRow, {color: 'red'}]} size="Medium">Đăng xuất</Text>
        </TouchableOpacity>
      </View>
      {/* <Logout
        onLogout={onLogout}
        isVisible={isLogout}
        setIsVisible={setIsLogout}
      /> */}
    </View>
  );
}

export default memo(AccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  info: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
    gap: 12
  },

  bannerContainer: {
    // ...StyleSheet.absoluteFillObject,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },

  banner: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  edit: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    paddingRight: 24,
  },

  editRight: {
    flex: 1,
    paddingHorizontal: 12,
  },

  fullName: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 14 * 1.43,
  },

  editInfo: {
    fontSize: 14,
    lineHeight: 14 * 1.43,
    color: '#AAAAAA',
  },

  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 8,
    gap: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#F0F0F0',
    borderWidth: 1,
    shadowColor: '#000', // Màu của bóng
    shadowOffset: {width: 0, height: 2}, // Độ lệch của bóng
    shadowOpacity: 0.04, // Độ mờ của bóng (0 đến 1)
    shadowRadius: 3.84, // Bán kính làm mờ bóng
  },

  textRow: {
    flex: 1,
  },
});
