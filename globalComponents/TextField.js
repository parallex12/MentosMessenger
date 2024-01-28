import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { textFieldStyles } from "../styles/Global/main";
import { RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

const TextField = (props) => {
  let { containerStyles, inputStyles, title } = props;
  let { width, height } = useWindowDimensions();
  let styles = textFieldStyles({ width, height });
  const [showPass, setShowPass] = useState(props?.secureTextEntry);

  return (
    <View style={[styles.container, containerStyles]}>
      <TextInput
        {...props}
        secureTextEntry={showPass}
        style={[styles.inputCont, inputStyles]}
      />
      {props?.secureTextEntry && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPass(!showPass)}
        >
          <Feather
            name={!showPass ? "eye-off" : "eye"}
            size={RFValue(15)}
            color="black"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(TextField);
