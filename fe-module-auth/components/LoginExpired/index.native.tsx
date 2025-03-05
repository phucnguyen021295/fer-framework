// @ts-nocheck
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

// Selectors
import { useDispatch, useSelector } from "react-redux";
// import {resetStore} from '../../../../stores/store';
import { authSelectors } from "../../reducers";
import Button from "@/fe-component/Button";
import BottomSheet from "@/fe-component/BottomSheet";
import Text from "@/fe-component/Text";
import { useNavigation } from "@react-navigation/native";
import { SCREEN } from "../../screens";
import { AUTH_ACTION } from "fe-base/actions";

function LoginExpired(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const expired = useSelector(authSelectors.getExpired);

  const onArgee = async () => {
    dispatch({ type: AUTH_ACTION.LOGOUT });
    navigation.navigate(SCREEN.CHECK_AUTH);
  };

  return (
    <BottomSheet
      isVisible={expired}
      points={["30%"]}
      mode="un-backdrop"
      e
      title={"Hết phiên đăng nhập"}
    >
      <View style={styles.container}>
        <Text type="Secondary" style={styles.descriptionModal}>
          Ứng dụng của bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại để
          được tiếp tục.
        </Text>
        <View style={styles.bottom}>
          <Button type="primary" onPress={onArgee}>
            Đăng nhập
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
}

export default memo(LoginExpired);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    // backgroundColor: '#ffffff',
  },

  descriptionModal: {
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  textNote: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 40,
    paddingVertical: 50,
    lineHeight: 16 * 1.5,
  },

  name: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: "500",
    textTransform: "uppercase",
  },

  memberCode: {
    fontSize: 18,
    fontWeight: "400",
  },

  qrStyle: {
    backgroundColor: "white",
    borderColor: "#246BFD",
    borderWidth: 1,
    borderRadius: 8,
  },

  bottom: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
});
