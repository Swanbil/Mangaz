import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Link, NavigationContainer } from '@react-navigation/native';
import axios from 'axios';


const Login = ({ navigation }) => {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassWord] = useState("");

    const login = async () => {
        const user = { "pseudo": pseudo, "password": password };
        try {
            const response = await axios.post('http://192.168.1.82:8000/login', user);
            const data = response.data;
            navigation.navigate('Home');
        } catch (error) {
            alert(error.response.data)
        }

    }
    return (
        <View style={styles.loginBlock}>
            <Text style={styles.logo}>MANGAZ</Text>
            <TextInput style={styles.textInput}
                placeholder="Pseudo"
                placeholderTextColor="#C1C1C1"
                onChangeText={(pseudo) => setPseudo(pseudo)} />
            <TextInput style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#C1C1C1"
                secureTextEntry={true}
                onChangeText={(password) => setPassWord(password)} />
            <TouchableOpacity
                style={styles.button}
                onPress={() => login()}
                underlayColor='#fff'>
                <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonRegister}
                onPress={() => navigation.navigate('Register')}
                underlayColor='#fff'
            >
                <Text style={styles.textButton}>Register</Text>
            </TouchableOpacity>


        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        color: "#C0A6F7",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30
    },
    textInput: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 10,
        paddingTop: 10,
        margin: 20,
        width: "60%",
        fontStyle: 'italic',
        backgroundColor: "white",
        borderRadius: 5
    },
    registerText: {
        marginTop: 20,
        fontSize: 10,
        color: "grey",
        fontStyle: 'italic'
    },
    loginBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        marginBottom: 100,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#EBEBEB",
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    button: {
        width: "50%",
        padding: 10,
        backgroundColor: '#C0A6F7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    buttonRegister: {
        width: "50%",
        padding: 10,
        marginTop: 10,
        backgroundColor: '#E5D9FF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: "bold"
    }
});

export default Login;