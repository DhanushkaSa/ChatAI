import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Fontisto'
import { COLORS } from '../styles/colors'
import { s, vs } from 'react-native-size-matters'
import InputText from '../components/InputText'
import Lock from 'react-native-vector-icons/Feather'
import ButtonComponent from '../components/ButtonComponent'
import auth, { FacebookAuthProvider, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'





const LoginScreen = ({ navigation }: any) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '853028452285-ge5qrmueh7ajerv283a80liia7q475p1.apps.googleusercontent.com',
    });
  })





  async function onGoogleButtonPress() {
    try {

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });


      const signInResult = await GoogleSignin.signIn();


      const idToken = signInResult.data?.idToken;
      console.log("Token : ", idToken);


      if (!idToken) {
        throw new Error('Google Sign-In failed: No ID token found');
      }


      const googleCredential = auth.GoogleAuthProvider.credential(idToken);


      const userCredential = await auth().signInWithCredential(googleCredential);

      console.log("User Data : ", userCredential);

      navigation.navigate("Main");
      return userCredential;

    } catch (error: any) {
      console.log("Google Sign-In Error:", error);
      Alert.alert("Login Failed", error);
    }
  }

  const signInEmailAndPassword = async () => {
    try {
      await auth().signInWithEmailAndPassword(
        email,
        password
      );


      navigation.navigate("Main")
    } catch (error: any) {
      console.log(error.code, error.message);
      Alert.alert(error.message)
    }
  };




  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.black }}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
    >


      <View style={styles.container}>
        <Image source={{ uri: "https://www.intelligenthq.com/wp-content/uploads/2023/11/Automating-HR-How-AI-And-Chatbots-Revolutionize-Employee-Onboarding1.jpg" }} style={styles.image} />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Enter your login details</Text>



        <InputText
          placeholder="Enter Email"
          secureTextEntry={false}
          style={{ marginTop: vs(5), borderWidth: 1, borderColor: COLORS.textColor, paddingLeft: s(45), width: "95%", height: vs(40), color: COLORS.white, fontSize: s(15) }}
          placeholderTextColor={COLORS.textColor}
          keyboardType="email-address"
          icon={<Icon name="email" size={s(20)} color={COLORS.textColor} />}
          value={email}
          onChangeText={(t) => setEmail(t)}
        />

        <InputText
          placeholder="Password"
          secureTextEntry={true}
          style={{ marginTop: vs(5), borderWidth: 1, borderColor: COLORS.textColor, paddingLeft: s(45), width: "95%", height: vs(40), color: COLORS.white, fontSize: s(15) }}
          placeholderTextColor={COLORS.textColor}
          keyboardType="default"
          icon={<Lock name="lock" size={s(20)} color={COLORS.textColor} />}
          value={password}
          onChangeText={(p) => setPassword(p)}
        />

        <ButtonComponent
          onPress={signInEmailAndPassword}
          text="Login"
          buttonStyle={{ marginTop: vs(10), width: s(315), height: vs(40), borderRadius: 10, backgroundColor: COLORS.btnColor }}
          textStyle={{ textAlign: "center", paddingTop: vs(8), fontSize: s(18), color: COLORS.black }}


        />

        <View style={{ flexDirection: "row", marginTop: vs(10) }}>
          <View style={{ width: s(270 / 2), height: .5, backgroundColor: COLORS.textColor, marginTop: vs(10) }} />
          <Text style={{ textAlign: "center", marginTop: vs(1), fontSize: s(15), color: COLORS.textColor, marginHorizontal: s(10) }}>Or</Text>
          <View style={{ width: s(270 / 2), height: .5, backgroundColor: COLORS.textColor, marginTop: vs(10) }} />

        </View>


        <ButtonComponent
          onPress={onGoogleButtonPress}
          text="Login with Google"
          buttonStyle={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: vs(10),
            width: s(315),
            height: vs(40),
            borderRadius: 15,
            borderColor: COLORS.textColor,
            borderWidth: 1,
          }}
          textStyle={{
            fontSize: s(15),
            color: COLORS.white,
            marginLeft: s(8),
          }}
          icon="https://static.vecteezy.com/system/resources/previews/010/353/285/large_2x/colourful-google-logo-on-white-background-free-vector.jpg"
          iconStyle={{
            width: s(20),
            height: s(20),
            borderRadius: s(10),
          }}
        />


        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: vs(10),
          }}
        >
          <Text
            style={{
              fontSize: s(15),
              color: COLORS.white,
            }}
          >
            Don't have an account?
          </Text>

          <TouchableOpacity onPress={() => { navigation.navigate("SignUp") }}>
            <Text
              style={{
                fontSize: s(15),
                color: COLORS.btnColor,
                marginLeft: s(5),
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>














      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginTop: vs(30),
    borderRadius: 40
  },
  title: {
    fontSize: s(30),
    fontWeight: "bold",
    color: COLORS.white,
    marginTop: vs(10),
  },
  subtitle: {
    fontSize: s(15),
    color: COLORS.textColor,
    marginTop: vs(5),
    marginBottom: vs(20)
  }
})