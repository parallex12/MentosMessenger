import { Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { bottomMenuStyles } from "../styles/Global/main";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const BottomMenu = (props) => {
    let { setActiveTab, activeTab } = props;
    let { width, height } = useWindowDimensions();
    let styles = bottomMenuStyles({ width, height });

    let navigation = useNavigation()

    const onPress = (id) => {
        let route = id == 0 ? "Home" : "People"
        navigation.navigate(route)
    }

    let activeStyles = styles.actionBtnText
    let inactiveStyles = styles.actionBtnText2

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => onPress(0)}>
                <Ionicons name="chatbubble" size={RFValue(22)} color={activeTab == 0 ? "#133581" : "#A4AAB2"} />
                <Text style={activeTab == 0 ? activeStyles : inactiveStyles}>Chats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => onPress(1)}>
                <FontAwesome5 name="users" size={RFValue(22)} color={activeTab == 1 ? "#133581" : "#A4AAB2"} />
                <Text style={activeTab == 1 ? activeStyles : inactiveStyles}>People</Text>
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(BottomMenu);
