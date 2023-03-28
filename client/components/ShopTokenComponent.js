import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Image, ScrollView, ImageBackground } from "react-native";
export default function ShopTokenComnponent({ navigation, element }) {
    
    return (
        <View style={{ marginHorizontal: 10, marginBottom : 10  }}>
                <ImageBackground source={ require('../assets/Web3/BuyToken.png') } style={{ width: 175, height: 193 }} imageStyle={{ borderRadius: 49 }}>
                    <View style ={{flex : 1, flexDirection : 'column', alignItems : 'center', justifyContent : 'center'}}>
                        <Image source={require('../assets/Web3/logoZenCash.png')} style={{width : 47, height : 47}} />
                        <Text style={{fontSize : 20, fontWeight : '700', color : 'white', marginTop : 10}}>{element?.amountToken} ZenCash</Text>
                        <TouchableOpacity style={{marginTop : 5,backgroundColor: '#A2B2FC', borderRadius: 20, width: 92,height : 28, flexDirection:'row', alignItems:'center', justifyContent : 'center'}}>
                                <Text style={{fontSize : 12, fontWeight : '400', color : 'white'}}>{element?.price} €</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
        </View>
    )

}