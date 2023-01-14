import { StripeProvider, CardForm, useConfirmPayment } from '@stripe/stripe-react-native';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { API_URL, STRIPE_PUB_KEY_TEST} from '@env';
import axios from 'axios';
import { getDataUser, storeDataUser } from '../utilities/localStorage';

export default function Subscribe({ isLog, isSubscribe, getSubState, navigation, route }) {
    const [card, setCard] = useState();
    const { confirmPayment, loading } = useConfirmPayment();
    const [responsePayment, setResponsePayment] = useState();

    const { subscriptionPlan } = route.params;

    const fetchPaymentIntentClientSecret = async () => {
        const response = await axios.post(`${API_URL}/create-payment-intent`, { items: card });
        const { clientSecret } = response.data;
        return clientSecret;
    }

    const subscribeToPlan = async (userPseudo) => {
        const response = await axios.post(`${API_URL}/user/subscribe`, {
            userPseudo: userPseudo,
            idSubscription: subscriptionPlan.idSubscription
        });
        await storeDataUser({
            userPseudo: userPseudo,
            endedDateSubscription: response.data.endedDate
        })
        getSubState(true);
    }

    const handlePayment = async () => {
        if (!card) {
            return;
        }
        setResponsePayment({})
        const { userPseudo } = await getDataUser();
        const billingDetails = {
            email: `${userPseudo}@example.com`,
            name : userPseudo
        };

        const clientSecret = await fetchPaymentIntentClientSecret();
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
            paymentMethodType: 'Card',
            paymentMethodData: {
                billingDetails,
            },
        });

        if (error) {
            setResponsePayment({
                status : "Error",
                message : error.message
            });
        } else if (paymentIntent) {
            if (paymentIntent.status === "Succeeded") {
                //subscribe user
                await subscribeToPlan(userPseudo);
                setResponsePayment({
                    status : paymentIntent.status,
                    message : `Payment ${paymentIntent.status}. You will be redirected to the home page`
                })
                setTimeout(() => {
                    navigation.navigate('Catalogue')
                }, 6000);
            }
        }
    }

    return (
        <StripeProvider
            publishableKey={STRIPE_PUB_KEY_TEST}
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
        >
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
                        <Text style={styles.pageTitle}>Payment</Text>
                    </View>
                    <View style={{ padding: 10, backgroundColor: '#E4E4E4', marginTop: 8, borderRadius: 15 }}>
                        <View>
                            <Text>Cart</Text>
                            <View style={styles.subRow}>
                                <Text style={styles.subLabel}>Subscripion type : </Text>
                                <Text style={styles.subText}>{subscriptionPlan?.type}</Text>
                            </View>
                            <View style={styles.subRow}>
                                <Text style={styles.subLabel}>Price : </Text>
                                <Text style={styles.subText}>{subscriptionPlan?.price}</Text>
                            </View>

                        </View>
                    </View>
                    <View style={{ padding: 10, backgroundColor: '#E4E4E4', marginTop: 8, borderRadius: 15 }}>
                        <CardForm
                            cardStyle={{
                                backgroundColor: '#333',
                                textColor: '#FFF',
                            }}
                            onFormComplete={(cardDetails) => {
                                console.log('card details', cardDetails);
                                setCard(cardDetails);
                            }}
                            style={{ height: 200, marginVertical: 15 }}
                        />

                        {loading
                            ? (<ActivityIndicator style={{ flex: 1 }} />)
                            : (<TouchableOpacity style={{ ...styles.subButton, ...{ opacity: (loading || !card) ? 0.3 : 1 } }} onPress={handlePayment} disabled={loading || !card}>
                                <Text style={[styles.text, { fontWeight: '500', textAlign: 'center' }]}>Pay</Text>
                            </TouchableOpacity>)
                        }
                    </View>
                </View>
                <Text style={{ color: responsePayment?.status === "Succeeded" ? "#C0E78D" : "#F5817F" , fontWeight: '500', textAlign:'center' }}>{responsePayment?.message}</Text>
            </View>

        </StripeProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subButton: {
        width: "40%",
        padding: 8,
        backgroundColor: '#C0A6F7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 5,
        alignSelf: 'center'
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
    subContainer: {
        padding: 20
    },
    subText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold'
    },
    subLabel: {
        color: '#DBCBFD',
        fontSize: 16,
        fontStyle: 'italic'
    },
    subRow: {
        marginTop: 8,
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 10
    },
});
