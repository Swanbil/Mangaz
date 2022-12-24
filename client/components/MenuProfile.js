import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from "react-native";
import { Badge, IconButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function UserProfile({ isLog, userInfos }) {
    return (
        <View style={styles.menuProfileContainer}>
            <View style={styles.menuProfileRow}>
                <View style={styles.menuButton}>
                    <Icon name={"wallet"} color={"#333"} size={40} />
                    <Text style={styles.menuTextButton}>Wallet</Text>
                </View>
                <View style={styles.menuButton}>
                    <Icon name={"heart"} color={"#333"} size={40} />
                    <Text style={styles.menuTextButton}>Favoris</Text>
                </View>
            </View>
            <View style={styles.menuProfileRow}>
                <View style={styles.menuButton}>
                    <Icon name={"history"} color={"#333"} size={40} />
                    <Text style={styles.menuTextButton}>Historique</Text>
                </View>
                <View style={styles.menuButton}>
                    <Icon name={"cog"} color={"#333"} size={40} />
                    <Text style={styles.menuTextButton}>Settings</Text>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    menuProfileContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        padding: 10

    },
    menuProfileRow: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    menuButton: {
        backgroundColor: "#F7F7F7",
        margin:10,
        paddingHorizontal:25,
        paddingVertical:25,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        shadowColor: '#C0A6F7',
        width:150,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    menuTextButton: {
        marginTop: 10,
        fontWeight: "bold"
    }
});