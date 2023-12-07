import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";

//container Styles starts here
export const styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: getPercent(10, height),
      paddingHorizontal: getPercent(5, width)
    },
    logoWrapper: {
      width: getPercent(80, width),
      height: getPercent(15, height)
    },
    content: {
      flex: 1,
      paddingTop: getPercent(5, height),
      paddingVertical: getPercent(2, height),
      alignItems: 'center',
      justifyContent: 'center',
    },
    forgotWrapper: {
      alignSelf: 'flex-end',
      marginBottom: getPercent(5, height),

    },
    forgotText: {
      fontSize: rf(12),
      fontFamily: "Medium",
      color: "#222",
      textDecorationLine: 'underline',
    },
    titleText: {
      fontSize: rf(25),
      fontFamily: "Bold",
      color: "#011A51",
      alignSelf: 'flex-start',
      lineHeight: rf(25),
      marginBottom: getPercent(2, height)
    }
  });
