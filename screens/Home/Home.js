import { ActivityIndicator, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/Home/main";
import { SignOut } from "../../state-management/actions/auth";
import Header from "./components/Header";
import Search from "./components/Search";
import MessageCard from "./components/MessageCard";
import BottomMenu from "../../globalComponents/BottomMenu";
import { useEffect, useMemo, useState } from "react";
import PeopleCard from "./components/PeopleCard";
import { getCurrentUser, getMyChats } from "../../state-management/actions/features";
import { loaderStyles } from "../../styles/Global/main";
import { searchAgent } from "../../state-management/actions/features";
import { getAuth } from "firebase/auth";

const Home = (props) => {
  let { } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [chats, setChats] = useState([])
  const [searchText, setSearchText] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    props?.getMyChats()
    props?.getCurrentUser(setLoading)
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
  }, [])


  let memoizedChats = useMemo(() => {
    return props?.get_all_chats
  }, [props?.get_all_chats])

  return (
    <View style={styles.container}>
      <Header title="Chat" plusIcon data={props?.get_user_details} />
      <View style={styles.content}>
        <Search onChangeText={(val) => setSearchText(val.toLowerCase())} />
        {
          loading ?
            <View style={loaderStyles?.container}>
              <ActivityIndicator size="large" color="#222" />
            </View>
            :
            <>
              {memoizedChats == null && <View style={styles.emptyCont}>
                <Text style={styles.emptyTitle}>Get Started</Text>
                <Text style={styles.emptyText}>Tap + to send a messege.</Text>
              </View>}
              {
                props?.get_all_chats?.length > 0 &&
                <View style={styles.chatsWrapper}>
                  {
                    props?.get_all_chats?.
                      filter((e) => {
                        let senderName = e?.reciever_details?.name.toLowerCase()
                        if (searchText?.length == 0 || searchText == null) return e
                        return senderName.includes(searchText)
                      })
                      .map((item, index) => {
                        let isConversationAvailable = item?.messages?.length > 0
                        if (!isConversationAvailable) return
                        return <MessageCard data={item} key={index} />
                      })
                  }
                </View>
              }
            </>
        }

      </View>
      <BottomMenu activeTab={0} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  get_all_chats: state.main.get_all_chats,
  get_user_details: state.main.get_user_details,
});
export default connect(mapStateToProps, { SignOut, getCurrentUser, searchAgent, getMyChats })(Home);
