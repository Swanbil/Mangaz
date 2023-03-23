import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Collapsible from 'react-native-collapsible';
import { getDataUser, storeDataUser } from '../utilities/localStorage';
import axios from 'axios';
import { API_URL } from '@env';
import SubscriptionPlan from '../components/SubscriptionPlan';
import { ActivityIndicator, Badge } from 'react-native-paper';


export default function Subscribe({ isLog, userInfos, isSubscribe, getSubState, navigation }) {
    const [subscription, setSubscription] = useState();
    const [subscriptionsPlan, setSubscriptionsPlan] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getUserSubscription();
        getSubscriptionsPlan();
    }, [isSubscribe])

    const getUserSubscription = async () => {
        const { userPseudo } = await getDataUser();
        const response = await axios.get(`${API_URL}/user/${userPseudo}/subscribe`);
        setSubscription(response.data.subscription);
    }
    const getSubscriptionsPlan = async () => {
        const response = await axios.get(`${API_URL}/subscription/plan`);
        setSubscriptionsPlan(response.data.subscriptionsPlan);
    }


    return (

        <View >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ margin: 20 }}
                    underlayColor='#fff' onPress={() => navigation.goBack()}
                >
                    <AntDesign name="leftcircleo" size={26} color="#C0A6F7" />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: '600' }}>{isSubscribe ? "Statut premium 🔥":"Passez au Premium 🚀"}</Text>
            </View>


            <View >
                {isLoading
                    ? <ActivityIndicator style={{ flex: 1 }} />
                    : (
                        <View>
                            {isSubscribe
                                ? (<View style={styles.subContainer}>
                                    <View style={[styles.subRow, { flexDirection: 'row', alignItems: 'center' }]}>
                                        <Text style={styles.subLabel}>State : </Text>
                                        <Icon name="check-circle" size={26} color="#95D47F" />
                                    </View>
                                    <View style={styles.subRow}>
                                        <Text style={styles.subLabel}>Subscripion type : </Text>
                                        <Text style={styles.subText}>{subscription?.type}</Text>
                                    </View>
                                    <View style={styles.subRow}>
                                        <Text style={styles.subLabel}>Next payment : </Text>
                                        <Text style={styles.subText}>{new Date(subscription?.endedDate).toDateString()}</Text>
                                    </View>

                                </View>)
                                : <View style={styles.container}>
                                    <ImageBackground source={{ uri: "https://otakukart.com/wp-content/uploads/2022/06/best-action-manga-to-read-in-2022.jpg" }} style={{ width: 361, height: 530 }} imageStyle={{ borderRadius: 36 }} resizeMode='cover' blurRadius={8}>
                                        <Text style={{ color: 'white', fontWeight: '700', textAlign: 'center', fontSize: 24, marginTop: 5 }}>Services</Text>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                                <View style={styles.userProfileImage}>
                                                    <Image source={{ uri: "https://img.wattpad.com/6d13c0a6090e0e3b8851180426edf247b461205f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f376a68464955746e42735a3750773d3d2d3937393137353136322e313634356663326464396631393063383933353132383638303036322e6a7067?s=fit&w=720&h=720" }}
                                                        style={{ width: 79, height: 79, borderRadius: 50, borderWidth: 2, borderColor: '#333' }} />
                                                    <View style={{ position: 'absolute', left: 70, top: 10 }}>
                                                        <Image source= {require("../assets/Verified.png")} style={{width : 26, height : 26 }}/>
                                                    </View>
                                                </View>
                                                <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center', fontSize: 20 }}>Badge premium</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                                <View style={styles.userProfileImage}>
                                                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/234/234635.png" }}
                                                        style={{ width: 79, height: 79, borderRadius: 50, borderWidth: 2, borderColor: '#333' }} />
                                                </View>
                                                <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center', fontSize: 20 }}>Lecture illimitée</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                                <View style={styles.userProfileImage}>
                                                    <Image source={{ uri: "https://thumbs.dreamstime.com/b/no-ads-sign-web-browser-red-crossed-round-button-adblock-prohibited-forbidden-ad-icon-remove-advertisement-symbol-bl-block-265285657.jpg" }}
                                                        style={{ width: 79, height: 79, borderRadius: 50, borderWidth: 2, borderColor: '#333' }} />
                                                </View>
                                                <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center', fontSize: 20 }}>Pas de pub</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                                <View style={styles.userProfileImage}>
                                                    <Image source={{ uri: "https://img.freepik.com/premium-vector/modern-badge-discord-icon_578229-169.jpg?w=2000" }}
                                                        style={{ width: 79, height: 79, borderRadius: 50, borderWidth: 2, borderColor: '#333' }} />
                                                </View>
                                                <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center', fontSize: 20 }}>Nouveaux rôles + channels</Text>
                                            </View>

                                        </View>
                                    </ImageBackground>
                                    <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity style={{ backgroundColor: '#A2B2FC', padding: 5, borderRadius: 25, width: 133, height:43}}  onPress={() => navigation.navigate('Payment', { subscriptionPlan : subscriptionsPlan[0] })}>
                                            <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center', fontSize: 12 }}>Premium</Text>
                                            <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center', fontSize: 12 }}>Pour 9.99€/mois</Text>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </View>

                    )
                }


            </View>

        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    subContainer: {
        padding: 20
    },
    pageTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#C0A6F7",
        borderBottomWidth: 3,
        width: "48%",
        paddingBottom: 6
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 5
    },
    subCollapseButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderBottomColor: '#DBCBFD',
        borderBottomWidth: 2
    },
    subButton: {
        width: "20%",
        padding: 10,
        backgroundColor: '#C0A6F7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    subContent: {
        padding: 8,
        flexDirection: 'column'
    },
    subRow: {
        marginBottom: 15,
        backgroundColor: '#F7F7F7',
        padding: 10,
        borderRadius: 10,
    },
    subLabel: {
        color: 'grey',
        fontStyle: 'italic',
        fontSize: 16
    },
    subText: {
        fontWeight: '500',
        fontSize: 16,
        marginTop: 4,
        flexWrap: 'wrap'
    },
    text: {
        fontSize: 16,
    },
    collapsedContainer: {
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        marginTop: 6

    },
    userProfileImage: {
        padding: 10,
    },
});