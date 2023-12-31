import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { headerStyles as _styles } from "../../../styles/Home/main";
import { AntDesign } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { SignOut } from "../../../state-management/actions/auth";

const Header = (props) => {
    let { } = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });
    let navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.profileWrapper} onPress={() => navigation.navigate("Profile")}>
                <Image
                    source={require("../../../assets/profile.png")}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                />
            </TouchableOpacity>
            <Text style={styles.title}>Super Admin</Text>
            <View style={styles.actionWrapper}>
                <TouchableOpacity style={styles.editBtn} onPress={props?.SignOut}>
                    <AntDesign name="logout" size={RFValue(15)} color="#979797" />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
});
export default connect(mapStateToProps, {SignOut})(Header);
