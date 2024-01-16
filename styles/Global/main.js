import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

//standardButton Styles starts here
export const standardButtonStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: getPercent(90, width),
      height: getPercent(5.5, height),
      backgroundColor: "#011A51",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: getPercent(1, height)
    },
    text: {
      fontSize: rf(14),
      fontFamily: "Medium",
      color: "#ffffff",
    },
  });

//loader Styles starts here
export const loaderStyles = () =>
  StyleSheet.create({
    container: {
      width: wp('100%'),
      height: hp('100%'),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      position: "absolute",
      left: 0,
      zIndex: 9999999,
    },
  });

//loader OpacityStyles starts here
export const loaderStylesOpacity = () =>
  StyleSheet.create({
    container: {
      width: wp('100%'),
      height: hp('100%'),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.4)",
      position: "absolute",
      left: 0,
      zIndex: 9999999,
    },
  });

//textFieldStyles  starts here
export const textFieldStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: getPercent(90, width),
      height: getPercent(6, height),
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "rgba(24,24,24,0.2)",
      backgroundColor: "rgba(250,250,250,0.3)",
      paddingHorizontal: getPercent(3, width),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: getPercent(1, height)
    },
    inputCont: {
      width: '90%',
      height: '100%',
      fontSize: rf(12),
      color: '#222',
      fontFamily: 'Medium'
    },
    eyeIcon:{
      padding:5
    }
  });

//bottomMenuStyles  starts here
export const bottomMenuStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: getPercent(10, height),
      backgroundColor: "#ffffff",
      position: 'absolute',
      bottom: 0,
      paddingVertical: getPercent(2, height),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 3.41,
      elevation: 5,

    },
    actionBtn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionBtnText: {
      fontSize: rf(12),
      color: '#133581',
      fontFamily: 'Medium',
      marginTop: 2
    },
    actionBtnText2: {
      fontSize: rf(12),
      color: '#A4AAB2',
      fontFamily: 'Medium',
      marginTop: 2
    }
  });