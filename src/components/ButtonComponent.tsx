import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/MaterialIcons'


interface ButtonComponentProps {

    onPress?: () => void
    textStyle?: any
    text?: string
    icon?: string
    buttonStyle?: any
    iconStyle?: any
    vectorIcon?: string
    arrow?: string

}
const ButtonComponent = ({ onPress, textStyle, buttonStyle, text, iconStyle, vectorIcon, arrow, icon }: ButtonComponentProps) => {
    return (


        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            {vectorIcon && (
                <Icon name={vectorIcon} size={25} style={iconStyle} />
            )}

            {icon && <Image source={{ uri: icon }} style={iconStyle} />}

            <Text style={textStyle}>{text}</Text>

            {arrow && (
                <Icon name={arrow} size={25} style={iconStyle} />
            )}
        </TouchableOpacity>

    )
}

export default ButtonComponent

const styles = StyleSheet.create({


})