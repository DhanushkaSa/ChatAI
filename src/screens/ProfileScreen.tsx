import { Alert, Image, Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../styles/colors';
import { s, vs } from 'react-native-size-matters';
import { useAuth } from '../context/AuthContext';
import FeatherIcon from "react-native-vector-icons/Feather"
import ButtonComponent from '../components/ButtonComponent';
import { useTranslation } from 'react-i18next';
import i18n from '../localization/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { CommonActions, useNavigation } from '@react-navigation/native';

const LANGUAGE_KEY = "appLanguage";

const ProfileScreen = () => {

  const authContext = useAuth();
  const user = authContext?.user;
  const email = user?.email
  const name = email?.split('@')[0]
  const profileImage = user?.photoURL

  const [modalVisible, setModalVisible] = useState(false);
  const [select, setSelect] = useState(i18n.language);

  const { t } = useTranslation()
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      t('profile.logout'),
      t('profile.logoutConfirm', 'Are you sure you want to log out?'),
      [
        { text: t('profile.cancel', 'Cancel'), style: 'cancel' },
        {
          text: t('profile.logout'),
          style: 'destructive',
          onPress: async () => {
            try {
              await auth().signOut();
              // Reset navigation stack to Login screen
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              );
            } catch (error: any) {
              console.error("Logout Error:", error);
              Alert.alert('Logout Error', error.message);
            }
          }
        }
      ]
    );
  };

  const handleSupport = () => {
    Alert.alert(
      t('profile.supportHelp'),
      t('profile.supportMessage', 'For support, please email us at support@chatai.com'),
      [
        { text: t('profile.cancel', 'Cancel'), style: 'cancel' },
        {
          text: t('profile.emailUs', 'Email Us'),
          onPress: () => {
            Linking.openURL('mailto:support@chatai.com').catch(err => {
               console.error('Failed to open email tab', err);
            });
          }
        }
      ]
    );
  };

  // Load saved language when app starts
  useEffect(() => {

    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

        if (savedLanguage) {
          i18n.changeLanguage(savedLanguage);
          setSelect(savedLanguage);
        }
      } catch (error) {
        console.log("Language load error", error);
      }
    };

    loadLanguage();

  }, []);


  const handleConfirm = async () => {

    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, select);
      i18n.changeLanguage(select);
    } catch (error) {
      console.log("Language save error", error);
    }

    setModalVisible(false);
  }


  const languageSelectionHandler = (lang: string) => {
    setSelect(lang);
  }


  return (
    <View style={styles.container}>

      <Text style={styles.title}>{t('profile.title')}</Text>

      {
        profileImage ? (
          <>
            <Image
              source={{ uri: profileImage }}
              style={{ width: 100, height: 100, borderRadius: 50, marginTop: vs(30) }}
            />

            <Text style={{ color: COLORS.btnColor, marginTop: vs(10), fontSize: s(15) }}>
              {user?.displayName}
            </Text>

            <Text style={{ color: COLORS.gray, marginTop: vs(5), fontSize: s(12) }}>
              {email}
            </Text>
          </>
        ) : (
          <>
            <View style={{
              width: s(100),
              height: s(100),
              borderRadius: s(60),
              backgroundColor: COLORS.lightGray,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: vs(30)
            }}>

              <FeatherIcon name="user" size={s(80)} color={COLORS.white} />

            </View>

            <Text style={{ color: COLORS.btnColor, marginTop: vs(10), fontSize: s(15) }}>
              {name}
            </Text>

            <Text style={{ color: COLORS.gray, marginTop: vs(5), fontSize: s(12) }}>
              {email}
            </Text>
          </>
        )
      }


      {/* Language Button */}

      <ButtonComponent
        text={t('profile.language')}
        textStyle={{ color: COLORS.white, fontSize: s(15) }}
        buttonStyle={{
          backgroundColor: COLORS.lightGray,
          width: "95%",
          borderRadius: 15,
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: vs(20),
          padding: 15,
          flexDirection: 'row',
        }}

        vectorIcon="language"
        iconStyle={{ color: COLORS.white, marginHorizontal: s(12) }}
        arrow="arrow-forward-ios"
        onPress={() => setModalVisible(true)}
      />


      {/* Logout Button */}

      <ButtonComponent
        text={t('profile.logout')}
        textStyle={{ color: COLORS.white, fontSize: s(15) }}
        buttonStyle={{
          backgroundColor: COLORS.lightGray,
          width: "95%",
          borderRadius: 15,
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: vs(20),
          padding: 15,
          flexDirection: 'row',
        }}

        vectorIcon="logout"
        iconStyle={{ color: COLORS.white, marginHorizontal: s(12) }}
        arrow="arrow-forward-ios"
        onPress={handleLogout}
      />


      {/* Support Button */}

      <ButtonComponent
        text={t('profile.supportHelp')}
        textStyle={{ color: COLORS.white, fontSize: s(15) }}
        buttonStyle={{
          backgroundColor: COLORS.lightGray,
          width: "95%",
          borderRadius: 15,
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: vs(20),
          padding: 15,
          flexDirection: 'row',
        }}

        vectorIcon="help"
        iconStyle={{ color: COLORS.white, marginHorizontal: s(12) }}
        arrow="arrow-forward-ios"
        onPress={handleSupport}
      />


      {/* Language Modal */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        statusBarTranslucent
        transparent
      >

        <View style={styles.overlay}>

          <View style={styles.modalContainer}>


            {[
              { code: "en", label: t('profile.languages.english') },
              { code: "si", label: t('profile.languages.sinhala') },
              { code: "ta", label: t('profile.languages.tamil') },
              { code: "ru", label: t('profile.languages.russian') },
              { code: "de", label: t('profile.languages.german') }
            ].map((item) => (

              <TouchableOpacity
                key={item.code}
                style={{ padding: 15 }}
                onPress={() => languageSelectionHandler(item.code)}
              >

                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

                  <Text style={styles.languageText}>{item.label}</Text>

                  {
                    select === item.code && (
                      <FeatherIcon name="check" size={s(20)} color={COLORS.btnColor} />
                    )
                  }

                </View>

              </TouchableOpacity>

            ))}


            <ButtonComponent
              text={t("profile.confirm")}
              buttonStyle={{
                backgroundColor: COLORS.black,
                borderRadius: s(15),
                marginTop: vs(15)
              }}

              textStyle={{
                color: COLORS.white,
                fontSize: s(15),
                textAlign: "center",
                padding: s(12)
              }}

              onPress={handleConfirm}
            />

          </View>

        </View>

      </Modal>


    </View>
  )
}

export default ProfileScreen


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    marginTop: vs(50)
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)"
  },

  modalContainer: {
    height: "50%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  languageText: {
    fontSize: 16,
    color: COLORS.black
  }

})