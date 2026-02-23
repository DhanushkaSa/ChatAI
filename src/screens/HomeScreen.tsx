import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../styles/colors'
import { s, vs } from 'react-native-size-matters'
import ButtonComponent from '../components/ButtonComponent'
import InputText from '../components/InputText'
import FeatherIcon from "react-native-vector-icons/Feather"

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true)

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat AI</Text>
      <View style={{ width: "100%", height: .5, backgroundColor: COLORS.textColor, marginTop: vs(10) }} />

      <Image source={require("../assets/bot.png")} style={{ width: 150, height: 150, marginTop: vs(30) }} />
      <View style={styles.subContainer}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Image source={require("../assets/stars.png")} style={{ width: 25, height: 25 }} />
          <Text style={styles.welcomeMessage}>Hi, you can ask me anything about names</Text>
        </View>

      </View>

      <View style={styles.subContainer}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Image source={require("../assets/stars.png")} style={{ width: 25, height: 25 }} />
          <Text style={styles.welcomeMessage}>I suggest you some names you can ask me..</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <ButtonComponent
            text={"Business name"}
            textStyle={{ color: COLORS.white, fontSize: s(12) }}
            buttonStyle={{ borderWidth: 1, borderColor: COLORS.btnColor, marginTop: vs(10), padding: 8, borderRadius: s(20) }}

          />
          <ButtonComponent
            text={"Human name"}
            textStyle={{ color: COLORS.white, fontSize: s(12) }}
            buttonStyle={{ borderWidth: 1, borderColor: COLORS.btnColor, marginTop: vs(10), padding: 8, borderRadius: s(20) }}

          />
          <ButtonComponent
            text={"Games name"}
            textStyle={{ color: COLORS.white, fontSize: s(12) }}
            buttonStyle={{ borderWidth: 1, borderColor: COLORS.btnColor, marginTop: vs(10), padding: 8, borderRadius: s(20) }}

          />


        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <ButtonComponent
            text={"Pet name"}
            textStyle={{ color: COLORS.white, fontSize: s(12) }}
            buttonStyle={{ borderWidth: 1, borderColor: COLORS.btnColor, marginTop: vs(10), padding: 8, borderRadius: s(20) }}

          />
          <ButtonComponent
            text={"Dish name"}
            textStyle={{ color: COLORS.white, fontSize: s(12) }}
            buttonStyle={{ borderWidth: 1, borderColor: COLORS.btnColor, marginTop: vs(10), padding: 8, borderRadius: s(20) }}

          />
          <ButtonComponent
            text={"Character name"}
            textStyle={{ color: COLORS.white, fontSize: s(12) }}
            buttonStyle={{ borderWidth: 1, borderColor: COLORS.btnColor, marginTop: vs(10), padding: 8, borderRadius: s(20) }}

          />


        </View>



      </View>
      <View style={styles.bottomInputContainer}>
        <View style={styles.inputWrapper}>

          <View style={{ flex: 1 }}>
            <InputText
              style={styles.inputStyle}
              placeholder="Type your message..."
              placeholderTextColor={COLORS.textColor}
            />
          </View>

          <TouchableOpacity style={styles.micButton}>
            <FeatherIcon name="mic" size={25} color={COLORS.textColor} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton}>
            <FeatherIcon name="send" size={25} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>


    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.black
  },
  title: {
    color: COLORS.white,
    fontSize: s(20),
    marginTop: vs(35)

  },
  subContainer: {
    backgroundColor: COLORS.lightGray,
    width: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: vs(20),
    padding: 15

  },
  welcomeMessage: {
    color: COLORS.white,
    fontSize: s(15)
  },
  bottomInputContainer: {
    position: 'absolute',
    bottom: vs(20),
    width: '100%',
    alignSelf: 'center',

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
    height: vs(35),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.btnColor,
    borderRadius: s(50),


  }

})