import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function SubscriptionPlan({ subscriptionPlan, subscribeToPlan }) {

    return (
        <View style={styles.subPlanContainer}>
            <Text style={{fontSize:20, color:'white', fontWeight:'bold', textAlign:'center'}}>Premium</Text>
            <View style={styles.subRow}>
                <Text style={styles.subLabel}>Subscripion type : </Text>
                <Text style={styles.subText}>{subscriptionPlan?.type}</Text>
            </View>
            <View style={styles.subRow}>
                <Text style={styles.subLabel}>Price : </Text>
                <Text style={styles.subText}>{subscriptionPlan?.price}</Text>
            </View>

            <TouchableOpacity style={styles.subButton} onPress={() => subscribeToPlan(subscriptionPlan.idSubscription)}>
                <Text style={[styles.text, { fontWeight: '500', textAlign: 'center' }]}>Pay</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    subPlanContainer:{
        backgroundColor:'#333',
        padding:8,
        borderRadius:5,
        marginBottom:7
    },
    subButton:{
        width: "20%",
        padding: 8,
        backgroundColor: '#C0A6F7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop:5,
        alignSelf:'flex-end'
    },
    subLabel:{
        color:'#DBCBFD',
        fontSize:16,
        fontStyle:'italic'
    },
    subRow:{
        marginTop:8
    },
    subText:{
        color:'#fff',
        fontSize:16,
        fontWeight:'500'
    }

});