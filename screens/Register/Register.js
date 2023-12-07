import { ActivityIndicator, Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/Register/main";
import TextField from "../../globalComponents/TextField";
import StandardButton from "../../globalComponents/StandardButton";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SignUp } from "../../state-management/actions/auth";

const Register = (props) => {
  let { } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState(
    {
      email: null,
      password: null,
      phone: null,
      name: null,
      type:"user"
    }
  )

  const onSubmit = () => {
    if (!Object.values(form)?.includes(null)) {
      if (form?.password == confirmPassword) {
        setLoading(true)
        props?.SignUp(form, setLoading,props?.navigation)
      } else {
        alert("Passwor doesn't match.")
      }
    } else {
      alert("Fill all details.")
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
          <Text style={styles.titleText}>Register Now</Text>
          <TextField placeholder="Name" onChangeText={(val) => setForm((prev) => { return { ...prev, name: val } })} />
          <TextField placeholder="Email" onChangeText={(val) => setForm((prev) => { return { ...prev, email: val } })} />
          <TextField placeholder="Phone"
            onChangeText={(val) => setForm((prev) => { return { ...prev, phone: val } })}
            keyboardType="number-pad"
          />
          <TextField
            placeholder="Password"
            onChangeText={(val) => setForm((prev) => { return { ...prev, password: val } })}
            secureTextEntry
          />
          <TextField
            placeholder="Confirm Password"
            onChangeText={(val) => setConfirmPassword(val)}
            secureTextEntry
          />
          <StandardButton
            title={loading ? <ActivityIndicator color="#fff" size="small" /> : "Register"}
            onPress={onSubmit}
          />
          <StandardButton title="Login" onPress={() => props?.navigation.navigate("Login")} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, { SignUp })(Register);
