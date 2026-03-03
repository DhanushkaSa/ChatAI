import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS } from '../styles/colors'
import { s, vs } from 'react-native-size-matters'
import FeatherIcon from "react-native-vector-icons/Feather"
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import InputText from '../components/InputText'
import ButtonComponent from '../components/ButtonComponent'
import { useSelector } from 'react-redux'
import { getHuggingFaceResponse } from '../api/getHugginfaceResponse'
import { TypewriterText } from '../components/TypewriterText'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'


const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true)
  const user = useSelector((state: any) => state.auth.user);
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ msg: string; answer: any }>>([]);
  const flatListRef = useRef<FlatList>(null);
  const email = user?.email
  const displayName = email?.split('@')[0]

  const { t } = useTranslation()

  const authContext = useAuth();
  const User = authContext?.user;



  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )


  }

  // const saveMessage = async ({ userId, chatId, messageText, role }: any) => {
  //   // Path: users -> [UID] -> chats -> [ChatID] -> messages
  //   const messagesRef = collection(db, "users", userId, "chats", chatId, "messages");

  //   await addDoc(messagesRef, {
  //     text: messageText,
  //     sender: role, // 'user' or 'ai'
  //     timestamp: serverTimestamp()
  //   });
  // }




  const getResponse = async (directMessage?: string) => {
    const msgToSend = directMessage || message;

    if (!msgToSend.trim()) return;



    if (!directMessage) setMessage("");

    const userMsg = msgToSend;
    setMessage("");

    const newMessage = { msg: userMsg, answer: "...." };
    setChatHistory((prev) => [...prev, newMessage]);

    try {

      const response = await getHuggingFaceResponse(userMsg);




      setChatHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        updatedHistory[updatedHistory.length - 1].answer = response;


        return updatedHistory;
      });


      // saveMessage()

    } catch (error) {
      console.error(error);

    }
  };





  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.black }}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
    >
      <View style={styles.container}>



        <View style={{ width: "100%", marginTop: vs(45), alignItems: "flex-start", marginLeft: s(10), flexDirection: "row", gap: 10, marginBottom: vs(10) }} >
          {user?.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              style={{ width: s(30), height: s(30), borderRadius: s(20) }}
            />
          ) : (
            <View style={{ width: s(40), height: s(40), borderRadius: s(20), backgroundColor: COLORS.lightGray, justifyContent: 'center', alignItems: 'center' }}>
              <FeatherIcon name="user" size={s(20)} color={COLORS.white} />
            </View>
          )}
          <Text style={{ color: COLORS.white, alignSelf: "center" }}>Hi, {displayName}</Text>
        </View>


        {
          chatHistory.length > 0 ? (
            <FlatList
              ref={flatListRef}
              data={chatHistory}
              style={{ width: '100%', marginBottom: vs(70) }}
              contentContainerStyle={{ paddingBottom: vs(100), paddingHorizontal: s(10) }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              renderItem={({ item, index }) => (
                <View style={{ width: "100%" }}>
                  <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>{item.msg}</Text>


                  </View>
                  <View style={styles.answerContainer}>

                    <TypewriterText text={item.answer} style={styles.answerText} speed={30} />
                  </View>


                </View>
              )}

            />
          ) : (
            <>
              <Image source={require("../assets/bot.png")} style={{ width: 150, height: 150, marginTop: vs(30) }} />
              <View style={styles.userName}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Image source={require("../assets/stars.png")} style={{ width: 25, height: 25, marginTop: vs(5) }} />
                  <Text style={styles.userNameText}>{t("home.greeting")}, <Text style={{ color: COLORS.btnColor }}>{displayName}</Text></Text>
                </View>

              </View>

              <View style={styles.subContainer}>
                <View style={{ flexDirection: "row", gap: 3, justifyContent: "center" }}>
                  <Image source={require("../assets/stars.png")} style={{ width: 20, height: 20, marginLeft: s(30) }} />
                  <Text style={styles.welcomeMessage}>{t("home.suggestionTitle")}</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <ButtonComponent
                    text={t("home.trendingTechnologies")}
                    textStyle={{ color: COLORS.white, fontSize: s(10) }}
                    buttonStyle={{ borderWidth: 1, borderColor: COLORS.btnColor, marginTop: vs(10), padding: 8, borderRadius: s(20) }}
                    onPress={() => getResponse("Trending Technologies")}

                  />
                  <ButtonComponent
                    text={t("home.education")}
                    textStyle={{ color: COLORS.white, fontSize: s(10) }}
                    buttonStyle={{ borderWidth: 1, borderColor: COLORS.btnColor, marginTop: vs(10), padding: 8, borderRadius: s(20) }}
                    onPress={() => getResponse("Education")}

                  />
                  <ButtonComponent
                    text={t("home.trendingNews")}
                    textStyle={{ color: COLORS.white, fontSize: s(10) }}
                    buttonStyle={{ borderWidth: 1, borderColor: COLORS.btnColor, marginTop: vs(10), padding: 8, borderRadius: s(20) }}
                    onPress={() => getResponse("Trending News")}

                  />


                </View>





              </View>
            </>
          )


        }




        <View style={styles.bottomInputContainer}>
          <View style={styles.inputWrapper}>

            <View style={{ flex: 1, marginLeft: 10 }}>
              <InputText
                style={styles.inputStyle}
                placeholder={t("home.typeMessage")}
                placeholderTextColor={COLORS.textColor}
                value={message}
                onChangeText={(text: any) => setMessage(text)}
                multiline={true}

              />
            </View>

            <TouchableOpacity style={styles.micButton}>
              <FeatherIcon name="mic" size={25} color={COLORS.textColor} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.sendButton} onPress={() => getResponse()}>

              <FontAwesomeIcon name="send-o" size={24} color={COLORS.black} />

            </TouchableOpacity>





          </View>
        </View>


      </View>
    </KeyboardAvoidingView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.black,

  },
  title: {
    color: COLORS.white,
    fontSize: s(20),
    marginTop: vs(35)

  },
  bottomInputContainer: {
    position: 'absolute',
    bottom: vs(20),
    width: '100%',
    alignSelf: 'center',

  },

  subContainer: {
    backgroundColor: COLORS.lightGray,
    width: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: vs(5),
    padding: 15

  },

  userName: {
    width: "100%",
    borderRadius: 15,
    marginTop: vs(5),
    padding: 15,
    textAlign: "center",
  },

  userNameText: {
    color: COLORS.white,
    fontSize: s(22)
  },

  welcomeMessage: {
    color: COLORS.white,
    fontSize: s(15),
    textAlign: "center",
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputStyle: {

    margin: 0,
    marginTop: 0,
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    borderRadius: s(20),
    paddingHorizontal: s(10),
    color: COLORS.white,
    backgroundColor: COLORS.black,
    height: vs(42),

  },
  micButton: {
    width: s(40),
    height: vs(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: s(10)


  },

  sendButton: {
    width: s(40),
    height: vs(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.btnColor,
    borderRadius: s(100),


  },

  chatContainer: {
    flexDirection: 'row',
    alignItems: "flex-end"
  },

  messageContainer: {

    alignSelf: 'flex-end',
    backgroundColor: COLORS.btnColor,
    padding: s(10),
    borderRadius: s(15),
    borderBottomRightRadius: 0,
    marginLeft: s(200),
    marginBottom: vs(5),
    marginTop: vs(15),
    maxWidth: '75%',

  },

  answerContainer: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lightGray,
    padding: s(10),
    borderRadius: s(15),
    borderBottomLeftRadius: 0,
    marginLeft: s(10),
    marginBottom: vs(15),
    maxWidth: '75%',

  },
  messageText: {
    color: COLORS.black,
    fontSize: s(14),

  },

  answerText: {
    color: COLORS.white,
    fontSize: s(14),

  },



})