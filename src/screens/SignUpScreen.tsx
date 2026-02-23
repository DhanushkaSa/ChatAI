import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Fontisto'
import { COLORS } from '../styles/colors'
import { s, vs } from 'react-native-size-matters'
import InputText from '../components/InputText'
import Lock from 'react-native-vector-icons/Feather'
import ButtonComponent from '../components/ButtonComponent'
import IconConfirm from "react-native-vector-icons/MaterialIcons"
import auth from '@react-native-firebase/auth';
const SignUpScreen = ({ navigation }: any) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const createUser = async () => {
        try {

            if (password !== confirmPassword) {
                Alert.alert("Password mismatched!!!");

            } else {
                await auth().createUserWithEmailAndPassword(
                    email,
                    password
                );
                Alert.alert('Registered Successfully!');



            }

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
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>Enter your details</Text>



                <InputText
                    placeholder="Enter Email"
                    secureTextEntry={false}
                    style={{ marginTop: vs(5), borderWidth: 1, borderColor: COLORS.textColor, paddingLeft: s(45), width: "95%", height: vs(40), color: COLORS.white, fontSize: s(15) }}
                    placeholderTextColor={COLORS.textColor}
                    keyboardType="email-address"
                    icon={<Icon name="email" size={s(20)} color={COLORS.textColor} />}
                    value={email}
                    onChangeText={(e) => setEmail(e)}
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

                <InputText
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    style={{ marginTop: vs(5), borderWidth: 1, borderColor: COLORS.textColor, paddingLeft: s(45), width: "95%", height: vs(40), color: COLORS.white, fontSize: s(15) }}
                    placeholderTextColor={COLORS.textColor}
                    keyboardType="default"
                    icon={<IconConfirm name="password" size={s(20)} color={COLORS.textColor} />}
                    value={confirmPassword}
                    onChangeText={(p) => setConfirmPassword(p)}
                />

                <ButtonComponent
                    onPress={createUser}
                    text="Sign Up"
                    buttonStyle={{ marginTop: vs(10), width: s(315), height: vs(40), borderRadius: 10, backgroundColor: COLORS.btnColor }}
                    textStyle={{ textAlign: "center", paddingTop: vs(8), fontSize: s(18), color: COLORS.white }}

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
                        Already have an account?
                    </Text>

                    <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                        <Text
                            style={{
                                fontSize: s(15),
                                color: COLORS.btnColor,
                                marginLeft: s(5),
                            }}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>











            </View>



        </KeyboardAvoidingView>
    )
}

export default SignUpScreen

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
    },
    inner: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: COLORS.black,
    }
})