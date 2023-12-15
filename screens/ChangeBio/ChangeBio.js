import { ActivityIndicator, Text, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/ChangePassword/main";
import Header from "../Home/components/Header";
import TextField from "../../globalComponents/TextField";
import StandardButton from "../../globalComponents/StandardButton";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { updateUser, getCurrentUser } from "../../state-management/actions/features";

const ChangeBio = (props) => {
    let { } = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [address, setAddress] = useState(null)

    const user = getAuth().currentUser;


    useEffect(() => {
        setName(props?.get_user_details?.name)
        setPhone(props?.get_user_details?.phone)
        setAddress(props?.get_user_details?.address)
    }, [props?.get_user_details])

    const onSubmit = () => {
        if (loading) return
        setLoading(true)
        let data = { name, phone, address }
        props?.updateUser(data, user?.uid)
            .then((res) => {
                props?.getCurrentUser(setLoading)
                alert("Bio Updated")
                setLoading(false)
            }).catch((error) => {
                console.log(error)
                setLoading(false)
                alert("Something went wrong try again")
            });
    }

    return (
        <View style={styles.container}>
            <Header title="Change Bio" />
            <View style={styles.content}>
                <TextField
                    placeholder="Name"
                    onChangeText={(val) => setName(val)}
                    value={name}
                />
                <TextField
                    placeholder="Phone"
                    value={phone}
                    onChangeText={(val) => setPhone(val)}
                />
                <TextField
                    placeholder="Address"
                    value={address}
                    onChangeText={(val) => setAddress(val)}
                />

                <StandardButton
                    title={loading ? <ActivityIndicator size="small" color="#fff" /> : "Save"}
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
export default connect(mapStateToProps, { updateUser,getCurrentUser })(ChangeBio);
