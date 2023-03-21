import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Image, ScrollView, ImageBackground } from "react-native";
import NftCollections from './NftCollections';
import collectionsData from '../utilities/collections.json';

export default function NewCollections({ element }) {

    return (
        <View style={{ flexDirection: 'row', zIndex : 4, marginLeft : 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginRight: 37 }}>
                <View>
                    <Image source={{ uri: element?.image_cover }} style={{ width: 146, height: 213, borderRadius: 12}} />
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 20, top: -55, alignItems: 'flex-start' }}>
                    <TouchableOpacity style={{ padding: 8, backgroundColor: '#A2B2FC', borderRadius: 15, width: 130, marginLeft : 20, flexDirection : 'row', justifyContent : 'center'}}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: '700', marginLeft : -6 }}>Buy ({element?.pricePack}    )</Text>
                        <Image source={require('../assets/Web3/logoZenCash.png')} style={{ width: 12, height: 12, marginLeft: -18, marginTop : 6  }} />
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