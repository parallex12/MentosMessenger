import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { messageCardStyles as _styles } from "../../../styles/Home/main";
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const PeopleCard = (props) => {
    let { data } = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });

    let navigation = useNavigation()

    const onPress = () => {
        navigation.navigate("ChatScreen", { data })
    }

    return (
        <View style={styles.container} >
            <View style={styles.profileCont}>
                <View style={styles.profileWrapper}>
                    <Image
                        source={require("../../../assets/profile.png")}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
                <View style={styles.activeIcon}></View>
            </View>
            <View style={styles.textContent}>
                <Text style={styles.userName}>{data?.name}</Text>
                <Text style={styles.slug}>Mentos Messenger</Text>
            </View>
            <TouchableOpacity style={styles.requestBtn} onPress={onPress}>
                <Ionicons name="chatbubble" size={RFValue(13)} color="#fff" />
            </TouchableOpacity>
        </View>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(PeopleCard);
