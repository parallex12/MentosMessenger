import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { messageCardStyles as _styles } from "../../../styles/Home/main";
import { Entypo } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const MessageCard = (props) => {
    let { item } = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });

    let navigation = useNavigation()
    
    const onPress = () => {
        navigation.navigate("ChatScreen", { item })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.profileWrapper}>
                <Image
                    source={require("../../../assets/profile.png")}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View style={styles.textContent}>
                <Text style={styles.userName}>Zeeshan Karim</Text>
                <Text style={styles.lastMessageText}>You: Where are you</Text>
            </View>
            <View style={styles.timeContent}>
                <Text style={styles.timeText}>5:04 PM</Text>
            </View>
        </TouchableOpacity>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(MessageCard);
