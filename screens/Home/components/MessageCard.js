import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { messageCardStyles as _styles } from "../../../styles/Home/main";
import { Entypo } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { getSentTimeFormat } from "../../../middleware";
import { getAuth } from "firebase/auth";
import { getAnyUser, updateStatus } from "../../../state-management/actions/features";
import { useEffect, useState } from "react";

const MessageCard = (props) => {
    let { data, newMessages } = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });
    let navigation = useNavigation()
    let me = getAuth().currentUser
    let userDetails = me?.email == data?.reciever_details?.email ? data?.sender_details : data?.reciever_details
    let sentTime = getSentTimeFormat(data?.created_at)
    const [updatedUserData, setUpdatedUserData] = useState(null)
    const onPress = () => {
        navigation.navigate("ChatScreen", { data: userDetails })
    }

    useEffect(() => {
        if (userDetails?.id) {
            getAnyUser(userDetails?.id).then((res) => {
                setUpdatedUserData(res)
            })
        }
    }, [userDetails])

    console.log(newMessages)
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.profileWrapper}>
                <Image
                    source={updatedUserData?.profile ? { uri: updatedUserData?.profile } : require("../../../assets/profile.png")}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View style={styles.textContent}>
                <Text style={styles.userName}>{updatedUserData?.name}</Text>
                <Text style={styles.lastMessageText} numberOfLines={1}>{data?.lastMessage}</Text>
            </View>
            <View style={styles.timeContent}>
                <Text style={styles.timeText}>{sentTime}</Text>
                {newMessages>0 && <View style={styles.dot}>
                    <Text style={styles.dotText} >{newMessages <= 99 ? newMessages : 99}</Text></View>}
            </View>
        </TouchableOpacity>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
});
export default connect(mapStateToProps, { getAnyUser, updateStatus })(MessageCard);
