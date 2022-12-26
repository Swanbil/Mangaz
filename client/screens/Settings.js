import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({ navigation, isLog, getLogState }) {
    const [userName, setUserName] = useState("");

    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('@username');
            if (value !== null) {
                setUserName(value)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        getLogState(false);
        await AsyncStorage.removeItem('@username')
    }
    useEffect(() => {
        //_retrieveData();
    })
    if (isLog) {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{ margin: 20 }}
                    underlayColor='#fff' onPress={() => navigation.goBack()}
                >
                    <AntDesign name="leftcircleo" size={26} color="#C0A6F7" />
                </TouchableOpacity>
                <View style={styles.settingBlock}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign name="user" size={24} color="#C0A6F7" style={{ marginRight: 10 }} />
                        <Text style={styles.settingTitle}>User informations</Text>
                    </View>
                    <Text style={styles.settingInfo}>Username : {userName}</Text>
                </View>
                <View style={styles.settingBlock}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="user-plus" size={24} color="#C0A6F7" style={{ marginRight: 10 }} />
                        <Text style={styles.settingTitle}>Premium</Text>
                    </View>
                    <Text style={styles.settingInfo}>Premium : No </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}
                        underlayColor='#fff'>
                        <Text style={styles.textButton}>Subscribe Premium Account </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingBlock}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign name="playcircleo" size={24} color="#C0A6F7" style={{ marginRight: 10 }} />
                        <Text style={styles.settingTitle}>Actions</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={logout}
                        underlayColor='#fff'>
                        <Text style={styles.textButton}>Logout </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{ margin: 20 }}
                    underlayColor='#fff' onPress={() => navigation.goBack()}
                >
                    <AntDesign name="leftcircleo" size={26} color="#C0A6F7" />
                </TouchableOpacity>
                <View style={styles.settingBlock}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AntDesign name="user" size={24} color="#C0A6F7" style={{ marginRight: 10 }} />
                        <Text style={styles.settingTitle}>User informations</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}
                        underlayColor='#fff'>
                        <Text style={styles.textButton}>Go To Login Page </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingBlock}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="user-plus" size={24} color="#C0A6F7" style={{ marginRight: 10 }} />
                        <Text style={styles.settingTitle}>Premium</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}
                        underlayColor='#fff'>
                        <Text style={styles.textButton}>Subscribe Premium Account </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    settingTitle: {
        fontWeight: "bold",
        fontSize: 15
    },
    settingBlock: {
        padding: 20,
    },
    settingInfo: {
        fontSize: 14,
        padding: 15,
        fontWeight: "bold",
        color: "#686868"
    },
    logoutBtn: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#EA5F5F',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
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
        paddingRight: 10
    }
});
