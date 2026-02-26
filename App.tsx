import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BootSplash from "react-native-bootsplash";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { Provider, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

import MyStack from './src/navigation/MyStack';
import { MyTheme } from './src/styles/colors';
import { store } from './src/store/store';
import { setUser, clearUser } from './src/store/authSlice';


const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    const init = async () => {
      SystemNavigationBar.setNavigationColor("#000000", "light");
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  useEffect(() => {

    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {

        const fullName = user.displayName || "Friend";
        const firstName = fullName.split(' ')[0];

        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: firstName,
          photoURL: user.photoURL,


        }));
      } else {
        dispatch(clearUser());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <MyStack />
    </NavigationContainer>
  );
};


const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;