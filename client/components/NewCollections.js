import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Image, ScrollView, ImageBackground } from "react-native";
import NftCollections from './NftCollections';
import collectionsData from '../utilities/collections.json';

export default function NewCollections({ navigation, element }) {
 
    function randomNft(nftList) {
        const randomIndex = Math.floor(Math.random() * nftList.length);
        console.log("random ",nftList[randomIndex])
        return nftList[randomIndex];
    }
    return (
        <View style={{ flexDirection: 'row', zIndex : 4, marginLeft : 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginRight: 37 }}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('FocusPackScreen', {pack : element})}>
                        <Image source={{ uri: element?.image_cover }} style={{ width: 146, height: 213, borderRadius: 12}} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 20, top: -55, alignItems: 'flex-start' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('OpenPackScreen', {nft: randomNft(element.nfts)})}
                        style={{ padding: 8, backgroundColor: '#A2B2FC', borderRadius: 15, width: 140, marginLeft : 10, flexDirection : 'row', justifyContent : 'center', alignItems:'center'}}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: '700', marginLeft : -6 }}>Acheter ({element?.pricePack}</Text>
                        <Image source={require('../assets/Web3/logoZenCash.png')} style={{ width: 12, height: 12 }} />
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: '700'}}>)</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: 5, marginLeft : -13 }}>
                        <Text style={{ fontWeight: '700', fontSize: 16, letterSpacing: -0.33, color: 'white' }}>
                            {element?.collection_Name}
                        </Text>
                        <Text style={{ fontWeight: '300', fontSize: 13, letterSpacing: -0.33, color: 'white' }}>({element?.rarities})</Text>
                    </View>
                </View>
            </View>
        </View>

    )
}