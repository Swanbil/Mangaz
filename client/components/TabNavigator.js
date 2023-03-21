import React from 'react';
import Home from '../screens/HomeScreen';
import HeaderNavigator from './HeaderNavigator';
import ProfilePage from '../screens/ProfileScreen';
import Favoris from '../screens/FavorisScreen';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import { IconButton } from 'react-native-paper';
import MangaHomePage from '../screens/MangaHomeScreen';
import Wallet from '../utilities/Wallet';
import Web3Home from '../screens/Web3Home';


const Tab = createBottomTabNavigator();

const Tabs = ({ getLogState, isLog, isSubscribe, getSubState }) => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ navigation, route }) => ({
                header: ({ navigation, route, options }) => {
                    const title = getHeaderTitle(options, route.name);
                    return <HeaderNavigator title={title} />;
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let source;
                    if (route.name === 'Home') {
                      source = focused ? require('../assets/HomeFocus.png') : require('../assets/home.png');
                    } 
                    // else if (route.name === 'Profile') {
                    //   source = focused ? require('../assets/profile-icon-focused.png') : require('../assets/profile-icon.png');
                    // } 
                    else if (route.name === 'Web3Home') {
                      source = focused ? require('../assets/EthereumFocus.png') : require('../assets/Ethereum.png');
                    } else if (route.name === 'MangaHome') {
                      source = focused ? require('../assets/MangaFocus.png') : require('../assets/Manga.png');
                    }
                    return <Image source={source} style={{ width: size, height: size }} />;
                  },
                  
                tabBarActiveTintColor: '#333',
                tabBarInactiveTintColor: 'white',
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { position: 'absolute', bottom: 10, marginHorizontal: 30, backgroundColor: '#CFB2E1', borderRadius: 32, height: 60, opacity: 0.95 }

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
                        <Tab.Screen name="Web3Home">
                            {(props) => <Web3Home {...props} />}
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