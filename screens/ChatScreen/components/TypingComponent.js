import { ActivityIndicator, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { typingComponentStyles as _styles } from "../../../styles/ChatScreen/main";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

const TypingComponent = (props) => {
    let {sendingMessageLoading, messageText, pickImage, onSend, setMessageText } = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });

    return (
        <View style={styles.container}>
            <View style={styles.actionsWrapper}>
                <TouchableOpacity style={styles.sendBtn} onPress={pickImage}>
                    <Entypo name="camera" size={RFValue(14)} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
                <TextInput
                    multiline
                    style={styles.inputField}
                    placeholder="Aa"
                    placeholderTextColor="#6F7175"
                    value={messageText}
                    onChangeText={(val) => setMessageText(val)}
                />
                <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
                    {
                        sendingMessageLoading ?
                            <ActivityIndicator size="small" color="#fff" />
                            :
                            <FontAwesome name="send" size={RFValue(12)} color="#fff" />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(TypingComponent);
