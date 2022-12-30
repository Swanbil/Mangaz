import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import MangaPage from '../screens/MangaPage';
import History from '../screens/History';
import Wallet from '../screens/Wallet';
import TabNavigator from './TabNavigator';
import Chapter from './Chapter';
import MenuProfile from './MenuProfile';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Settings from '../screens/Settings';
import Subscribe from '../screens/Subscribe';

const Stack = createNativeStackNavigator();
const AppNavigator = ({ isLogedIn, getLogState, userCredentials, isSubscribe, getSubState }) => {
    return (
        <Stack.Navigator
            initialRouteName={isLogedIn ? 'Catalogue' : 'Login'}
            screenOptions={{
                cardStyle: { backgroundColor: 'white' },
                headerStyle: { backgroundColor: '#F6F6F6' },
                cardStyle: { backgroundColor: 'red' },
            }}>
            <Stack.Screen name="TabNavigator" options={{ headerShown: false }}>
                {(props) => <TabNavigator {...props} isLog={isLogedIn} userCredentials={userCredentials} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={getSubState}/>}
            </Stack.Screen>
            <Stack.Screen name="Login" options={({ navigation }) => ({
                headerShown: false
            })}>

                {(props) => <Login {...props} getLogState={getLogState} getSubState={getSubState}/>}
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
                {(props) => <Settings {...props} />}
            </Stack.Screen>
            <Stack.Screen name="MenuProfile" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <MenuProfile {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Wallet" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <Wallet {...props} />}
            </Stack.Screen>
            <Stack.Screen name="History" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <History {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Subscribe" options={({ navigation }) => ({
                headerShown: false
            })} >
                {(props) => <Subscribe {...props} isSubscribe={isSubscribe} getSubState={getSubState}/>}
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