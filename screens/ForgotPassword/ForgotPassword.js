import { ActivityIndicator, Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/ForgotPassword/main";
import TextField from "../../globalComponents/TextField";
import StandardButton from "../../globalComponents/StandardButton";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

const ForgotPassword = (props) => {
  let { } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(false)
  const auth = getAuth();

  const onSubmit = async () => {
    if (email?.length > 0) {
      setLoading(true)
      const db = getFirestore();
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {

        sendPasswordResetEmail(auth, email)
          .then(() => {
            alert("Reset password link has been sent to your email.")
            setEmail(null)
            setLoading(false)
            props?.navigation.goBack()
          })
          .catch((error) => {
            setLoading(false)
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            alert("Something went wrong try again")
          });
      }else{
        setLoading(false)
        alert("Account not found with this email.")
      }
    } else {
      alert("Enter email address.")
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
          <Text style={styles.titleText}>Recover Password.</Text>
          <TextField placeholder="Email" onChangeText={(val) => setEmail(val)} />

          <StandardButton title={loading ? <ActivityIndicator size="small" color="#fff" /> : "Reset"} onPress={onSubmit} />
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
