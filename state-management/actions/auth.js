import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import {
  deleteField,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  GET_ALL_CHATS,
  GET_ALL_CONTACTS,
  GET_ALL_USERS,
  GET_ERRORS,
  GET_USER_DETAILS,
} from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SignUp = (data, setLoading, navigation) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      const auth = getAuth();
      const db = getFirestore();
      createUserWithEmailAndPassword(auth, data?.email, data?.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await setDoc(doc(db, "users", user?.uid), data)
            .then((res) => {
              _sendEmailVerification(user);
              resolve(200);
            })
            .catch((error) => {
              reject("Error in firestore");
              const errorMessage = error.message;
              dispatch({ type: GET_ERRORS, payload: errorMessage });
            });
        })
        .then((res) => {
          console.log("Second then", res);
          signOut(auth);
        })
        .catch((error) => {
          const errorMessage = error.message;
          dispatch({ type: GET_ERRORS, payload: errorMessage });
          let err = errorMessage.indexOf("/");
          let fErr = errorMessage.slice(err + 1, errorMessage.length - 2);
          if (fErr == "email-already-in-use") {
            alert("Email already in use");
          }
          reject(errorMessage);
        });
    } catch (e) {
      reject(e.message);
      dispatch({ type: GET_ERRORS, payload: e.message });
    }
  });
};

export const LoginWithEmailPass = (data, setLoading) => async (dispatch) => {
  try {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data?.email, data?.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user?.emailVerified && user?.email != "superadmin11@mentos.com") {
          _sendEmailVerification(user);
        }
        setLoading(false);
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

export const DeleteAccount = () => async (dispatch) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();

    const userRef = doc(db, "users", user?.uid);
    deleteUser(user)
      .then(async () => {
        await updateDoc(userRef, {
          contacts: deleteField(),
          email: deleteField(),
          phone: deleteField(),
          profile: deleteField(),
          name: deleteField(),
          accountStatus: "deleted",
        })
          .then((res) => {
            alert("Account deleted.");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    console.log(e.message);
    alert(
      "This action requires you to log in again. Please log out and log back in to continue."
    );
    signOut(auth);

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
      console.log("Verification", errorMessage);
    });
};
