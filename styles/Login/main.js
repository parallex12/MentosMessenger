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
      height: getPercent(20, height),
    },
    content: {
      flex: 1,
      paddingTop: getPercent(12, height),
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
      fontSize: rf(35),
      fontFamily: "Bold",
      color: "#011A51",
      alignSelf: 'flex-start',
      lineHeight: rf(35),
      marginBottom: getPercent(1, height)
    }
  });
