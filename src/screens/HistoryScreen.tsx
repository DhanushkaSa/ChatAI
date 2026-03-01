import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { COLORS } from '../styles/colors';


const getUserData = (userId: any) => {
    useEffect(() => {
        const subscriber = firestore()
            .collection('Users')
            .onSnapshot(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    console.log('User: ', doc.data());
                });
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [userId]);
}
const HistoryScreen = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { getUserData }}>
                <Text style={{ color: COLORS.white }}>HistoryScreen</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        justifyContent: "center",
        alignItems: "center",
    }
})