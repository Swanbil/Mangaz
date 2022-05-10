import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");
    return (
        <View style={styles.loginBlock}>
            <TextInput style={styles.textInput}
                placeholder="Username"
                placeholderTextColor="#003f5c"
                onChangeText={() => setUserName(username)} />
            <TextInput style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                onChangeText={() => setPassWord(password)} />
            <TouchableOpacity
                style={styles.button}
                onPress={() => alert("Login successfully " + {username})}
                underlayColor='#fff'>
                <Text style={styles.textButton}>Login</Text>
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
    textInput: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 10,
        paddingTop: 10,
        margin:20,
        backgroundColor:"white",
        borderRadius:5
    },
    loginBlock:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#C0A6F7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
      },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontWweight: "bold"
    }
});

export default Login;