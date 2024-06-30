import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/AdminHome/main";
import { SignOut } from "../../state-management/actions/auth";
import Header from "./components/Header";
import Search from "./components/Search";
import BottomMenu from "../../globalComponents/BottomMenu";
import { useEffect, useState } from "react";
import PeopleCard from "./components/PeopleCard";
import { getAllUsers, updateUser } from "../../state-management/actions/features";
import { loaderStyles } from "../../styles/Global/main";

const AdminHome = (props) => {
  let { } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState(null)


  useEffect(() => {
    props?.getAllUsers(setLoading)
  }, [])

  const onReject = (id) => {
    setLoading(true)
    props?.updateUser({ type: "user", agentId: null }, id, setLoading)
      .then((res) => {
        props?.getAllUsers(setLoading)
        setLoading(false)
      }).catch((e) => {
        console.log(e)
        alert("Something went wrong try again.")
      })
  }

  const onApprove = (id) => {
    setLoading(true)
    let agent_Id = id.slice(id?.length - 6)
    props?.updateUser({ type: "agent", agentId: agent_Id }, id, setLoading)
      .then((res) => {
        props?.getAllUsers(setLoading)
        setLoading(false)
      }).catch((e) => {
        setLoading(flase)
        console.log(e)
        alert("Something went wrong try again.")
      })
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Search onChangeText={(val) => setSearchText(val?.toLowerCase())} />
          {
            loading ?
              <View style={loaderStyles?.container}>
                <ActivityIndicator size="large" color="#222" />
              </View>
              :
              <>
                {props?.get_all_users == null && <View style={styles.emptyCont}>
                  <Text style={styles.emptyTitle}>No Agents Yet</Text>
                </View>}
                {
                  props?.get_all_users?.length > 0 &&
                  <View style={styles.chatsWrapper}>
                    {
                      props?.get_all_users?.
                        filter((e) => {
                          if (searchText?.length == 0 || searchText == null) return e
                          return e?.email?.toLowerCase()?.includes(searchText) ||
                            e?.name?.toLowerCase()?.includes(searchText) ||
                            e?.agentId?.toLowerCase()?.includes(searchText)
                        })
                        ?.map((item, index) => {
                          if (item?.type == "admin") return
                          return <PeopleCard
                            key={index}
                            data={item}
                            onApprove={() => onApprove(item?.id)}
                            onReject={() => onReject(item?.id)}
                          />
                        })
                    }
                  </View>
                }
              </>
          }

        </ScrollView>
      </View>
      {/* <BottomMenu activeTab={0}/> */}
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  get_all_users: state.main.get_all_users
});
export default connect(mapStateToProps, { SignOut, getAllUsers, updateUser })(AdminHome);
