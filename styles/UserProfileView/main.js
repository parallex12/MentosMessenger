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
    headerWrapper: {
      width: '100%',
      height: getPercent(13, height),
      backgroundColor: '#fff',
      paddingTop: getPercent(5, height),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: getPercent(5, width)
    },
    meText: {
      fontSize: rf(20),
      fontFamily: 'Medium',
      flex: 1,
      paddingHorizontal: 10
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: getPercent(1, height),
      paddingHorizontal: getPercent(5, width)
    },
    profile: {
      width: getPercent(13, height),
      height: getPercent(13, height),
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderWidth: 1
    },
    profileImg: {
      width: '100%',
      height: '100%'
    },
    cameraIcon: {
      position: 'absolute'
    },
    infoWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: getPercent(2, height),
    },
    username: {
      fontSize: rf(20),
      fontFamily: 'Bold',
      marginTop: 10
    },
    slugId: {
      fontSize: rf(14),
      fontFamily: 'Regular',
      color: '#6F7175',
      marginVertical:2
    },
    actionsWrapper: {
      flex: 1,
      width: '100%',
      paddingVertical: getPercent(2, height),
    },
    label: {
      fontSize: rf(14),
      fontFamily: 'Regular',
      color: '#6F7175'
    },
    actionItem: {
      width: '100%',
      minHeight: getPercent(6, height),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: getPercent(1, height),
    },
    iconWrapper: {
      width: getPercent(5, height),
      height: getPercent(5, height),
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: '#011A51'
    },
    titleWrapper: {
      flex: 1,
      paddingHorizontal: getPercent(3, width)
    },
    actionTitle: {
      fontSize: rf(15),
      fontFamily: 'Regular',
      color: '#000000',
    },
    actionSlug: {
      fontSize: rf(12),
      fontFamily: 'Regular',
      color: '#6F7175',
      marginTop: 2
    }
  });
