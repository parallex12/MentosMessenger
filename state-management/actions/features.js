import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { GET_ALL_CHATS, GET_ALL_CONTACTS, GET_ALL_USERS, GET_ERRORS, GET_USER_DETAILS } from "../types/types";
import { getAuth } from "firebase/auth";
import { firebaseImageUpload } from "../../middleware";

export const getAllUsers = (setLoading) => async (dispatch) => {
    try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "users"));
        let arr = []
        querySnapshot.forEach((doc) => {
            let d = doc.data()
            d["id"] = doc.id
            arr.push(d)
        });
        setLoading(false)
        dispatch({ type: GET_ALL_USERS, payload: arr })
    } catch (e) {
        console.log(e.message);
        setLoading(false)
        dispatch({ type: GET_ERRORS, payload: e.message });
    }
};

export const updateUser = (data, id) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = getFirestore();
            const userRef = doc(db, "users", id);
            await updateDoc(userRef, data);
            resolve("Updated")
        } catch (e) {
            console.log(e.message);
            reject(e)
            dispatch({ type: GET_ERRORS, payload: e.message });
        }
    })
};

export const getCurrentUser = (setLoading) => async (dispatch) => {
    try {
        const db = getFirestore();
        const user = getAuth().currentUser
        const docRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            dispatch({ type: GET_USER_DETAILS, payload: docSnap.data() })
        } else {
            console.log("No such document!");
        }
        setLoading(false)
    } catch (e) {
        console.log(e.message);
        setLoading(false)
        dispatch({ type: GET_ERRORS, payload: e.message });
    }
};

export const getAnyUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                resolve({ ...docSnap.data(), id: docSnap?.id })
            } else {
                reject(404)
                console.log("No such document!");
            }


        } catch (e) {
            reject(e)
        }
    })
};

export const getUpdatesOnContacts = () => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            return new Promise(async (resolve, reject) => {
                try {
                    const db = getFirestore();
                    const user = getAuth().currentUser
                    const q = query(collection(db, "users"), where("contacts", "array-contains", user?.uid));
                    const unsubscribe = onSnapshot(q, (querySnapshot) => {
                        let data = [];
                        querySnapshot.forEach((doc) => {
                            let d = { ...doc.data(), id: doc.id }
                            data.push(d);
                        });
                        resolve(data)
                        dispatch({ type: GET_ALL_CONTACTS, payload: data })
                    });

                } catch (e) {
                    console.log(e.message);
                    reject(e)
                    dispatch({ type: GET_ERRORS, payload: e.message });
                }
            })
        } catch (e) {
            reject(e)
        }
    })
};


export const searchAgent = (id, setLoading) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = getFirestore();
            const q = query(collection(db, "users"), where("agentId", "==", id));
            const querySnapshot = await getDocs(q);
            let arr = []
            querySnapshot.forEach((doc) => {
                let d = doc.data()
                d["id"] = doc.id
                arr.push(d)
            });
            resolve(arr)
            setLoading(false)
        } catch (e) {
            console.log(e.message);
            reject(e)
            setLoading(false)
            dispatch({ type: GET_ERRORS, payload: e.message });
        }
    })
};

export const getRelation = (users) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = getFirestore();
            const chatRef = collection(db, "chats");
            const q = query(chatRef, where('users', 'array-contains-any', [users[0], users[1]]));
            const querySnapshot = await getDocs(q);
            if (querySnapshot?.size > 0) {
                querySnapshot.forEach((doc) => {
                    resolve({ id: doc.id, data: doc.data() })
                });
            } else {
                resolve(404)
            }
        } catch (e) {
            console.log(e.message);
            reject(e)
            dispatch({ type: GET_ERRORS, payload: e.message });
        }
    })
};

export const sendMessage = (data, id) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = getFirestore();
            const chatRef = doc(db, "chats", id);
            await updateDoc(chatRef, data)
                .then((res) => {
                    resolve(res)
                })
                .catch((e) => {
                    reject(e)
                })
        } catch (e) {
            console.log(e.message);
            reject(e)
            dispatch({ type: GET_ERRORS, payload: e.message });
        }
    })
};

export const updateStatus = (data, id) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = getFirestore();
            const chatRef = doc(db, "chats", id);
            await updateDoc(chatRef, data)
                .then((res) => {
                    resolve(res)
                })
                .catch((e) => {
                    reject(e)
                })
        } catch (e) {
            console.log(e.message);
            reject(e)
            dispatch({ type: GET_ERRORS, payload: e.message });
        }
    })
};

export const getMyChats = () => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = getFirestore();
            const user = getAuth().currentUser
            const q = query(collection(db, "chats"), where("JoinedUsers", "array-contains", user?.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let data = [];
                querySnapshot.forEach((doc) => {
                    let d = { ...doc.data(), id: doc.id }
                    data.push(d);
                });
                resolve(data)
                dispatch({ type: GET_ALL_CHATS, payload: data })
            });

        } catch (e) {
            console.log(e.message);
            reject(e)
            dispatch({ type: GET_ERRORS, payload: e.message });
        }
    })
};

export const createRelation = (data) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = getFirestore();
            const docRef = await addDoc(collection(db, "chats"), data);
            const userRef1 = doc(db, "users", data?.reciever_details?.id);
            const userRef2 = doc(db, "users", data?.sender_details?.id);
            let r_contacts=data?.reciever_details?.contacts || []
            let s_contacts=data?.data?.sender_details?.contacts || []
            await updateDoc(userRef1, { contacts: [...r_contacts, data?.sender_details?.id] })
            await updateDoc(userRef2, { contacts: [...s_contacts, data?.reciever_details?.id] })

            if (docRef?.id) {
                resolve(docRef.id)
            } else {
                reject(null)
            }
        } catch (e) {
            console.log(e.message);
            reject(e)
            dispatch({ type: GET_ERRORS, payload: e.message });
        }
    })
};