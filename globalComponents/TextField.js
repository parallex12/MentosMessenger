import { Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { textFieldStyles } from "../styles/Global/main";

const TextField = (props) => {
  let { containerStyles, inputStyles, title } = props;
  let { width, height } = useWindowDimensions();
  let styles = textFieldStyles({ width, height });

  return (
    <View
      style={[styles.container, containerStyles]}
    >
      <TextInput {...props} style={[styles.inputCont, inputStyles]} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(TextField);
