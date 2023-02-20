import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from "react-native";
import { Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function UserProfile({ isLog, userInfos, isSubscribe, navigation }) {

    return (
        <View style={[styles.userProfileContainer]}>
            <View style={styles.userProfileImage}>
                <Image source={{ uri: "https://img.wattpad.com/6d13c0a6090e0e3b8851180426edf247b461205f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f376a68464955746e42735a3750773d3d2d3937393137353136322e313634356663326464396631393063383933353132383638303036322e6a7067?s=fit&w=720&h=720" }}
                    style={{ width: 79, height: 79, borderRadius: 50, borderWidth: 2, borderColor: '#333' }} />
                <View style={{ position: 'absolute', left: 50, top: 10 }}>
                    <Badge style={{ color: "white", fontWeight: "bold", backgroundColor: (isSubscribe ? "#9CE594" : "#FFCA68") }}>{isSubscribe ? "Premium" : "Free"}</Badge>
                </View>
            </View>
            <View style={styles.userProfileInfos}>
                <View style={styles.blockTextInfos}>
                    <Text style={{ fontSize: 16, fontWeight: '400' }}>{userInfos?.pseudo}</Text>
                </View>
                <View style={styles.blockTextInfos}>
                    <Text style={styles.textLabel}>Mangas read: </Text>
                    <Text style={styles.textInfos}>120</Text>
                </View>
                <View style={styles.blockTextInfos}>
                    <Text style={styles.textLabel}>Nfts:  </Text>
                    <Text style={styles.textInfos}>3</Text>
                </View>
            </View>

            <View style={styles.menuButton}>
                <Icon name={"list-alt"} color={"#333"} size={22} onPress={() => navigation.navigate('Settings')} />
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
        marginRight: 30,
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