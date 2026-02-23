import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding from '../screens/OnBoarding';
import LoginScreen from '../screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';



const Stack = createStackNavigator();
const MyStack = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const checkOnboarding = async () => {
            const value = await AsyncStorage.getItem('hasSeenOnboarding');
            setShowOnboarding(value !== 'true');
            setIsLoading(false);
        };

        checkOnboarding();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {showOnboarding && (
                <Stack.Screen name="OnBoarding" component={OnBoarding} />
            )}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />

        </Stack.Navigator>
    )
}

export default MyStack

const styles = StyleSheet.create({})