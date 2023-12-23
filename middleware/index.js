import { Share, useWindowDimensions } from "react-native";
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { SignOut } from "../state-management/actions/auth";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

export const FontsConfig = {
  Bold: require("../assets/fonts/SF-Pro-Text-Bold.ttf"),
  Light: require("../assets/fonts/SF-Pro-Text-Light.ttf"),
  Medium: require("../assets/fonts/SF-Pro-Text-Medium.ttf"),
  Regular: require("../assets/fonts/SF-Pro-Text-Regular.ttf"),
  SemiBold: require("../assets/fonts/SF-Pro-Text-Semibold.ttf"),
};

export const get12FormatTime = (time) => {
  const timeString12hr = new Date(
    "1970-01-01T" + time + "Z"
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  return timeString12hr;
};

export const MenuItems = [
  {
    icon: "addPath",
    Title: "Demo",
  },
];

export const getDimension = () => {
  let { width, height } = useWindowDimensions();
  return { width, height };
};

export const getPercent = (percent, total) => {
  return (percent / 100) * total;
};

export const Calendar = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
};

export const toSeconds = (hours, minutes, seconds) => {
  return hours * 3600 + minutes * 60 + seconds;
};

export const toHMS = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(11, 19);
};

export const toHMS_OBJ = (seconds) => {
  let time = new Date(seconds * 1000).toISOString().slice(11, 19);
  let newObj = time.split(":");
  return { hours: newObj[0], minutes: newObj[1], seconds: newObj[2] };
};

export const settingsOptions = [
  {
    title: "Change Bio",
    slug: "Tell us about yourself.",
    icon: <Entypo name="users" size={RFValue(15)} color="#fff" />,
    onPress: (props) => props?.navigation.navigate("ChangeBio")
  },
  {
    title: "Change Password",
    slug: "Secure your account.",
    icon: <Entypo name="lock" size={RFValue(15)} color="#fff" />,
    onPress: (props) => props?.navigation.navigate("ChangePassword")
  },
  {
    title: "Email Address",
    slug: null,
    icon: <Entypo name="email" size={RFValue(15)} color="#fff" />,
    onPress: () => null
  },
  {
    title: "Invite Friends",
    slug: "Bring your friends to real world.",
    icon: <Entypo name="share" size={RFValue(15)} color="#fff" />,
    onPress: async () => {
      try {
        const result = await Share.share({
          message:
            'Mentos Messenger connect to real world.',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  },

  {
    title: "Contact Support",
    slug: "24/7 Available for you.",
    icon: <MaterialIcons name="support-agent" size={RFValue(20)} color="#fff" />,
    onPress: () => alert("Not available at the moment.")
  },
  {
    title: "Logout",
    slug: "See you later.",
    icon: <AntDesign name="logout" size={RFValue(15)} color="#fff" />,
    onPress: (props) => props?.SignOut()
  },
]

export const getSentTimeFormat = (time) => {
  let splittedTime = time.split(":")
  let _hours = splittedTime[0]
  let _minutes = splittedTime[1]
  let _zone = splittedTime[2].slice(3)

  return _hours + ":" + _minutes + " " + _zone
}

// declare all characters
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomString = (length) => {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


export const firebaseImageUpload = (url, name, setImageUploadProgress) => {
  return new Promise(async (resolve, reject) => {
    try {
      let imageId = generateRandomString(30);
      const storage = getStorage();
      const response = await fetch(url);
      const blob = await response.blob();
      const storageRef = ref(storage, name ? name : imageId + ".jpg");
      const uploadTask = uploadBytesResumable(storageRef, blob);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(parseInt(progress))
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject({ msg: error.message, code: 500 });
          switch (error.code) {
            case "storage/unauthorized":
              console.log("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              console.log("User canceled the upload");
              break;
            case "storage/unknown":
              console.log(
                "Unknown error occurred, inspect error.serverResponse"
              );
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({ url: downloadURL, code: 200 });
            console.log("File available at", downloadURL);
            //perform your task
          });
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};