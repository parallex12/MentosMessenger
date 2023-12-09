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
            {
                image?.map((item, index) => {
                    return <View style={styles.itemWrapper} key={index}>
                        <View style={styles.imgWrapper}>
                            <Image
                                source={{ uri: item.uri }}
                                resizeMode="cover"
                                style={{ width: '100%', height: '100%' }}
                            />
                            <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete()}>
                                <AntDesign name="delete" size={RFValue(13)} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        {/* <Text>{`Uploading ${imageUploadProgress || 0}%`}</Text> */}
                        <View style={styles.progressWrapper}>
                            <View
                                style={
                                    [
                                        styles.progressBar,
                                        {
                                            width: `${imageUploadProgress ? imageUploadProgress : 0}%`
                                        }
                                    ]
                                }
                            >

                            </View>
                        </View>
                    </View>
                })
            }
        </View>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(MediaSheet);
