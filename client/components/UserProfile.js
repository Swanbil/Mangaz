import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function UserProfile({ isLog, userInfos, isSubscribe, navigation, getLogState, getSubState, stats, onClickButton }) {

    const handlePress = async () => {
        const url = 'https://discord.gg/qgYxvS2j';
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.log(`Lien non valide: ${url}`);
            }
        } catch (error) {
            console.log(`Une erreur s'est produite: ${error}`);
        }
    };

    return (
        <View style={[styles.userProfileContainer]}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <View style={styles.userProfileImage}>
                    <Image source={{ uri: userInfos?.profilepicture }}
                        style={{ width: 79, height: 79, borderRadius: 50, borderWidth: 2, borderColor: '#333' }} />
                    <View style={{ position: 'absolute', left: 70, top: 10 }}>
                        <Badge style={{ color: "white", fontWeight: "bold", backgroundColor: (isSubscribe ? "#9CE594" : "#FFCA68") }}>{isSubscribe ? "V" : "Free"}</Badge>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.userProfileInfos}>
                <View style={styles.blockTextInfos}>
                    <Text style={{ fontSize: 16, fontWeight: '400' }}>{userInfos?.pseudo}</Text>
                </View>
                <View style={styles.blockTextInfos}>
                    <Text style={styles.textLabel}>Mangas read: </Text>
                    <Text style={styles.textInfos}>{stats?.mangasRead}</Text>
                </View>
                <View style={styles.blockTextInfos}>
                    <Text style={styles.textLabel}>Nfts:  </Text>
                    <Text style={styles.textInfos}>{stats?.nfts}</Text>
                </View>
            </View>

            <View style={{ flexDirection:'row' }}>
                <View style={styles.menuButton}>
                    <TouchableOpacity onPress={onClickButton} >
                    <Image source={require('../assets/icon_defis.png')}
                            style={{ width: 29, height: 29, borderRadius: 50 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.menuButton}>
                    <TouchableOpacity onPress={handlePress}>
                        <Image source={{ uri: "https://play-lh.googleusercontent.com/fbrWR4LbtB_1Ulgz3_rw8bY3tx_zPU7A9ZOB5WYG_QmqOUUjA6JEzE_20GA4YBDWMx4" }}
                            style={{ width: 29, height: 29, borderRadius: 50 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    userProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginLeft: 3,
        marginRight: 3,
        borderRadius: 5,
        marginTop: 10
    },
    userProfileImage: {
        padding: 10,
    },
    userProfileInfos: {
        flex: 3,
        flexDirection: 'column',
        marginLeft: 20
    },
    blockTextInfos: {
        flexDirection: "row",
        padding: 3,

    },
    textInfos: {
        fontSize: 13,
        fontWeight: "400",
        color: '#B398CE',
        lineHeight: 15
    },
    textLabel: {
        fontStyle: "italic",
        color: "#424242",
        fontSize: 13,
    },
    borderBottomText: {
        borderBottomColor: "#DCCDFB",
        borderBottomWidth: 2,
    },
    elevation: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#333',
        shadowOpacity: 0.5,
        elevation: 3
    },
    menuButton: {
        marginLeft: 10,
        padding: 5,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 15,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 2,
        shadowColor: '#333',
        shadowOpacity: 0.1,
    }

})