import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Collapsible from 'react-native-collapsible';
import { getDataUser, storeDataUser } from '../utilities/localStorage';
import axios from 'axios';
import { API_URL } from '@env';
import SubscriptionPlan from '../components/SubscriptionPlan';
import { ActivityIndicator } from 'react-native-paper';


export default function Subscribe({ isLog, userInfos, isSubscribe, getSubState, navigation }) {
    const [subscription, setSubscription] = useState();
    const [subscriptionsPlan, setSubscriptionsPlan] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
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

    const subscribeToPlan = async (idSubscription) => {
        const { userPseudo } = await getDataUser();
        console.log("Subscrie to plan", userPseudo, idSubscription)
        setIsLoading(true);
        const response = await axios.post(`${API_URL}/user/subscribe`, {
            userPseudo: userPseudo,
            idSubscription: idSubscription
        });
        await storeDataUser({
            userPseudo: userPseudo,
            endedDateSubscription: response.data.endedDate
        })
        getSubState(true);
        setIsLoading(false);
    }

    return (

        <View style={styles.container}>
            <TouchableOpacity
                style={{ margin: 20 }}
                underlayColor='#fff' onPress={() => navigation.goBack()}
            >
                <AntDesign name="leftcircleo" size={26} color="#C0A6F7" />
            </TouchableOpacity>

            <View style={styles.subContainer}>
                <View style={styles.pageTitleContainer}>
                    <Icon name={"coins"} color={"#333"} size={20} />
                    <Text style={styles.pageTitle}>Subscription</Text>
                </View>
                {isLoading
                    ? <ActivityIndicator style={{ flex: 1 }} />
                    : (
                        <View style={styles.subContent}>
                            {isSubscribe
                                ? (<>
                                    <View style={[styles.subRow, { flexDirection: 'row', alignItems: 'center' }]}>
                                        <Text style={styles.subLabel}>State : </Text>
                                        <Icon name="check-circle" size={26} color="#95D47F" />
                                    </View>
                                    <View style={styles.subRow}>
                                        <Text style={styles.subLabel}>Subscripion type : </Text>
                                        <Text style={styles.subText}>{subscription?.type}</Text>
                                    </View>
                                    <View style={styles.subRow}>
                                        <Text style={styles.subLabel}>Ended date : </Text>
                                        <Text style={styles.subText}>{new Date(subscription?.endedDate).toDateString()}</Text>
                                    </View>

                                </>)
                                : <>
                                    <View style={[styles.subRow, { flexDirection: 'row', alignItems: 'center' }]}>
                                        <Text style={styles.subLabel}>State : </Text>
                                        <Icon name="times-circle" size={26} color="#FF6868" />
                                    </View>

                                    <TouchableOpacity style={styles.subCollapseButton} onPress={() => setIsCollapsed(prevState => !prevState)}>
                                        <Text style={styles.text}>Subscriptions Plan</Text>
                                        <Icon name={isCollapsed ? "caret-square-down" : "caret-square-up"} size={16} color="#333" style={{ marginLeft: 7 }} />
                                    </TouchableOpacity>

                                    <Collapsible collapsed={isCollapsed} align="center" >
                                        <View style={styles.collapsedContainer}>
                                            <View style={{ padding: 8 }}>
                                                {subscriptionsPlan.map((subscriptionPlan, index) => {
                                                    return (
                                                        <SubscriptionPlan key={index} subscriptionPlan={subscriptionPlan} subscribeToPlan={subscribeToPlan} navigation={navigation}/>

                                                    )
                                                })}
                                            </View>

                                        </View>
                                    </Collapsible>
                                </>
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

    }
});