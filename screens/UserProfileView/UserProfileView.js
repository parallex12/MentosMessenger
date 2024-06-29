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
  firebaseImageUpload,
  settingsOptions,
  userActionOptions,
} from "../../middleware";
import { SignOut, DeleteAccount } from "../../state-management/actions/auth";
import { getAuth } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import {
  getCurrentUser,
  updateUser,
} from "../../state-management/actions/features";

const UserProfileView = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const prev_user_data = props?.route?.params;
  const currentUser = getAuth().currentUser;
  let blocked_users = props?.get_user_details?.blocked_users || [];
  const isCurrentUserBlocked = blocked_users?.includes(prev_user_data?.id);
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
    block: (userId) =>
      Alert.alert("Block User", "Are you sure you want to block this user?", [
        {
          text: "Cancel",
          onPress: () => console.log("Block Cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            blocked_users.push(prev_user_data?.id);
            props
              ?.updateUser({ blocked_users }, currentUser?.uid, () => null)
              .then((res) => {
                props?.getCurrentUser(() => null);
                Alert.alert(
                  "User Blocked",
                  "This user has been blocked successfully."
                );
              })
              .catch((e) => {
                console.log(e);
                alert("Something went wrong try again.");
              });
          },
        },
      ]),
    unblock: (userId) =>
      Alert.alert(
        "Unblock User",
        "Are you sure you want to unblock this user?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Unblock Cancelled"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              let new_list = blocked_users?.filter(
                (e) => e != prev_user_data?.id
              );
              props
                ?.updateUser(
                  { blocked_users: new_list },
                  currentUser?.uid,
                  () => null
                )
                .then((res) => {
                  props?.getCurrentUser(() => null);
                  Alert.alert(
                    "User Unblocked",
                    "This user has been unblocked successfully."
                  );
                })
                .catch((e) => {
                  console.log(e);
                  alert("Something went wrong try again.");
                });
            },
          },
        ]
      ),

    report: (userId, messageId) =>
      Alert.prompt(
        "Report User",
        "Please provide a reason for reporting this user:",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Report Cancelled"),
            style: "cancel",
          },
          {
            text: "Submit",
            onPress: (reason) => {
              if (reason) {
                Alert.alert(
                  "Report Submitted",
                  "Your report has been submitted successfully."
                );
              } else {
                Alert.alert(
                  "Report Failed",
                  "Please provide a reason for reporting."
                );
              }
            },
          },
        ],
        "plain-text"
      ),
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
          <Text style={styles.username}>{props?.get_user_details?.name}</Text>
        </View>
        <View style={styles.actionsWrapper}>
          <Text style={styles.label}>Actions</Text>
          {userActionOptions(actionsOnpress, isCurrentUserBlocked)?.map(
            (item, index) => {
              return <Options key={index} data={item} />;
            }
          )}
        </View>
      </View>
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
})(UserProfileView);
