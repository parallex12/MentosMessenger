import { ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/ChatScreen/main";
import Header from "./components/Header";
import TypingComponent from "./components/TypingComponent";
import SenderCard from "./components/SenderCard";
import RecieverCard from "./components/RecieverCard";
import { getRelation, sendMessage, createRelation } from "../../state-management/actions/features";
import { getAuth } from "firebase/auth";
import { useEffect, useMemo, useRef, useState } from "react";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import MediaSheet from "./components/MediaSheet";
import { firebaseImageUpload } from "../../middleware";

const ChatScreen = (props) => {
  let { } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let otherUserData = props?.route?.params?.data
  let currentUserId = getAuth().currentUser?.uid
  let currentUser = { ...props?.get_user_details, id: currentUserId }
  let usersIds = [otherUserData?.id + currentUserId, currentUserId + otherUserData?.id]
  const [loading, setLoading] = useState(true)
  const [sendingMessageLoading, setSendingMessageLoading] = useState(false)
  const [messageText, setMessageText] = useState(null)
  const [chatRelation, setChatRelation] = useState(null)
  const [imageViewer, setImageViewer] = useState(false)
  const [chatData, setChatData] = useState(null)
  const [messages, setMessages] = useState([])
  const [imageUploadProgress, setImageUploadProgress] = useState(null)
  const [image, setImage] = useState(null)
  const [isRelationUpdated, setIsRelationUpdated] = useState(null)
  const scrollRef = useRef();

  useEffect(() => {
    if (chatRelation == null) {
      props?.getRelation(usersIds)
        .then((res) => {
          setLoading(false)
          setChatRelation(res)
        })
        .catch((e) => console.log(e))
    }
  }, [isRelationUpdated])


  useEffect(() => {
    if (chatRelation != null) {
      const db = getFirestore();
      const unsub = onSnapshot(doc(db, "chats", chatRelation?.id), (doc) => {
        console.log("You are connected to chat.")
        console.log(doc.data())
        setChatData(doc.data())
        setMessages(doc.data()?.messages)
      });
      return () => unsub()
    }
  }, [chatRelation])

  let memiozedMessages = useMemo(() => {
    return messages
  }, [messages])

  const onSend = async () => {
    if (sendingMessageLoading) return
    setSendingMessageLoading(true)
    let messageObj = {
      sender: currentUserId,
      reciever: otherUserData?.id,
      message: messageText,
      image: image,
      sent: false,
      created_at: new Date().toLocaleTimeString()
    }
    let prevM = messages

    if (chatRelation) {
      if (image != null) {
        await firebaseImageUpload(image,null, setImageUploadProgress)
          .then((res) => {
            messageObj["liveImage"] = res?.url
            setMessages((prev) => [...prev, messageObj])
            setMessageText(null)
            setImage(null)
            messageObj['sent'] = true
            prevM.push(messageObj)
            let chatData = {
              lastMessage: messageText || "Sent an image.",
              messages: prevM,
              created_at: new Date().toLocaleTimeString()
            }
            props?.sendMessage(chatData, chatRelation?.id)
              .then((res) => {
                console.log(res)
              })
              .catch((e) => {
                console.log(e)
              })
            setImageUploadProgress(null)
            setSendingMessageLoading(false)
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        setMessages((prev) => [...prev, messageObj])
        setMessageText(null)
        setImage(null)
        messageObj['sent'] = true
        prevM.push(messageObj)
        let chatData = {
          lastMessage: messageText,
          messages: prevM,
          created_at: new Date().toLocaleTimeString()
        }
        props?.sendMessage(chatData, chatRelation?.id)
          .then((res) => {
            console.log(res)
          })
          .catch((e) => {
            console.log(e)
          })
        setSendingMessageLoading(false)
      }

    } else {
      if (image != null) {
        await firebaseImageUpload(image,null, setImageUploadProgress)
          .then((res) => {
            messageObj["liveImage"] = res?.url
            setMessages((prev) => [...prev, messageObj])
            setMessageText(null)
            setImage(null)
            messageObj['sent'] = true
            prevM.push(messageObj)
            let chatData = {
              users: usersIds,
              messages: prevM,
              JoinedUsers: [otherUserData?.id, currentUserId],
              reciever_details: otherUserData,
              sender_details: currentUser,
              lastMessage: messageText || "Sent an image.",
              created_at: new Date().toLocaleTimeString()
            }
            props?.createRelation(chatData)
              .then((res) => {
                setIsRelationUpdated(true)
              })
              .catch((e) => {
                console.log(e)
              })
            setImageUploadProgress(null)
            setSendingMessageLoading(false)
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        setMessages((prev) => [...prev, messageObj])
        setMessageText(null)
        messageObj['sent'] = true
        prevM.push(messageObj)
        let chatData = {
          users: usersIds,
          lastMessage: messageText,
          messages: prevM,
          JoinedUsers: [otherUserData?.id, currentUserId],
          reciever_details: otherUserData,
          sender_details: currentUser,
          created_at: new Date().toLocaleTimeString()
        }
        props?.createRelation(chatData)
          .then((res) => {
            setIsRelationUpdated(true)
          })
          .catch((e) => {
            console.log(e)
          })
      }
    }
    setSendingMessageLoading(false)
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  return (
    <View style={styles.container}>
      <Header data={otherUserData} />
      <ScrollView
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({ animated: true })
        }
      >
        {
          loading ?
            <ActivityIndicator size="large" color="#222" />
            : <View style={styles.content}>
              {
                memiozedMessages?.map((item, index) => {
                  if (!item?.sent) return <Text key={index}>sending..</Text>
                  if (item?.sender == currentUserId) {
                    return <SenderCard setImageViewer={setImageViewer} image={item?.image} key={index} data={item} />
                  } else {
                    return <RecieverCard setImageViewer={setImageViewer} key={index} image={item?.image} data={item} />
                  }
                })
              }
            </View>
        }
      </ScrollView>
      {imageViewer && <TouchableOpacity
        activeOpacity={1}
        style={styles.imageViewer}
        onPress={() => setImageViewer(null)}
      >
        <Image
          source={{ uri: imageViewer }}
          resizeMode="cover"
          style={{ width: '80%', height: '80%' }}
        />
      </TouchableOpacity>}
      <KeyboardAvoidingView behavior="padding">
        {image && <MediaSheet imageUploadProgress={imageUploadProgress} image={image} setImage={setImage} />}
        <TypingComponent
          messageText={messageText}
          setMessageText={setMessageText}
          onSend={onSend}
          pickImage={pickImage}
          sendingMessageLoading={sendingMessageLoading}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  get_user_details: state.main.get_user_details,
});
export default connect(mapStateToProps, { getRelation, createRelation, sendMessage })(ChatScreen);
