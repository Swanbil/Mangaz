import React from 'react';
import Home from '../screens/Home';
import HeaderNavigator from './HeaderNavigator';
import Settings from '../screens/Settings';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Tabs = ({ getLogState, isLog }) => {
    return (
        <Tab.Navigator

            screenOptions={({ navigation, route }) => ({
                header: ({ navigation, route, options }) => {
                    const title = getHeaderTitle(options, route.name);
                    return <HeaderNavigator title={title}  />;
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home'
                            : 'ios-home-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#C0A6F7',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home">
                {(props) => <Home {...props} isLog={isLog} />}
            </Tab.Screen>
            <Tab.Screen name="Settings">
             {(props) => <Settings {...props} isLog={isLog} getLogState={getLogState}/>}    
            </Tab.Screen> 
        </Tab.Navigator >
    );
}
const styles = StyleSheet.create({

});
export default Tabs;