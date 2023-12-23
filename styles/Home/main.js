import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";

//container starts here
export const styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    content: {
      flex: 1,
      paddingHorizontal: getPercent(5, width),
      paddingBottom: getPercent(1, height)
    },
    subTitle: {
      fontSize: rf(15),
      fontFamily: 'Regular',
      color: '#222',
      marginTop: 10
    },
    emptyCont: {
      width: '100%',
      height: '70%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    emptyTitle: {
      fontSize: rf(30),
      fontFamily: 'Medium',
      color: '#222',
    },
    emptyText: {
      marginVertical: getPercent(1, height),
      fontSize: rf(15),
      fontFamily: 'Light',
      color: '#222',
    },
    chatsWrapper: {
      flex: 1,
    }
  });



//contactsStyles starts here
export const contactsStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 10
    },
    profileCont: {
      width: getPercent(8, height),
      height: getPercent(8, height),
      padding: 2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    userWrapper: {
      minWidth: getPercent(10, height),
      minHeight: getPercent(8, height),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 5
    },
    profileWrapper: {
      width: getPercent(7, height),
      height: getPercent(7, height),
      borderWidth: 1,
      borderColor: "#011A51",
      borderRadius: 100,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center'
    },
    name: {
      fontSize: rf(11),
      color: '#222',
      fontFamily: 'Medium',
      marginTop: 3
    },
    activeIcon: {
      width: getPercent(2, height),
      height: getPercent(2, height),
      borderRadius: 100,
      backgroundColor: '#5AD439',
      position: 'absolute',
      bottom: 0,
      right: 8,
      borderWidth: 2,
      borderColor: '#fff'
    },
  })

//headerStyles starts here
export const headerStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: getPercent(13, height),
      backgroundColor: '#fff',
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
      paddingTop: getPercent(5, height),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: getPercent(5, width)
    },
    profileWrapper: {
      width: getPercent(5, height),
      height: getPercent(5, height),
      borderRadius: 100,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#011A51'
    },
    title: {
      fontSize: rf(22),
      fontFamily: 'Bold',
      color: '#222',
      marginHorizontal: 15
    },
    actionWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    editBtn: {
      width: getPercent(4, height),
      height: getPercent(4, height),
      backgroundColor: '#F5F5F5',
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

//searchStyles starts here
export const searchStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: getPercent(6, height),
      borderRadius: 100,
      backgroundColor: '#F5F5F5',
      paddingHorizontal: getPercent(5, width),
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: getPercent(1, height),
      flexDirection: 'row'
    },
    inputCont: {
      width: '80%',
      height: '100%',
      fontSize: rf(12),
      color: '#222',
      fontFamily: 'Medium',
      marginLeft: 6
    }
  });

//messageCardStyles starts here
export const messageCardStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      height: getPercent(8, height),
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginVertical: getPercent(0.2, height)
    },
    profileCont: {
      width: getPercent(6, height),
      height: getPercent(6, height),
      padding: 2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    profileWrapper: {
      width: getPercent(6, height),
      height: getPercent(6, height),
      borderRadius: 100,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: '#011A51',
    },
    activeIcon: {
      width: getPercent(2, height),
      height: getPercent(2, height),
      borderRadius: 100,
      backgroundColor: '#5AD439',
      position: 'absolute',
      bottom: 0,
      right: 0,
      borderWidth: 2,
      borderColor: '#fff'
    },
    textContent: {
      flex: 1,
      paddingHorizontal: 10
    },
    userName: {
      fontSize: rf(14),
      color: '#19191A',
      fontFamily: 'Regular',
    },
    lastMessageText: {
      fontSize: rf(10),
      color: '#525357',
      fontFamily: 'Regular',
      marginTop: 4
    },
    timeContent: {
      height: '50%'
    },
    timeText: {
      fontSize: rf(10),
      color: '#525357',
      fontFamily: 'Regular',
    },
    dotText:{
      fontSize: getPercent(1.3, height),
      color: '#fff',
      fontFamily: 'Regular',
    },
    dot: {
      width: getPercent(2.5, height),
      height: getPercent(2.5, height),
      backgroundColor: '#011A51',
      borderRadius: 100,
      alignSelf: 'flex-end',
      top: 10,
      alignItems:'center',
      justifyContent:'center',
      padding:2
    },
    approvebtn: {
      width: getPercent(25, width),
      height: getPercent(5, height),
      borderRadius: 10,
      backgroundColor: '#011A51',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5
    },
    rejectbtn: {
      width: getPercent(25, width),
      height: getPercent(5, height),
      borderRadius: 10,
      backgroundColor: '#FE2929',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5
    },
    btnText: {
      fontSize: rf(10),
      color: '#fff',
      fontFamily: 'Regular',
      textAlign: 'center'
    },
    requestBtn: {
      width: getPercent(8, width),
      height: getPercent(8, width),
      backgroundColor: '#011A51',
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center'
    }

  });