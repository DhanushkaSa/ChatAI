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
import { AuthProvider } from './src/context/AuthContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/localization/i18n';


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



        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,


        }));
      } else {
        dispatch(clearUser());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <AuthProvider>
      <NavigationContainer theme={MyTheme}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <MyStack />
      </NavigationContainer>
    </AuthProvider>
  );
};


const App = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AppContent />
      </I18nextProvider>
    </Provider>
  );
};

export default App;