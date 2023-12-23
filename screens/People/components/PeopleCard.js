import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { messageCardStyles as _styles } from "../../../styles/Home/main";
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getAnyUser } from "../../../state-management/actions/features";

const PeopleCard = (props) => {
    let { data } = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });
    const [updatedUserData, setUpdatedUserData] = useState(null)
    let navigation = useNavigation()

    const onPress = () => {
        navigation.navigate("ChatScreen", { data })
    }


    useEffect(() => {
        if (data?.id) {
            getAnyUser(data?.id).then((res) => {
                setUpdatedUserData(res)
            })
        }
    }, [data])

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.profileCont}>
                <View style={styles.profileWrapper}>
                    <Image
                        source={updatedUserData?.profile ? { uri: updatedUserData?.profile } : require("../../../assets/profile.png")}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </View>
            <View style={styles.textContent}>
                <Text style={styles.userName}>{updatedUserData?.name}</Text>
                <Text style={styles.slug}>Mentos Messenger</Text>
            </View>
            <TouchableOpacity style={styles.requestBtn} onPress={onPress}>
                <Ionicons name="chatbubble" size={RFValue(13)} color="#fff" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(PeopleCard);
