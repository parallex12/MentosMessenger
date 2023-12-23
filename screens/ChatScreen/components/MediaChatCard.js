import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { mediaChatCardStyles as _styles, mediaChatCardRecieverStyles } from "../../../styles/ChatScreen/main";
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { getSentTimeFormat } from "../../../middleware";

const MediaChatCard = (props) => {
    let { data, isSender, setImageViewer, images } = props;
    let { width, height } = useWindowDimensions();
    let styles = isSender ? _styles({ width, height }) : mediaChatCardRecieverStyles({ width, height })
    let navigation = useNavigation()
    let sentTime = getSentTimeFormat(data?.created_at)

    return (
        <View style={styles.container}>
            <View style={styles.boxWrapper}>
                {
                    images?.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.imageWrapper} onPress={() => setImageViewer(item.uri || item)}>
                                <Image
                                    source={{ uri: item.uri || item }}
                                    resizeMode="cover"
                                    style={styles.profileImg}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            {
                data?.message ?
                    <>
                        <Text style={styles.text}>{data?.message}</Text>

                    </>
                    : null
            }
            <View style={styles.actionsWrapper}>
                <Text style={styles.time}>{sentTime}</Text>
            </View>
        </View >
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(MediaChatCard);

