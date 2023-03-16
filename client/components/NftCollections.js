import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Image, ScrollView, ImageBackground } from "react-native";
export default function NftCollections({ element }) {

    return (
        <View style={{ marginHorizontal: 7}}>
            <ImageBackground source={{ uri: element?.image }} style={{ width: 83, height: 103,  }} imageStyle={{ borderRadius: 12}}>
                <View style={{ padding: 2, backgroundColor: '#D8D8D8', position: 'absolute', bottom: 0, width: '100%', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, height : 40, overflow : 'hidden'}}>
                    <Text style={{ fontSize: 10, fontWeight: '700', color: 'white' }}>{element?.name}</Text>
                    <Text style={{ fontSize: 8, fontWeight: '400', color: 'white' }}>{element?.nameCollection}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 6, fontWeight: '400', color: 'white' }}>Qty : {element?.quantity}</Text>
                        <Text style={{ fontSize: 6, fontWeight: '400', color: 'white' }}>{element?.rarity}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )

}