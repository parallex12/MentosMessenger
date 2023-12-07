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
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    imageViewer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 999999999,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems:'center',
      justifyContent:'center'
    }
  });

//mediaSheetStyles  starts here
export const mediaSheetStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: '100%',
      minHeight: getPercent(10, height),
      backgroundColor: '#e5e5e5',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: getPercent(3, width),
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingVertical: getPercent(2, height),
      flexWrap: 'wrap',
    },
    imgWrapper: {
      width: '21%',
      height: getPercent(8, height),
      borderRadius: 6,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      marginVertical: 5,
      marginHorizontal: 5
    },
    deleteBtn: {
      width: getPercent(8, width),
      height: getPercent(8, width),
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 100,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

//senderCardStyles  starts here
export const senderCardStyles = ({ width, height }) =>
  StyleSheet.create({
    boxWrapper: {
      minWidth: '10%',
      maxWidth: '80%',
      minHeight: getPercent(5, height),
      borderRadius: 6,
      backgroundColor: '#C2C6CC',
      paddingHorizontal: getPercent(3, width),
      paddingVertical: getPercent(1, height),
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: getPercent(0.5, height),
      alignSelf: 'flex-end',
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: getPercent(0.5, height),
      alignSelf: 'flex-end',
    },
    actionsWrapper: {
      alignSelf: 'flex-end',
      flexDirection: 'row',
      alignItems: 'center',
    },
    time: {
      fontSize: rf(8),
      fontFamily: 'Regular',
      color: '#222',
    },
    text: {
      fontSize: rf(12),
      fontFamily: 'Regular',
      color: '#222',
      lineHeight: 25
    },
    profileImg: {
      width: '100%',
      height: '100%'
    },
    imageWrapper: {
      width: getPercent(30, width),
      height: getPercent(30, width),
      borderRadius: 10,
      flexDirection: 'row',
      overflow: 'hidden'
    }
  });


//recieverCardStyles  starts here
export const recieverCardStyles = ({ width, height }) =>
  StyleSheet.create({
    boxWrapper: {
      minWidth: '10%',
      maxWidth: '80%',
      minHeight: getPercent(5, height),
      borderRadius: 6,
      backgroundColor: '#011A51',
      paddingHorizontal: getPercent(3, width),
      paddingVertical: getPercent(1, height),
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: getPercent(0.5, height)
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: getPercent(0.5, height)
    },
    actionsWrapper: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
    },
    time: {
      fontSize: rf(8),
      fontFamily: 'Regular',
      color: '#222',
    },
    text: {
      fontSize: rf(12),
      fontFamily: 'Regular',
      color: '#FFFFFF',
      lineHeight: 25
    },
    profileImg: {
      width: '100%',
      height: '100%'
    },
    imageWrapper: {
      width: getPercent(30, width),
      height: getPercent(30, width),
      borderRadius: 10,
      overflow: 'hidden'
    }
  });

//headerStyles  starts here
export const headerStyles = ({ width, height }) =>
  StyleSheet.create({
    headerWrapper: {
      width: '100%',
      height: getPercent(15, height),
      backgroundColor: '#fff',
      paddingTop: getPercent(5, height),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: getPercent(5, width),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
      borderBottomWidth: 1,
      borderColor: '#e5e5e5',
    },
    title: {
      fontSize: rf(20),
      fontFamily: 'Medium',
      flex: 1,
      paddingHorizontal: 10
    },
    detailsWrapper: {
      flex: 1,
      paddingHorizontal: getPercent(3, width),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    profile: {
      width: getPercent(5, height),
      height: getPercent(5, height),
      borderRadius: 100,
      borderWidth: 1
    },
    profileImg: {
      width: '100%',
      height: '100%'
    },
    textWrapper: {
      paddingHorizontal: getPercent(3, width),
    },
    username: {
      fontSize: rf(15),
      fontFamily: 'Medium',
      color: '#0F0F0F'
    },
    slug: {
      fontSize: rf(10),
      fontFamily: 'Regular',
      color: '#6F7175',
      marginTop: 2
    }
  });
//typingComponentStyles starts here
export const typingComponentStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: getPercent(10, height),
      paddingBottom: getPercent(2, height),
      paddingTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: getPercent(3, width),
    },
    actionsWrapper: {
      width: '10%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5
    },
    inputWrapper: {
      width: '88%',
      height: getPercent(5, height),
      borderRadius: 100,
      backgroundColor: '#D5D5D5',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      flexDirection: 'row',
      paddingVertical: 5,
      overflow: 'hidden'
    },
    inputField: {
      width: '82%',
      paddingHorizontal: 10,
      fontSize: rf(12),
      fontFamily: 'Medium',
      color: '#222',
      textAlignVertical: 'center'
    },
    sendBtn: {
      width: getPercent(4, height),
      height: getPercent(4, height),
      borderRadius: 100,
      backgroundColor: '#011A51',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });