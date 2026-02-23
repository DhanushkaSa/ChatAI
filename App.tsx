import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyStack from './src/navigation/MyStack';
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './src/screens/LoginScreen';


const App = () => {
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