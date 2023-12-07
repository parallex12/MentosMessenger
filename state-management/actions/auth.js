import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { GET_ALL_CHATS, GET_ALL_CONTACTS, GET_ALL_USERS, GET_ERRORS, GET_USER_DETAILS } from "../types/types";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const SignUp = (data, setLoading, navigation) => async (dispatch) => {
    try {
        const auth = getAuth();
        const db = getFirestore();
        createUserWithEmailAndPassword(auth, data?.email, data?.password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await setDoc(doc(db, "users", user?.uid), data)
                    .then((res) => {
                        console.log("Welcome !!");
                        setLoading(false)
                        navigation.goBack()
                    })
                    .catch((error) => {
                        setLoading(false);
                        const errorMessage = error.message;
                        dispatch({ type: GET_ERRORS, payload: errorMessage });
                    });
            })
            .catch((error) => {
                setLoading(false);
                const errorMessage = error.message;
                console.log(errorMessage);
                dispatch({ type: GET_ERRORS, payload: errorMessage });
                let err = errorMessage.indexOf("/");
                let fErr = errorMessage.slice(err + 1, errorMessage.length - 2);
                if (fErr == "email-already-in-use") {
                    alert("Email already in use");
                }
            });
    } catch (e) {
        setLoading(false);
        dispatch({ type: GET_ERRORS, payload: e.message });
        console.log(e.message);
    }
};

export const LoginWithEmailPass = (data, setLoading) => async (dispatch) => {
    try {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, data?.email, data?.password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                const errorMessage = error.message;
                dispatch({ type: GET_ERRORS, payload: errorMessage });
                alert("Email or password is incorrect.");
            });
    } catch (e) {
        setLoading(false);
        console.log(e);
        dispatch({ type: GET_ERRORS, payload: e.message });
    }
};

export const ResetPasswordWithCredentials =
    (data, newPassword, setLoading) => async (dispatch) => {
        try {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, data?.email, data?.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updatePassword(user, newPassword)
                        .then(() => {
                            alert("Password updated");
                        })
                        .catch((error) => {
                            alert("Something went wrong!");
                        });
                })
                .catch((error) => {
                    setLoading(false);
                    const errorMessage = error.message;
                    dispatch({ type: GET_ERRORS, payload: errorMessage });
                    alert("Email or password is incorrect !");
                });
        } catch (e) {
            setLoading(false);
            dispatch({ type: GET_ERRORS, payload: e.message });
        }
    };

export const SignOut = () => async (dispatch) => {
    try {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                dispatch({ type: GET_USER_DETAILS, payload: null });
                dispatch({ type: GET_ALL_CHATS, payload: null });
                dispatch({ type: GET_ALL_USERS, payload: null });
                dispatch({ type: GET_ALL_CONTACTS, payload: null });
            })
            .catch((e) => {
                console.log(e.message);
            });
    } catch (e) {
        console.log(e.message);
        dispatch({ type: GET_ERRORS, payload: e.message });
    }
};


export const _sendEmailVerification = async (user) => {
    await sendEmailVerification(user)
        .then((res) => {
            alert("Verification Email sent, Please verify your email.");
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
};