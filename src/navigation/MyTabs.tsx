import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../styles/colors';
import ProfileScreen from '../screens/ProfileScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Tab = createBottomTabNavigator();
const MyTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.btnColor,
                tabBarInactiveTintColor: COLORS.white,
                tabBarStyle: {
                    backgroundColor: COLORS.black,
                    borderTopWidth: 0,
                    height: 60,
                    paddingBottom: 10,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <FeatherIcon
                            name="home"
                            size={focused ? 28 : 24}
                            color={color}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwsomeIcon
                            name="history"
                            size={focused ? 28 : 24}
                            color={color}
                        />
                    ),
                }}
            />


            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <FeatherIcon name="user" color={color} size={focused ? 28 : 24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MyTabs

const styles = StyleSheet.create({})