import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import MangaPage from '../screens/MangaPage';
import TabNavigator from './TabNavigator';
import Chapter from './Chapter';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    const [isLog, setIsLog] = useState(false);

    useEffect(() => {
        setUserLogState();
    }, []);

    const setUserLogState = async() => {
        const userPseudo = await AsyncStorage.getItem('@username');
        console.log(userPseudo);
        if(userPseudo !== undefined && userPseudo !== null){
            console.log("oui", userPseudo);
            setIsLog(true);
        }
        setIsLog(false);
    }

    const getLogState = (data) => {
        setIsLog(data);
    }
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: 'white' },
                headerStyle: { backgroundColor: '#F6F6F6' },
                cardStyle: { backgroundColor: 'red' },
            }}>
            <Stack.Screen name="TabNavigator" options={{ headerShown: false }}>
                {(props) => <TabNavigator {...props} isLog={isLog}  getLogState={getLogState}/>}
            </Stack.Screen>
            <Stack.Screen name="Login" options={({ navigation }) => ({
                headerLeft: props => (
                    <TouchableOpacity
                        underlayColor='#fff' onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="cancel" color="#C0A6F7" size={24} />
                    </TouchableOpacity>
                )
            })}>

                {(props) => <Login {...props} getLogState={getLogState} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register}
                options={({ navigation }) => ({
                    headerLeft: props => (
                        <TouchableOpacity
                            underlayColor='#fff' onPress={() => navigation.navigate('Home')}
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
        </Stack.Navigator>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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