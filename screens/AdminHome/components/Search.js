import { Image, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { searchStyles as _styles } from "../../../styles/Home/main";
import { Entypo } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from '@expo/vector-icons';

const Search = (props) => {
    let { inputStyles } = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });

    return (
        <View style={styles.container}>
            <Ionicons name="search" size={RFValue(13)} color="#979797" />
            <TextInput {...props}
                style={[styles.inputCont, inputStyles]}
                placeholder="Search #67868"
                placeholderTextColor="#979797"
            />
        </View>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(Search);
