import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
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
import MediaChatCard from "./components/MediaChatCard";
import { loaderStyles } from "../../styles/Global/main";

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
  const [imageViewerLoading, setImageViewerLoading] = useState(true)
  const [chatData, setChatData] = useState(null)
  const [messages, setMessages] = useState([])
  const [imageUploadProgress, setImageUploadProgress] = useState(null)
  const [images, setImages] = useState(null)
  const [isRelationUpdated, setIsRelationUpdated] = useState(null)
  const scrollRef = useRef();

  useEffect(() => {
    if (chatRelation == null) {
      props?.getRelation(usersIds)
        .then((res) => {
          if (res == 404) {
            let _newChatData = {
              users: usersIds,
              messages: [],
              JoinedUsers: [otherUserData?.id, currentUserId],
              reciever_details: otherUserData,
              sender_details: currentUser,
              lastMessage: null,
              created_at: new Date().toLocaleTimeString()
            }
            props?.createRelation(_newChatData)
              .then((res) => {
                setIsRelationUpdated(true)
              })
              .catch((e) => {
                console.log(e)
              })
          } else {
            setLoading(false)
            setChatRelation(res)
          }

        })
        .catch((e) => console.log(e))
    }
  }, [isRelationUpdated])


  useEffect(() => {
    if (chatRelation != null) {
      const db = getFirestore();
      const unsub = onSnapshot(doc(db, "chats", chatRelation?.id), (doc) => {
        console.log("You are connected to chat.")
        setMessages(doc.data()?.messages)
        setLoading(false)
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
      images: images,
      sent: false,
      created_at: new Date().toLocaleTimeString()
    }
    let prevM = messages
    let _tempLiveImages = []

    let chatData = {
      lastMessage: messageText || "Sent an image.",
      messages: prevM,
      created_at: new Date().toLocaleTimeString()
    }

    let _newChatData = {
      users: usersIds,
      messages: prevM,
      JoinedUsers: [otherUserData?.id, currentUserId],
      reciever_details: otherUserData,
      sender_details: currentUser,
      lastMessage: messageText || "Sent an image.",
      created_at: new Date().toLocaleTimeString()
    }
    if (!chatRelation) return

    let promises = images?.map(async (item, index) => {
      return await firebaseImageUpload(item?.uri, null, setImageUploadProgress)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          console.log(e);
        });
    });

    if (images?.length > 0) {
      Promise.all(promises)
        .then(function (results) {
          results?.map((item, index) => {
            _tempLiveImages.push(item?.url)
          });
          setMessages((prev) => [...prev, messageObj])
          messageObj['sent'] = true
          prevM.push(messageObj)
          setMessageText(null)
          setImages(null)
          messageObj["liveImages"] = _tempLiveImages
          props?.sendMessage(chatData, chatRelation?.id)
            .then((res) => {
              setImageUploadProgress(null)
              setSendingMessageLoading(false)
              console.log("Message Sent.", res)
            })
            .catch((e) => {
              console.log(e)
            })
        }).catch((e) => {
          console.log(e);
        });
    } else {
      setMessages((prev) => [...prev, messageObj])
      messageObj['sent'] = true
      prevM.push(messageObj)
      setMessageText(null)
      setImages(null)
      props?.sendMessage(chatData, chatRelation?.id)
        .then((res) => {
          console.log("Message Sent.", res)
          setSendingMessageLoading(false)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 0,
    });
    if (!result.canceled) {
      setImages(result.assets);
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
                  if (item?.images?.length > 0) {
                    let isSender = item?.sender == currentUserId
                    return <MediaChatCard
                      isSender={isSender}
                      setImageViewer={setImageViewer}
                      images={isSender ? item?.images : item?.liveImages}
                      key={index}
                      data={item}
                    />
                  }
                  if (item?.sender == currentUserId) {
                    return <SenderCard setImageViewer={setImageViewer} image={null} key={index} data={item} />
                  } else {
                    return <RecieverCard setImageViewer={setImageViewer} key={index} image={null} data={item} />
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
        {imageViewerLoading && <View style={loaderStyles.container}>
          <ActivityIndicator size="large" color="#fff" />
        </View>}
        <Image
          source={{ uri: imageViewer }}
          resizeMode="contain"
          style={{ width: '80%', height: '80%' }}
          onLoadStart={() => setImageViewerLoading(true)}
          onLoad={() => setImageViewerLoading(false)}
        />
      </TouchableOpacity>
      }
      <KeyboardAvoidingView behavior="position">
        {images?.length > 0 && <MediaSheet imageUploadProgress={imageUploadProgress} image={images} setImage={setImages} />}
        <TypingComponent
          messageText={messageText}
          setMessageText={setMessageText}
          onSend={onSend}
          pickImage={pickImage}
          sendingMessageLoading={sendingMessageLoading}
          image={images}
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
