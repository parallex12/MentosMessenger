import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/UserProfileView/main";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import {
  adminuserActionOptions,
  firebaseImageUpload,
  settingsOptions,
  userActionOptions,
} from "../../middleware";
import { SignOut, DeleteAccount } from "../../state-management/actions/auth";
import { getAuth } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import {
  getCurrentUser,
  updateUser,
  getAllUsers
} from "../../state-management/actions/features";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";

const AdminUserProfileView = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const prev_user_data = props?.route?.params;
  const currentUser = getAuth().currentUser;
  let blocked_users = props?.get_user_details?.blocked_users || [];
  const isCurrentUserBlocked = blocked_users?.includes(prev_user_data?.id);
  const bottomFlagSheetRef = useRef();
  const [loading, setLoading] = useState(false);

  const Options = ({ data }) => {
    const [buttonLoading, setButtonLoading] = useState(false);
    let email = props?.get_user_details?.email;

    return (
      <TouchableOpacity
        style={styles.actionItem}
        onPress={() => data?.onPress(props)}
      >
        <View style={styles.iconWrapper}>
          {buttonLoading ? <ActivityIndicator /> : data?.icon}
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.actionTitle}>{data?.title}</Text>
          <Text style={styles.actionSlug}>{data?.slug || email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  let actionsOnpress = {
    suspend: (userId) =>
      Alert.alert("Warning", "Are you sure you want to suspend this user?", [
        {
          text: "Cancel",
          onPress: () => console.log("Block Cancelled"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            props
              ?.updateUser(
                { status: "suspend" },
                prev_user_data?.id,
                () => null
              )
              .then((res) => {
                props?.getAllUsers(setLoading)
                Alert.alert(
                  "User account suspended",
                  "This user has been suspened successfully."
                );
              })
              .catch((e) => {
                console.log(e);
                alert("Something went wrong try again.");
              });
          },
        },
      ]),

    reactive: (userId) =>
      Alert.alert("Warning", "Are you sure you want to reactive this user?", [
        {
          text: "Cancel",
          onPress: () => console.log("Reactive Cancelled"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            props
              ?.updateUser(
                { status: "active" },
                prev_user_data?.id,
                () => null
              )
              .then((res) => {
                props?.getAllUsers(setLoading)
                Alert.alert(
                  "User account reactived.",
                  "This user has been reactived successfully."
                );
              })
              .catch((e) => {
                console.log(e);
                alert("Something went wrong try again.");
              });
          },
        },
      ]),
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => props?.navigation?.goBack()}>
          <Ionicons name="arrow-back" size={24} color="blue" />
        </TouchableOpacity>
        <Text style={styles.meText}>{prev_user_data?.name}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.infoWrapper}>
          <View style={styles.profile}>
            <Image
              source={
                prev_user_data?.profile
                  ? { uri: prev_user_data?.profile }
                  : require("../../assets/profile.png")
              }
              resizeMode="cover"
              style={styles.profileImg}
            />
          </View>
          <Text style={styles.username}>{prev_user_data?.name}</Text>
          <Text style={styles.email}>{prev_user_data?.email}</Text>
        </View>

        <View style={styles.actionsWrapper}>
          <Text style={styles.label}>
            Reported by users (
            {Object.values(prev_user_data?.reports || {})?.length})
          </Text>
          {Object.values(prev_user_data?.reports || {})?.map((item, index) => {
            return (
              <Text style={styles.reportlabel} key={index}>
                {eval(index + 1)}: {item[0].label}
              </Text>
            );
          })}
        </View>
        {console.log(prev_user_data.status=="suspend")}

        <View style={styles.actionsWrapper}>
          <Text style={styles.label}>Actions</Text>
          {adminuserActionOptions(actionsOnpress, prev_user_data.status=="suspend")?.map(
            (item, index) => {
              return <Options key={index} data={item} />;
            }
          )}
        </View>
      </View>
      <FlagReportBottomSheet
        postId={prev_user_data?.id}
        bottomSheetRef={bottomFlagSheetRef}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  get_user_details: state.main.get_user_details,
});
export default connect(mapStateToProps, {
  updateUser,
  getCurrentUser,
  getAllUsers
})(AdminUserProfileView);
