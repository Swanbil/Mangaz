import React from 'react';
import Home from '../screens/HomeScreen';
import HeaderNavigator from './HeaderNavigator';
import ProfilePage from '../screens/ProfileScreen';
import Favoris from '../screens/FavorisScreen';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import { IconButton } from 'react-native-paper';
import MangaHomePage from '../screens/MangaHomeScreen';


const Tab = createBottomTabNavigator();

const Tabs = ({ getLogState, isLog, isSubscribe, getSubState }) => {
    return (
        <Tab.Navigator
            screenOptions={({ navigation, route }) => ({
                header: ({ navigation, route, options }) => {
                    const title = getHeaderTitle(options, route.name);
                    return <HeaderNavigator title={title} />;
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home-circle'
                            : 'home-circle-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'account-circle' : 'account-circle-outline';
                    }
                    else if (route.name === 'Favoris') {
                        iconName = focused ? 'heart-circle' : 'heart-circle-outline';
                    }
                    else if (route.name === 'MangaHome') {
                        iconName = focused ? 'book-open-page-variant' : 'book-open-variant';
                    }

                    // You can return any component that you like here!
                    return <IconButton icon={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#C0A6F7',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
            })}
        >

            {isLog
                ? (
                    <>
                        <Tab.Screen name="MangaHome">
                            {(props) => <MangaHomePage {...props} isLog={isLog} isSubscribe={isSubscribe} />}
                        </Tab.Screen>
                        <Tab.Screen name="Home">
                            {(props) => <Home {...props} isLog={isLog} isSubscribe={isSubscribe} getLogState={getLogState} getSubState={getSubState} />}
                        </Tab.Screen>
                        <Tab.Screen name="Favoris">
                            {(props) => <Favoris {...props} isLog={isLog} />}
                        </Tab.Screen>
                        
                    </>

                )
                : (<></>)
            }

        </Tab.Navigator >
    );
}
const styles = StyleSheet.create({

});
export default Tabs;