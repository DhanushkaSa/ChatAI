import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { getAuth } from '@react-native-firebase/auth';
import { COLORS } from '../styles/colors';
import { s, vs } from 'react-native-size-matters';
import { useAuth } from '../context/AuthContext';
import FeatherIcon from "react-native-vector-icons/Feather"
import { useSelector } from 'react-redux';
import ButtonComponent from '../components/ButtonComponent';

const ProfileScreen = () => {

  const authContext = useAuth();
  const user = authContext?.user;
  const email = user?.email
  const name = email?.split('@')[0]
  const profileImage = user?.photoURL

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Profile</Text>
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

      <ButtonComponent text="Language" textStyle={{ color: COLORS.white, fontSize: s(15) }} buttonStyle={{
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




      />

      <ButtonComponent text="Logout" textStyle={{ color: COLORS.white, fontSize: s(15) }} buttonStyle={{
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

      <ButtonComponent text="Support & Help" textStyle={{ color: COLORS.white, fontSize: s(15) }} buttonStyle={{
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
  }
})