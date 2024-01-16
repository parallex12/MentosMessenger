import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { AppNavigator } from "./routes/AppNavigator";
import { useFonts } from "expo-font";
import store from "./state-management/store";
import "react-native-gesture-handler";
import { FontsConfig } from "./middleware";
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, LogBox, View } from 'react-native';
import "react-native-gesture-handler";
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import firebase from "firebase/compat/app";
import {
  onAuthStateChanged,
  getReactNativePersistence,
  initializeAuth,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UnAuthNavigator } from "./routes/UnAuthNavigator";
import { firebaseConfig } from "./firebaseConfig";
import { styles } from "./styles/Home/main";
import { _sendEmailVerification } from "./state-management/actions/auth";
import { AdminNavigator } from "./routes/AdminNavigator";
import { loaderStyles } from "./styles/Global/main";

export default function App() {
  const [fontsLoaded] = useFonts(FontsConfig);
  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      (async () => {
        // Initialize Firebase
        if (!firebase.apps.length) {
          const a = firebase.initializeApp(firebaseConfig);
          const auth = initializeAuth(a, {
            persistence: getReactNativePersistence(AsyncStorage),
          });
          const storage = getStorage(a);
          onAuthStateChanged(auth, (user) => {
            if (user) {
              setLoading(true)
              if (user?.email == "superadmin11@mentos.com") {
                setUserStatus("admin");
                setLoading(false)
                return
              }
              if (user?.emailVerified) {
                setUserStatus(true);
                setLoading(false)
              } else {
                setLoading(false)
                setUserStatus(null)
              }
            } else {
              console.log(auth);
              setUserStatus(null);
              setLoading(false)
            }
          });
        }
      })();
    } catch (e) {
      setLoading(false)
      console.log(e.message);
    }
  }, [])

  if (!fontsLoaded) {
    return <View style={loaderStyles()?.container}>
      <ActivityIndicator size="large" color="#222" />
    </View>;
  }
  if (loading) {
    return <View style={loaderStyles()?.container}>
      <ActivityIndicator size="large" color="#222" />
    </View>;
  }


  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      {userStatus == "admin" ? <AdminNavigator /> : userStatus ? <AppNavigator /> : <UnAuthNavigator />}
    </Provider>
  );
}
