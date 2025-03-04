// import AppBar from '@/fe-component/AppBar';
// import React, {memo} from 'react';
// import {StyleSheet, SafeAreaView, View, Clipboard} from 'react-native';
// import ViewTheme from '@/fe-component/ViewTheme';
// import Avatar from '@/fe-component/Avatar';
// import Text from '@/fe-component/Text';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Octicons from 'react-native-vector-icons/Octicons';
// import {useTheme} from 'react-native-paper';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useSelector} from 'react-redux';
// import {authSelector} from '@/app/reducers/auth';
// import moment from 'moment';
// import LinearGradient from 'react-native-linear-gradient';
// import {Toast} from '@ant-design/react-native';

// function PersonalInformation(props) {
//   const token = useTheme();
//   const user = useSelector(authSelector.getMe);

//   const onCopy = value => {
//     Clipboard.getString(value)
//       .then(result => {
//         Toast.success('Copy thành công');
//       })
//       .catch(err => {
//         Toast.fail('Copy thất bại');
//       });
//   };
//   return (
//     <ViewTheme style={styles.container}>
//       <AppBar title={'Thông tin cá nhân'} />
//       <View style={styles.info}>
//         <View style={styles.header}>
//           <Avatar uri={user?.avatar} size="Bigger" elevation={0} />
//           <Text size="Larger" mode="SemiBold">
//             {user?.fullName}
//           </Text>
//           <LinearGradient
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 0}}
//             colors={['#21418A', '#08c8f9']}
//             style={{borderRadius: 18}}>
//             <View style={styles.code}>
//               <Text style={{color: '#fff'}}>Mã NV: {user?.employeeCode}</Text>
//             </View>
//           </LinearGradient>
//         </View>

//         <View style={styles.body}>
//           <View style={styles.surface}>
//             <View style={styles.item}>
//               <View style={styles.iconContainer}>
//                 <AntDesign
//                   name="phone"
//                   size={24}
//                   color={token.colors.primary}
//                 />
//               </View>
//               <View style={styles.content}>
//                 <Text type="Secondary">Số điện thoại</Text>
//                 <Text>{user?.phoneNumber}</Text>
//               </View>
//               <AntDesign
//                 name="copy1"
//                 size={20}
//                 color={'#A2A2A2'}
//                 onPress={() => onCopy(user?.phoneNumber)}
//               />
//             </View>
//           </View>
//           <View style={styles.surface}>
//             <View style={styles.item}>
//               <View style={styles.iconContainer}>
//                 <AntDesign name="mail" size={24} color={token.colors.primary} />
//               </View>
//               <View style={styles.content}>
//                 <Text type="Secondary">Email</Text>
//                 <Text>{user?.email}</Text>
//               </View>
//               <AntDesign
//                 name="copy1"
//                 size={20}
//                 color={'#A2A2A2'}
//                 onPress={() => onCopy(user?.email)}
//               />
//             </View>
//           </View>

//           <View style={styles.surface}>
//             <View style={styles.item}>
//               <View style={styles.iconContainer}>
//                 <FontAwesome
//                   name="birthday-cake"
//                   size={20}
//                   color={token.colors.primary}
//                 />
//               </View>
//               <View style={styles.content}>
//                 <Text type="Secondary">Ngày sinh</Text>
//                 <Text>{moment(user?.birthday).format('DD/MM/YYYY')}</Text>
//               </View>
//             </View>
//           </View>
//           <View style={styles.surface}>
//             <View style={styles.departmentalStructure}>
//               <View style={styles.item}>
//                 <View style={styles.iconContainer}>
//                   <Octicons
//                     name="organization"
//                     size={22}
//                     color={token.colors.primary}
//                   />
//                 </View>
//                 <View style={styles.content}>
//                   <Text type="Secondary">Đơn vị</Text>
//                   <Text>{user?.organization?.organizationName}</Text>
//                 </View>
//               </View>

//               <View style={styles.item}>
//                 <View style={styles.iconContainer}>
//                   <Entypo
//                     name="flow-tree"
//                     size={22}
//                     color={token.colors.primary}
//                   />
//                 </View>
//                 <View style={styles.content}>
//                   <Text type="Secondary">Phòng ban</Text>
//                   <Text>{user?.organization?.branch[0]?.branchName}</Text>
//                 </View>
//               </View>

//               <View style={styles.item}>
//                 <View style={styles.iconContainer}>
//                   <Ionicons
//                     name="bag-remove-sharp"
//                     size={24}
//                     color={token.colors.primary}
//                   />
//                 </View>
//                 <View style={styles.content}>
//                   <Text type="Secondary">Chức danh</Text>
//                   <Text>{user?.organization?.branch[0]?.jobTitleName}</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//       <SafeAreaView style={{backgroundColor: '#fff'}} />
//     </ViewTheme>
//   );
// }

// export default memo(PersonalInformation);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   info: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },

//   header: {
//     marginTop: 24,
//     alignItems: 'center',
//     gap: 8,
//   },

//   code: {
//     height: 36,
//     paddingHorizontal: 16,
//     justifyContent: 'center',
//   },

//   body: {
//     paddingHorizontal: 20,
//     paddingVertical: 24,
//     gap: 16,
//   },

//   surface: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 8,
//     borderColor: '#F0F0F0',
//     borderWidth: 1,
//     shadowColor: '#000', // Màu của bóng
//     shadowOffset: {width: 0, height: 2}, // Độ lệch của bóng
//     shadowOpacity: 0.03, // Độ mờ của bóng (0 đến 1)
//     shadowRadius: 3.84, // Bán kính làm mờ bóng
//   },

//   item: {
//     flexDirection: 'row',
//     gap: 12,
//     alignItems: 'center',
//   },

//   iconContainer: {
//     height: 44,
//     width: 44,
//     borderRadius: 8,
//     backgroundColor: '#e6f7ff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   content: {
//     flex: 1,
//   },

//   departmentalStructure: {
//     gap: 12,
//   },
// });
