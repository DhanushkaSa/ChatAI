import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s } from 'react-native-size-matters'


interface ButtonComponentProps {

    onPress?: () => void
    textStyle?: any
    text?: string
    icon?: string
    buttonStyle?: any
    iconStyle?: any

}
const ButtonComponent = ({ onPress, textStyle, buttonStyle, text, icon, iconStyle }: ButtonComponentProps) => {
    return (


        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            {icon && <Image source={{ uri: icon }} style={iconStyle} />}
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>

    )
}

export default ButtonComponent

const styles = StyleSheet.create({


})