import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import MangaPage from '../screens/MangaScreen';
import History from '../screens/HistoryScreen';
import TabNavigator from './TabNavigator';
import Chapter from './Chapter';
import MenuProfile from './MenuProfile';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Settings from '../screens/SettingsScreen';
import Subscribe from '../screens/SubscribeScreen';
import Payment from '../screens/PaymentScreen';
import ProfilePage from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import BuyToken from '../screens/BuyTokenScreen';
import DisplayNft from '../screens/DisplayNftScreen';
import ExchangeCard from '../screens/ExchangeCardsScreen';
import Gallery from '../screens/GalleryScreen';
import OpenPack from '../screens/OpenPackScreen';
import PackList from '../screens/PackListScreen';
import FocusPack from '../screens/FocusPackScreen';
import DisplayShopCard from '../screens/DisplayShopCardScreen';

const Stack = createNativeStackNavigator();
const AppNavigator = ({ isLogedIn, getLogState, userCredentials, isSubscribe, getSubState }) => {
    return (
        <Stack.Navigator
            initialRouteName={isLogedIn ? 'Home' : 'Login'}
            screenOptions={{
                cardStyle: { backgroundColor: 'white' },
                headerStyle: { backgroundColor: '#F6F6F6' },
                cardStyle: { backgroundColor: 'red' },
            }}>
            {isLogedIn
                ?
                <Stack.Screen name="TabNavigator" options={{ headerShown: false }}>
                    {(props) => <TabNavigator {...props} isLog={isLogedIn} userCredentials={userCredentials} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={getSubState} />}
                </Stack.Screen>
                : <></>
            }
            <Stack.Screen name="Login" options={({ navigation }) => ({
                headerShown: false
            })}>

                {(props) => <Login {...props} getLogState={getLogState} getSubState={getSubState} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register}
                options={({ navigation }) => ({
                    headerLeft: props => (
                        <TouchableOpacity
                            underlayColor='#fff' onPress={() => navigation.navigate('Login')}
                        >
                            <MaterialIcons name="cancel" color="#C0A6F7" size={24} />
                        </TouchableOpacity>
                    )

                })} />
            <Stack.Screen name="MangaPage" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <MangaPage {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Chapter" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <Chapter {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Settings" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <Settings {...props} isLog={isLogedIn} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={getSubState}/>}
            </Stack.Screen>
            <Stack.Screen name="MenuProfile" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <MenuProfile {...props} />}
            </Stack.Screen>
            
            <Stack.Screen name="History" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <History {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Subscribe" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <Subscribe {...props} isSubscribe={isSubscribe} getSubState={getSubState} />}
            </Stack.Screen>
            <Stack.Screen name="Payment" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <Payment {...props} isSubscribe={isSubscribe} getSubState={getSubState} />}
            </Stack.Screen>
            <Stack.Screen name="Profile" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <ProfilePage {...props} isLog={isLogedIn} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={getSubState} />}
            </Stack.Screen>
            <Stack.Screen name="Search" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <SearchScreen {...props} isLog={isLogedIn} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={getSubState} />}
            </Stack.Screen>
            <Stack.Screen name="PackList" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <PackList {...props} isLog={isLogedIn} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={getSubState} />}
            </Stack.Screen>
            <Stack.Screen name="FocusPackScreen" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => < FocusPack{...props} isLog={isLogedIn} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={getSubState} />}
            </Stack.Screen>
            <Stack.Screen name="OpenPackScreen" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <OpenPack{...props} isLog={isLogedIn} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={getSubState} />}
            </Stack.Screen>
            <Stack.Screen name="DisplayNftScreen" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <DisplayNft{...props} isLog={isLogedIn} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={getSubState} />}
            </Stack.Screen>
            <Stack.Screen name="GalleryScreen" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <Gallery{...props} isLog={isLogedIn} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={getSubState} />}
            </Stack.Screen>
            <Stack.Screen name="DisplayShopCardScreen" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <DisplayShopCard{...props} isLog={isLogedIn} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={getSubState} />}
            </Stack.Screen>
            <Stack.Screen name="BuyTokenScreen" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <BuyToken{...props} isLog={isLogedIn} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={getSubState} />}
            </Stack.Screen>
            
        </Stack.Navigator>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10
    },
    textHeader: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
    headerStyle: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default AppNavigator;