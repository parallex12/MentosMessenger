import { ActivityIndicator, Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { recieverCardStyles as _styles } from "../../../styles/ChatScreen/main";
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { getSentTimeFormat } from "../../../middleware";
import { useState } from "react";
import { loaderStyles } from "../../../styles/Global/main";

const RecieverCard = (props) => {
    let { data, setImageViewer, image } = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });
    let navigation = useNavigation()
    let sentTime = getSentTimeFormat(data?.created_at)
    const [imageLoader, setImageLoader] = useState(true)
    return (
        <View style={styles.container}>
            <View style={styles.boxWrapper}>

                {
                    image ?
                        <TouchableOpacity style={styles.imageWrapper} onPress={() => setImageViewer(data?.liveImage)}>
                            {imageLoader &&
                                <ActivityIndicator size="small" color="#fff" />
                            }
                            <Image
                                source={{ uri: data?.liveImage }}
                                resizeMode="cover"
                                style={styles.profileImg}
                                onLoad={() => setImageLoader(false)}
                            />
                        </TouchableOpacity>
                        :
                        <Text style={styles.text}>{data?.message}</Text>
                }
            </View>
            <View style={styles.actionsWrapper}>
                <Text style={styles.time}>{sentTime}</Text>
            </View>
        </View>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(RecieverCard);
