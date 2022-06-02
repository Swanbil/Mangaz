import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';
import TabNavigator from './TabNavigator';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: 'white' },
                headerStyle: { backgroundColor: '#F6F6F6' },
                cardStyle: { backgroundColor: 'red' }
            }}>
            <Stack.Screen name="TabNavigator" options={{ headerShown: false }} component={TabNavigator} />
            <Stack.Screen name="Login" component={Login}
                options={({ navigation }) => ({
                    headerLeft: props => (
                        <TouchableOpacity
                            underlayColor='#fff' onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="cancel" color="#C0A6F7" size={32} />
                        </TouchableOpacity>
                    )
                })} />
            <Stack.Screen name="Register" component={Register}
                options={({ navigation }) => ({
                    headerLeft: props => (
                        <TouchableOpacity
                            underlayColor='#fff' onPress={() => navigation.navigate('Home')}
                        >
                            <MaterialIcons name="cancel" color="#C0A6F7" size={32} />
                        </TouchableOpacity>
                    )
                })} />
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