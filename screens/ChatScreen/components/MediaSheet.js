import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { mediaSheetStyles as _styles } from "../../../styles/ChatScreen/main";
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useMemo, useRef } from "react";
import { AntDesign } from '@expo/vector-icons';

const MediaSheet = (props) => {
    let { imageUploadProgress, image, setImage } = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });
    let navigation = useNavigation()

    const onDelete = () => {
        setImage(null)
    }

    return (
        <View style={styles.container}>
            <View style={styles.imgWrapper}>
                <Image
                    source={{ uri: image }}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                />
                <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete()}>
                    <AntDesign name="delete" size={RFValue(13)} color="#fff" />
                </TouchableOpacity>
            </View>

            <Text>{`Uploading ${imageUploadProgress || 0}%`}</Text>
        </View>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(MediaSheet);
