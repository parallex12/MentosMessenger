import { Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/Home/main";
import { SignOut } from "../../state-management/actions/auth";
import Search from "./components/Search";
import MessageCard from "./components/MessageCard";
import BottomMenu from "../../globalComponents/BottomMenu";
import { useEffect, useState } from "react";
import PeopleCard from "./components/PeopleCard";
import Header from "../Home/components/Header";
import { getAnyUser, searchAgent } from "../../state-management/actions/features";
import { getAuth } from "firebase/auth";

const People = (props) => {
  let { } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [users, setUsers] = useState([])
  const [searchedUsers, setSearchedUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const onSearch = (val) => {
    props?.searchAgent(val, setLoading)
      .then((res) => setSearchedUsers(res))
      .catch((e) => console.log(e))
  }


  return (
    <View style={styles.container}>
      <Header title="Find People" />
      <View style={styles.content}>
        {!props?.get_user_details?.agentId && <Search onChangeText={(val) => onSearch(val)} />}
        {searchedUsers?.length == 0 && props?.get_all_chats?.length == 0 && <View style={styles.emptyCont}>
          <Text style={styles.emptyTitle}>Get Started</Text>
          <Text style={styles.emptyText}>Type id to find anyone</Text>
        </View>}
        {
          props?.get_all_chats?.length > 0 && searchedUsers?.length == 0 &&
          <>
            <Text style={styles.subTitle}>My Contacts</Text>
            <View style={styles.chatsWrapper}>
              {
                props?.get_all_chats?.map((item, index) => {
                  let me = getAuth().currentUser
                  let userDetails = me?.email == item?.reciever_details?.email ? item?.sender_details : item?.reciever_details
                  return <PeopleCard key={index} data={userDetails} />
                })
              }
            </View>
          </>
        }

        {
          searchedUsers?.length > 0 &&
          <View style={styles.chatsWrapper}>
            {
              searchedUsers?.map((item, index) => {
                return <PeopleCard key={index} data={item} />
              })
            }
          </View>
        }

      </View>
      <BottomMenu activeTab={1} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  get_all_contacts: state.main.get_all_contacts,
  get_all_chats: state.main.get_all_chats,
  get_user_details: state.main.get_user_details,

});
export default connect(mapStateToProps, { SignOut, searchAgent })(People);
