import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { getAuth } from '@react-native-firebase/auth';
import { COLORS } from '../styles/colors';
import { s, vs } from 'react-native-size-matters';
import { useAuth } from '../context/AuthContext';
import FeatherIcon from "react-native-vector-icons/Feather"
import ButtonComponent from '../components/ButtonComponent';
import { useTranslation } from 'react-i18next';
import i18n from '../localization/i18n';


const ProfileScreen = () => {

  const authContext = useAuth();
  const user = authContext?.user;
  const email = user?.email
  const name = email?.split('@')[0]
  const profileImage = user?.photoURL
  const [modalVisible, setModalVisible] = useState(false);
  const [select, setSelect] = useState(i18n.language);

  const { t } = useTranslation()

  const handleConfirm = () => {


    setModalVisible(false);
    i18n.changeLanguage(select)

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
            <Image source={{ uri: profileImage }} style={{ width: 100, height: 100, borderRadius: 50, marginTop: vs(30) }} />
            <Text style={{ color: COLORS.btnColor, marginTop: vs(10), fontSize: s(15) }}>{user?.displayName}</Text>
            <Text style={{ color: COLORS.gray, marginTop: vs(5), fontSize: s(12) }}>{email}</Text>

          </>
        ) : (
          <>
            <View style={{ width: s(100), height: s(100), borderRadius: s(60), backgroundColor: COLORS.lightGray, justifyContent: 'center', alignItems: 'center', marginTop: vs(30) }}>
              <FeatherIcon name="user" size={s(80)} color={COLORS.white} />
            </View>

            <Text style={{ color: COLORS.btnColor, marginTop: vs(10), fontSize: s(15) }}>{name}</Text>
            <Text style={{ color: COLORS.gray, marginTop: vs(5), fontSize: s(12) }}>{email}</Text>
          </>
        )
      }

      <ButtonComponent text={t('profile.language')} textStyle={{ color: COLORS.white, fontSize: s(15) }} buttonStyle={{
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

      <ButtonComponent text={t('profile.logout')} textStyle={{ color: COLORS.white, fontSize: s(15) }} buttonStyle={{
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
      />

      <ButtonComponent text={t('profile.supportHelp')} textStyle={{ color: COLORS.white, fontSize: s(15) }} buttonStyle={{
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
      />

      <Modal visible={modalVisible} animationType="slide" statusBarTranslucent transparent={true}>

        <View style={styles.overlay}>
          <View style={styles.modalContainer}>

            <View style={{ padding: s(5) }}>

              <TouchableOpacity
                style={{ padding: 15 }}
                onPress={() => { languageSelectionHandler("en") }}
              >

                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <Text style={styles.languageText}>{t('profile.languages.english')}</Text>

                  {
                    select === "en" && (
                      <FeatherIcon name="check" size={s(20)} color={COLORS.btnColor} />
                    )
                  }

                </View>

              </TouchableOpacity>


              <TouchableOpacity
                style={{ padding: 15 }}
                onPress={() => { languageSelectionHandler("si") }}
              >
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <Text style={styles.languageText}>{t('profile.languages.sinhala')}</Text>

                  {
                    select === "si" && (
                      <FeatherIcon name="check" size={s(20)} color={COLORS.btnColor} />
                    )
                  }

                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ padding: 15 }}
                onPress={() => { languageSelectionHandler("ta") }}
              >
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <Text style={styles.languageText}>{t('profile.languages.tamil')}</Text>

                  {
                    select === "ta" && (
                      <FeatherIcon name="check" size={s(20)} color={COLORS.btnColor} />
                    )
                  }

                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ padding: 15 }}
                onPress={() => { languageSelectionHandler("ru") }}
              >
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <Text style={styles.languageText}>{t('profile.languages.russian')}</Text>

                  {
                    select === "ru" && (
                      <FeatherIcon name="check" size={s(20)} color={COLORS.btnColor} />
                    )
                  }

                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ padding: 15 }}
                onPress={() => { languageSelectionHandler("de") }}
              >
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <Text style={styles.languageText}>{t('profile.languages.german')}</Text>

                  {
                    select === "de" && (
                      <FeatherIcon name="check" size={s(20)} color={COLORS.btnColor} />
                    )
                  }

                </View>
              </TouchableOpacity>



              <ButtonComponent

                text={t("profile.confirm")}
                buttonStyle={{ backgroundColor: COLORS.black, borderRadius: s(15), marginTop: vs(25) }}
                textStyle={{ color: COLORS.white, fontSize: s(15), textAlign: "center", padding: s(12) }}
                onPress={handleConfirm}

              />

            </View>

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