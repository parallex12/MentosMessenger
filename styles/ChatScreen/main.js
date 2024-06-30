import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";

//container Styles starts here
export const styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    content: {
      flex: 1,
      paddingHorizontal: getPercent(3, width),
      paddingVertical: getPercent(2, height),
      alignItems: "flex-start",
      justifyContent: "center",
    },
    imageViewer: {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 999999999,
      backgroundColor: "rgba(0,0,0,0.8)",
      alignItems: "center",
      justifyContent: "center",
    },
    issueBar: {
      paddingHorizontal:getPercent(10,width),
      position: "absolute",
      bottom: getPercent(3, height),
      height: getPercent(3, height),
      alignSelf: "center",
      backgroundColor: "#e5e5e5",
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center',
      padding:5,
      opacity:0.8
    },
    issueBarText:{
      fontSize:rf(9),
      color:'#a8a8a8',
      fontFamily:'Medium'
    }
  });

//mediaSheetStyles  starts here
export const mediaSheetStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      minHeight: getPercent(10, height),
      backgroundColor: "#e5e5e5",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: getPercent(3, width),
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingVertical: getPercent(1, height),
      flexWrap: "wrap",
    },
    itemWrapper: {
      width: "33%",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 5,
    },
    imgWrapper: {
      width: getPercent(25, width),
      height: getPercent(8, height),
      borderRadius: 6,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      marginVertical: 5,
      marginHorizontal: 5,
    },
    deleteBtn: {
      width: getPercent(8, width),
      height: getPercent(8, width),
      backgroundColor: "rgba(0,0,0,0.5)",
      borderRadius: 100,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
    progressWrapper: {
      width: "80%",
      height: getPercent(1, height),
      borderRadius: getPercent(10, height),
      backgroundColor: "#c2c2c2",
      overflow: "hidden",
    },
    progressBar: {
      width: "0%",
      height: "100%",
      backgroundColor: "#011A51",
    },
  });

//senderCardStyles  starts here
export const senderCardStyles = ({ width, height }) =>
  StyleSheet.create({
    boxWrapper: {
      minWidth: "10%",
      maxWidth: "80%",
      minHeight: getPercent(5, height),
      borderRadius: 6,
      backgroundColor: "#0584FE",
      paddingHorizontal: getPercent(3, width),
      paddingVertical: getPercent(1, height),
      alignItems: "center",
      justifyContent: "center",
      marginVertical: getPercent(0.5, height),
      alignSelf: "flex-end",
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: getPercent(0.5, height),
      alignSelf: "flex-end",
    },
    actionsWrapper: {
      alignSelf: "flex-end",
      flexDirection: "row",
      alignItems: "center",
    },
    time: {
      fontSize: rf(8),
      fontFamily: "Regular",
      color: "#222",
    },
    text: {
      fontSize: rf(13),
      fontFamily: "Medium",
      color: "#fff",
      lineHeight: 25,
    },
    profileImg: {
      width: "100%",
      height: "100%",
    },
    imageWrapper: {
      width: getPercent(30, width),
      height: getPercent(30, width),
      borderRadius: 10,
      flexDirection: "row",
      overflow: "hidden",
    },
  });

//mediaChatCardStyles  starts here
export const mediaChatCardStyles = ({ width, height }) =>
  StyleSheet.create({
    boxWrapper: {
      maxWidth: "100%",
      minHeight: getPercent(15, height),
      borderRadius: 6,
      alignItems: "center",
      marginVertical: getPercent(0.5, height),
      alignSelf: "flex-end",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    container: {
      maxWidth: "75%",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: getPercent(0.5, height),
      alignSelf: "flex-end",
      borderRadius: 6,
      padding: 5,
      paddingHorizontal: 0,
    },
    actionsWrapper: {
      alignSelf: "flex-end",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    time: {
      fontSize: rf(8),
      fontFamily: "Regular",
      color: "#222",
    },
    text: {
      fontSize: rf(13),
      fontFamily: "Medium",
      color: "#fff",
      alignSelf: "flex-start",
      paddingHorizontal: getPercent(1, width),
    },
    profileImg: {
      width: "100%",
      height: "100%",
    },
    imageWrapper: {
      borderColor: "#0584FE",
      borderWidth: 5,
      flex: 1,
      minWidth: "25%",
      height: getPercent(14, height),
      borderRadius: 10,
      flexDirection: "row",
      overflow: "hidden",
      marginHorizontal: 5,
      marginBottom: 10,
    },
  });

//mediaChatCardRecieverStyles  starts here
export const mediaChatCardRecieverStyles = ({ width, height }) =>
  StyleSheet.create({
    boxWrapper: {
      maxWidth: "100%",
      minHeight: getPercent(15, height),
      borderRadius: 6,
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    container: {
      maxWidth: "75%",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: getPercent(0.5, height),
      alignSelf: "flex-start",
      borderRadius: 6,
      padding: 5,
      paddingHorizontal: 0,
    },
    actionsWrapper: {
      alignSelf: "flex-end",
      flexDirection: "row",
      alignItems: "center",
    },
    time: {
      fontSize: rf(8),
      fontFamily: "Regular",
      color: "#525357",
      paddingHorizontal: 10,
    },
    text: {
      fontSize: rf(13),
      fontFamily: "Medium",
      color: "#525357",
      alignSelf: "flex-start",
      paddingHorizontal: getPercent(1, width),
    },
    profileImg: {
      width: "100%",
      height: "100%",
    },
    imageWrapper: {
      borderColor: "#C2C6CC",
      borderWidth: 5,
      flex: 1,
      minWidth: "25%",
      height: getPercent(14, height),
      borderRadius: 10,
      flexDirection: "row",
      overflow: "hidden",
      marginHorizontal: 5,
      marginBottom: 10,
    },
  });

//recieverCardStyles  starts here
export const recieverCardStyles = ({ width, height }) =>
  StyleSheet.create({
    boxWrapper: {
      minWidth: "10%",
      maxWidth: "80%",
      minHeight: getPercent(5, height),
      borderRadius: 6,
      backgroundColor: "#C2C6CC",
      paddingHorizontal: getPercent(3, width),
      paddingVertical: getPercent(1, height),
      alignItems: "center",
      justifyContent: "center",
      marginVertical: getPercent(0.5, height),
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: getPercent(0.5, height),
    },
    actionsWrapper: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
    },
    time: {
      fontSize: rf(8),
      fontFamily: "Regular",
      color: "#222",
    },
    text: {
      fontSize: rf(13),
      fontFamily: "Medium",
      color: "#525357",
      lineHeight: 25,
    },
    profileImg: {
      width: "100%",
      height: "100%",
    },
    imageWrapper: {
      width: getPercent(30, width),
      height: getPercent(30, width),
      borderRadius: 10,
      overflow: "hidden",
    },
  });

//headerStyles  starts here
export const headerStyles = ({ width, height }) =>
  StyleSheet.create({
    headerWrapper: {
      width: "100%",
      height: getPercent(15, height),
      backgroundColor: "#fff",
      paddingTop: getPercent(5, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(5, width),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      borderBottomWidth: 1,
      borderColor: "#e5e5e5",
    },
    title: {
      fontSize: rf(20),
      fontFamily: "Medium",
      flex: 1,
      paddingHorizontal: 10,
    },
    detailsWrapper: {
      flex: 1,
      paddingHorizontal: getPercent(3, width),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    profile: {
      width: getPercent(5, height),
      height: getPercent(5, height),
      borderRadius: 100,
      borderWidth: 1,
      overflow: "hidden",
    },
    profileImg: {
      width: "100%",
      height: "100%",
    },
    textWrapper: {
      paddingHorizontal: getPercent(3, width),
    },
    username: {
      fontSize: rf(15),
      fontFamily: "Medium",
      color: "#0F0F0F",
    },
    slug: {
      fontSize: rf(10),
      fontFamily: "Regular",
      color: "#6F7175",
      marginTop: 2,
    },
    payBtn: {
      width: getPercent(8, width),
      height: getPercent(8, width),
      backgroundColor: "#011A51",
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    payBtnText: {
      fontSize: rf(13),
      fontFamily: "Medium",
      color: "#fff",
    },
  });
//typingComponentStyles starts here
export const typingComponentStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: getPercent(10, height),
      paddingBottom: getPercent(2, height),
      paddingTop: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(3, width),
    },
    actionsWrapper: {
      width: "10%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 5,
    },
    inputWrapper: {
      width: "88%",
      height: getPercent(5, height),
      borderRadius: 100,
      backgroundColor: "#D5D5D5",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 5,
      flexDirection: "row",
      paddingVertical: 5,
      overflow: "hidden",
    },
    inputField: {
      width: "75%",
      paddingHorizontal: 10,
      fontSize: rf(12),
      fontFamily: "Medium",
      color: "#222",
      textAlignVertical: "center",
    },
    sendBtn: {
      minWidth: getPercent(4, height),
      minHeight: getPercent(4, height),
      borderRadius: 100,
      backgroundColor: "#0584FE",
      alignItems: "center",
      justifyContent: "center",
    },
    sendText: {
      paddingHorizontal: 20,
      fontSize: rf(12),
      fontFamily: "Medium",
      color: "#fff",
    },
  });
