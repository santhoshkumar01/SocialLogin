import React from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "./Home"
import AboutUs from './AboutUs'
import UserList from './UserList'

const Tab = createBottomTabNavigator()

export default function Footer() {
    return (
        <Tab.Navigator
            backBehavior='initialRoute'
            initialRouteName="home"
            screenOptions={{
                headerShown: true,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: 60,
                    backgroundColor: 'white'
                },
            }}
        >
            <Tab.Screen
                name="HOME"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Text style={{
                                fontWeight:focused?'bold':null,
                                fontSize:20
                            }}>Home</Text>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="ABOUT US"
                component={AboutUs}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Text style={{
                                fontWeight:focused?'bold':null,
                                fontSize:20
                            }}>About Us</Text>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="USERS LIST"
                component={UserList}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Text style={{
                                fontWeight:focused?'bold':null,
                                fontSize:20
                            }}>Users List</Text>
                        )
                    }
                }}
            />

        </Tab.Navigator>
    )
}