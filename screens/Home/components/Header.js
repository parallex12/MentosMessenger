import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { headerStyles as _styles } from "../../../styles/Home/main";
import { Entypo } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const Header = (props) => {
    let { title, plusIcon } = props
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });
    let navigation = useNavigation()
    let profile = props?.get_user_details?.profile

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.profileWrapper} onPress={() => navigation.navigate("Profile")}>
                <Image
                    source={profile ? { uri: profile } : require("../../../assets/profile.png")}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.actionWrapper}>
                {plusIcon &&
                    <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate("People")}>
                        <Entypo name="plus" size={RFValue(15)} color="#fff" />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
    get_user_details: state.main.get_user_details,

});
export default connect(mapStateToProps, {})(Header);
