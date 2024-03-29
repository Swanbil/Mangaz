import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Image, ScrollView, ImageBackground } from "react-native";
export default function ShopCard({ navigation, element }) {
    
    return (
        <View style={{ marginHorizontal: 7 }}>
            <TouchableOpacity onPress={() => navigation.navigate('DisplayNftScreen', {nft : element})}>
                <ImageBackground source={{ uri: element?.image_thumbnail_url }} style={{ width: 155, height: 189 }} imageStyle={{ borderRadius: 12 }}>
                    <View style={{ padding: 2, backgroundColor: 'rgba(21, 18, 18, 0.71)', position: 'absolute', bottom: -1, width: '100%', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                        <Text style={{ fontSize: 15, fontWeight: '700', color: 'white', marginLeft : 5 }}>{element?.name}</Text>
                        <Text style={{ fontSize: 13, fontWeight: '400', color: 'white', marginLeft : 5 }}>{element?.collection?.name}</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                            <Text style={{ fontSize: 10, fontWeight: '400', color: 'white' }}>Qty : {element?.quantity}</Text>
                            <Text style={{ fontSize: 10, fontWeight: '400', color: 'white' }}>{element?.rarity}</Text>
                            <View style={{ flexDirection: 'row', alignelements: 'center' }}>
                                <Text style={{ fontSize: 10, fontWeight: '400', color: 'white' }}>{element?.price}</Text>
                                <Image source={require('../assets/Web3/logoZenCash.png')} style={{ width: 10, height: 10, marginLeft: 2, marginTop : 2  }} />
                            </View>

                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            
        </View>
    )

}