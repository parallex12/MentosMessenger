import { ActivityIndicator, Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/Login/main";
import TextField from "../../globalComponents/TextField";
import StandardButton from "../../globalComponents/StandardButton";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LoginWithEmailPass } from "../../state-management/actions/auth";
import { getAuth } from "firebase/auth";

const Login = (props) => {
  let { } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(
    {
      email: null,
      password: null
    }
  )

  const onSubmit = () => {
    if (!Object.values(form)?.includes(null)) {
      setLoading(true)
      props?.LoginWithEmailPass(form, setLoading)
    } else {
      alert("Enter email and password.")
    }
  }



  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView >

        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/mantosLogo.png")}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.titleText}>Login To Your Account.</Text>
          <TextField placeholder="Email" onChangeText={(val) => setForm((prev) => { return { ...prev, email: val?.toLowerCase() } })} />
          <TextField
            placeholder="Password"
            onChangeText={(val) => setForm((prev) => { return { ...prev, password: val } })}
            secureTextEntry
          />
          <TouchableOpacity style={styles.forgotWrapper} onPress={() => props?.navigation.navigate("ForgotPassword")}>
            <Text style={styles.forgotText}>Forgot Password ?</Text>
          </TouchableOpacity>
          <StandardButton
            title={loading ? <ActivityIndicator color="#fff" size="small" /> : "Login"}
            onPress={onSubmit}
          />
          <StandardButton title="Register" onPress={() => props?.navigation.navigate("Register")} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};


const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, { LoginWithEmailPass })(Login);
