import { Image, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { contactsStyles as _styles } from "../../../styles/Home/main";
import { useNavigation } from "@react-navigation/native";

const Contacts = (props) => {
    let { } = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });
    let navigation = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                {
                    props?.get_all_contacts?.map((item, index) => {
                       
                        if (!item?.online) return
                        return (
                            <TouchableOpacity style={styles.userWrapper} key={index} onPress={() => navigation.navigate("ChatScreen", { data:item })}>
                                <View style={styles.profileCont}>
                                    <View style={styles.profileWrapper}>
                                        <Image
                                            source={item?.profile ? { uri: item?.profile } : require("../../../assets/profile.png")}
                                            resizeMode="cover"
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </View>
                                    <View style={styles.activeIcon}></View>
                                </View>
                                <Text style={styles.name}>{item?.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
    get_all_contacts: state.main.get_all_contacts,

});
export default connect(mapStateToProps, {})(Contacts);
