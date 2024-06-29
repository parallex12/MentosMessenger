import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { headerStyles as _styles } from "../../../styles/ChatScreen/main";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const Header = (props) => {
  let { data } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let navigation = useNavigation();

  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity onPress={() => navigation?.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.detailsWrapper}>
        <TouchableOpacity
          style={styles.profile}
          onPress={() => navigation.navigate("UserProfileView", data)}
        >
          <Image
            source={
              data?.profile
                ? { uri: data?.profile }
                : require("../../../assets/profile.png")
            }
            resizeMode="cover"
            style={styles.profileImg}
          />
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text style={styles.username}>{data?.name}</Text>
          <Text style={styles.slug}>Mantos Messenger</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.payBtn}
        onPress={() => alert("Coming Soon!")}
      >
        <Text style={styles.payBtnText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(Header);
