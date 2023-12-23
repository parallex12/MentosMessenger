import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { messageCardStyles as _styles } from "../../../styles/Home/main";
import { Entypo } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const PeopleCard = (props) => {
    let { data, onApprove, onReject } = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });

    let navigation = useNavigation()

    const onPress = () => {
        navigation.navigate("ChatScreen", { data })
    }

    
    return (
        <View style={styles.container} onPress={onPress}>
            <View style={styles.profileCont}>
                <View style={styles.profileWrapper}>
                    <Image
                        source={data?.profile ? { uri: data?.profile } : require("../../../assets/profile.png")}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </View>
            <View style={styles.textContent}>
                <Text style={styles.userName}>{`${data?.name} (${data?.agentId ? "Agent" : "User"})`}</Text>
                <Text style={styles.slug}>{data?.agentId || data?.email}</Text>
            </View>
            <View style={styles.actionWrapper}>
                {
                    data?.type == "user" ?
                        <TouchableOpacity style={styles.approvebtn} onPress={onApprove}>
                            <Text style={styles.btnText}>Set as agent</Text>
                        </TouchableOpacity>
                        : <TouchableOpacity style={styles.rejectbtn} onPress={onReject}>
                            <Text style={styles.btnText}>Remove as agent</Text>
                        </TouchableOpacity>
                }
            </View>
        </View>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(PeopleCard);
