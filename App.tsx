import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MyStack from './src/navigation/MyStack';
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './src/screens/LoginScreen';
import BootSplash from "react-native-bootsplash";

const App = () => {

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    // <LoginScreen/>

  )
}


export default App

const styles = StyleSheet.create({

})