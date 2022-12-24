import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from "react-native";
import { Badge } from 'react-native-paper'

export default function UserProfile({ isLog, userInfos }) {

    return (
        <View style={[styles.userProfileContainer]}>
            <View style={styles.userProfileImage}>
                <Image source={{ uri: "https://img.wattpad.com/6d13c0a6090e0e3b8851180426edf247b461205f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f376a68464955746e42735a3750773d3d2d3937393137353136322e313634356663326464396631393063383933353132383638303036322e6a7067?s=fit&w=720&h=720" }}
                    style={{ width: 100, height: 100, borderRadius: 50 }} />
            </View>
            <View style={styles.userProfileInfos}>
                <View style={styles.blockTextInfos}>
                    <Text style={styles.textLabel}>Lastname : </Text>
                    <View style={styles.borderBottomText}>
                        <Text style={styles.textInfos}>{userInfos?.lastname}</Text>
                    </View>
                </View>
                <View style={styles.blockTextInfos}>
                    <Text style={styles.textLabel}>Firstname : </Text>
                    <View style={styles.borderBottomText}>
                        <Text style={styles.textInfos}>{userInfos?.firstname}</Text>

                    </View>
                </View>
                <View style={styles.blockTextInfos}>
                    <Text style={styles.textLabel}>Email : </Text>
                    <View style={styles.borderBottomText}>
                        <Text style={styles.textInfos}>{userInfos?.email}</Text>

                    </View>
                </View>
                <View style={styles.blockTextInfos}>
                    <Text style={styles.textLabel}>Pseudo : </Text>
                    <View style={styles.borderBottomText}>
                        <Text style={styles.textInfos}>{userInfos?.pseudo}</Text>

                    </View>
                </View>
                <View style={styles.blockTextInfos}>
                    <Badge style={{ color: "white", fontWeight: "bold", backgroundColor: "#C7F8A7" }}>Premium</Badge>
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
        borderBottomColor: '#F1F1F1',
        borderBottomWidth: 2,
    },
    userProfileImage: {
        backgroundColor: "#F7F7F7",
        padding: 10,
    },
    userProfileInfos: {
        flex: 3,
        flexDirection: 'column',
        marginLeft: 60,
    },
    blockTextInfos: {
        flexDirection: "row",
        padding: 3,

    },
    textInfos: {
        fontSize: 13,
        fontWeight: "bold"
    },
    textLabel: {
        fontStyle: "italic",
        color: "#9B9A9A",
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

})