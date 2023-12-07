import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/ForgotPassword/main";
import TextField from "../../globalComponents/TextField";
import StandardButton from "../../globalComponents/StandardButton";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotPassword = (props) => {
  let { } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [form, setForm] = useState(
    {
      email: null
    }
  )

  const onSubmit = () => {
    if (!Object.values(form)?.includes(null)) {

    } else {
      alert("Enter email address.")
    }
  }



  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView >

        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/logo.png")}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.titleText}>Recover Password.</Text>
          <TextField placeholder="Email" onChangeText={(val) => setForm((prev) => { return { ...prev, email: val } })} />

          <StandardButton title="Submit" onPress={onSubmit} />
          <StandardButton title="Login" onPress={() => props?.navigation.navigate("Login")} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(ForgotPassword);
