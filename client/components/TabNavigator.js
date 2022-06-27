import React from 'react';
import Home from './Home';
//import MangaReader from './Chapter';
import HeaderNavigator from './HeaderNavigator';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Tabs = ({ isLog }) => {
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
                    } else if (route.name === 'MangaReader') {
                        iconName = focused ? 'ios-reader' : 'ios-reader-outline';
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
            {/* <Tab.Screen name="MangaReader" component={MangaReader} /> */}
        </Tab.Navigator >
    );
}
const styles = StyleSheet.create({

});
export default Tabs;