import { ActivityIndicator, Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/Profile/main";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { firebaseImageUpload, settingsOptions } from "../../middleware";
import { SignOut } from "../../state-management/actions/auth";
import { getAuth } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getCurrentUser } from "../../state-management/actions/features";

const Profile = (props) => {
  let { } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const agent_ID = props?.get_user_details?.agentId
  const [image, setImage] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)

  const Options = ({ data }) => {
    let email = props?.get_user_details?.email
    return (
      <TouchableOpacity style={styles.actionItem} onPress={() => data?.onPress(props)}>
        <View style={styles.iconWrapper}>
          {data?.icon}
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.actionTitle}>{data?.title}</Text>
          <Text style={styles.actionSlug}>{data?.slug || email}</Text>
        </View>
      </TouchableOpacity>
    )
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageLoading(true)
      await firebaseImageUpload(result.assets[0].uri, props?.get_user_details?.email, setImageLoading)
        .then(async (res) => {
          const db = getFirestore();
          const userRef = doc(db, "users", getAuth().currentUser.uid);
          await updateDoc(userRef, { profile: res.url })
            .then((res) => {
              props?.getCurrentUser(setImageLoading)
                .then((res) => console.log(res))
                .catch((e) => console.log(e))
              alert("Profile Updated")
            })
            .catch((e) => {
              console.log(e)
              setImageLoading(false)
              setImage(null)

            })
        })
        .catch((e) => {
          console.log(e.message)
          setImageLoading(false)
          setImage(null)
        })
    }
  };

  let profile = props?.get_user_details?.profile

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => props?.navigation?.goBack()}>
          <Ionicons name="arrow-back" size={24} color="blue" />
        </TouchableOpacity>
        <Text style={styles.meText}>Me</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.infoWrapper}>
          <TouchableOpacity style={styles.profile} onPress={pickImage}>
            <Image
              source={image ? { uri: image } : profile ? { uri: profile } : require("../../assets/profile.png")}
              resizeMode="cover"
              style={styles.profileImg}
            />
            {imageLoading < 100 && imageLoading > 0 && imageLoading != null ?
              <ActivityIndicator style={styles.cameraIcon} size="small" color="#fff" />
              : <Ionicons
                style={styles.cameraIcon}
                name="camera-reverse"
                size={RFValue(30)}
                color="black"
              />}
          </TouchableOpacity>
          <Text style={styles.username}>{props?.get_user_details?.name}</Text>
          {agent_ID && <Text style={styles.slugId}>#{agent_ID}</Text>}
        </View>
        <View style={styles.actionsWrapper}>
          <Text style={styles.label}>Settings</Text>
          {
            settingsOptions?.map((item, index) => {
              return <Options key={index} data={item} />
            })
          }

        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  get_user_details: state.main.get_user_details,
});
export default connect(mapStateToProps, { SignOut, getCurrentUser })(Profile);
