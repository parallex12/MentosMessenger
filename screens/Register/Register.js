import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/Register/main";
import TextField from "../../globalComponents/TextField";
import StandardButton from "../../globalComponents/StandardButton";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SignUp } from "../../state-management/actions/auth";
import store from "../../state-management/store";
import Checkbox from "expo-checkbox";
import * as Linking from "expo-linking"; // Import the Linking API

const Register = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userAgreement, setUserAgreement] = useState(false);

  const [form, setForm] = useState({
    email: null,
    password: null,
    name: null,
    type: "user",
    status:"active"
  });

  const onSubmit = () => {
    if (!Object.values(form)?.includes(null)) {
      if (form?.password == confirmPassword) {
        setLoading(true);
        props
          ?.SignUp(form)
          .then((res) => {
            setLoading(false);
            console.log("Welcome");
            props?.navigation.goBack();
          })
          .catch((e) => {
            setLoading(false);
            console.log("this is", e);
          });
      } else {
        alert("Passwor doesn't match.");
      }
    } else {
      alert("Fill all details.");
    }
  };

  const onTermsPress = () => {
    Linking.openURL(
      "https://www.termsandconditionsgenerator.com/live.php?token=ftxpxjEZxkKFz9KKt8G8HAyaIGXmcO5F"
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/mantosLogo.png")}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.titleText}>Register Now</Text>
          <TextField
            placeholder="Name"
            onChangeText={(val) =>
              setForm((prev) => {
                return { ...prev, name: val };
              })
            }
          />
          <TextField
            placeholder="Email"
            onChangeText={(val) =>
              setForm((prev) => {
                return { ...prev, email: val?.toLowerCase() };
              })
            }
          />

          <TextField
            placeholder="Password"
            onChangeText={(val) =>
              setForm((prev) => {
                return { ...prev, password: val };
              })
            }
            secureTextEntry
          />
          <TextField
            placeholder="Confirm Password"
            onChangeText={(val) => setConfirmPassword(val)}
            secureTextEntry
          />
          {/* Create checkbox here */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={userAgreement}
              onValueChange={setUserAgreement}
              color="#011A51"
            />
            <TouchableOpacity onPress={onTermsPress}>
              <Text style={styles.label}>
                I agree to the terms and conditions
              </Text>
            </TouchableOpacity>
          </View>
          <StandardButton
            title={
              loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                "Register"
              )
            }
            onPress={onSubmit}
          />
          <StandardButton
            title="Login"
            onPress={() => props?.navigation.navigate("Login")}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, { SignUp })(Register);
