import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { vs } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Feather'

interface InputTextProps {

    placeholder?: string
    secureTextEntry?: boolean
    style?: any
    keyboardType?: any
    value?: string
    onChangeText?: (text: string) => void
    icon?: any
    placeholderTextColor?: string


}
const InputText = ({ placeholder, placeholderTextColor, secureTextEntry, style, keyboardType, value, onChangeText, icon }: InputTextProps) => {

    const [hidePassword, setHidePassword] = useState(secureTextEntry)

    return (

        <View style={{ width: "95%" }}>
            {
                icon && <View style={styles.icon}>{icon}</View>
            }
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={hidePassword}
                style={[styles.input, style]}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="none"
                autoCorrect={false}

            />

            {secureTextEntry && (
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setHidePassword(!hidePassword)}
                >
                    <Icon name={hidePassword ? "eye-off" : "eye"} size={20} color="#999" />
                </TouchableOpacity>
            )}
        </View>





    )
}

export default InputText

const styles = StyleSheet.create({
    input: {
        height: 45,
        margin: 12,
        borderWidth: 1,
        marginTop: vs(50),
        padding: 15,
        borderRadius: 15
    },
    icon: {
        position: 'absolute',
        left: 30,
        top: '50%',
        transform: [{ translateY: -15 }],
        zIndex: 1,
    },

    eyeIcon: {
        position: 'absolute', right: 30, top: '50%', transform: [{ translateY: -10 }],
    }
})