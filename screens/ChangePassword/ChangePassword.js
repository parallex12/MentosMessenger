import { ActivityIndicator, Text, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/ChangePassword/main";
import Header from "../Home/components/Header";
import TextField from "../../globalComponents/TextField";
import StandardButton from "../../globalComponents/StandardButton";
import { useState } from "react";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { updateUser } from "../../state-management/actions/features";
import { SignOut } from "../../state-management/actions/auth";

const ChangePassword = (props) => {
    let { } = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });
    const [loading, setLoading] = useState(false)
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const user = getAuth().currentUser;

    const onSubmit = () => {
        if (loading) return
        if (oldPass?.length > 0 && newPass?.length > 0 && confirmPass?.length > 0) {

            if (newPass == confirmPass) {
                setLoading(true)
                _updateUserPassword(newPass).then(() => {
                    props?.updateUser({ password: newPass }, user?.uid)
                        .then((res) => {
                            alert("Password Updated, Login to refresh.")
                            setLoading(false)
                            props?.SignOut()
                        }).catch((error) => {
                            _updateUserPassword(oldPass)
                            setLoading(false)
                            alert("Something went wrong try again")
                        });
                }).catch((error) => {
                    setLoading(false)
                });

            } else {
                alert("Password doen't match.")
            }

        } else {
            alert("Fill add details.")
        }
    }

    const _updateUserPassword = (pass) => {
        return new Promise((resolve, reject) => {
            const credential = EmailAuthProvider.credential(
                props?.get_user_details?.email,
                oldPass
            );
            reauthenticateWithCredential(user, credential).then((res) => {
                updatePassword(user, pass).then(() => {
                    resolve(200)
                }).catch((error) => {
                    console.log(error)
                    alert("Something went wrong try again")
                    reject("Something went wrong try again")
                });
            }).catch((error) => {
                alert("Your old password is incorrect.")
                reject("Something went wrong try again")
            });

        })
    }

    return (
        <View style={styles.container}>
            <Header title="Change Password" />
            <View style={styles.content}>
                <TextField placeholder="Old Password" secureTextEntry onChangeText={(val) => setOldPass(val)} />
                <TextField placeholder="New Password" secureTextEntry onChangeText={(val) => setNewPass(val)} />
                <TextField placeholder="Confirm New Password" secureTextEntry onChangeText={(val) => setConfirmPass(val)} />
                <StandardButton
                    title={loading ? <ActivityIndicator size="small" color="#fff" /> : "Change"}
                    onPress={onSubmit}
                />
            </View>
        </View>
    )
};

const mapStateToProps = (state) => ({
    errors: state.errors.errors,
    get_user_details: state.main.get_user_details,

});
export default connect(mapStateToProps, { updateUser, SignOut })(ChangePassword);
