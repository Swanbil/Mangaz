import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Image, ScrollView, ImageBackground } from "react-native";
import NftCollections from './NftCollections';
import collectionsData from '../utilities/collections.json';

export default function NewCollections({ element }) {

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginRight: 37 }}>
                <View>
                    <Image source={{ uri: element?.image_cover }} style={{ width: 140, height: 235, borderRadius: 12 }} />
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 20, top: -70, alignItems: 'center' }}>
                    <TouchableOpacity style={{ padding: 8, backgroundColor: '#A2B2FC', borderRadius: 15, width: 130 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: '700' }}>Buy ({element?.pricePack} ZC)</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: 5 }}>
                        <Text style={{ fontWeight: '700', fontSize: 16, letterSpacing: -0.33, color: 'white' }}>
                            {element?.collection_Name}
                        </Text>
                        <Text style={{ fontWeight: '300', fontSize: 13, letterSpacing: -0.33, color: 'white' }}>{element?.rarities}</Text>
                        <View>
                        </View>
                    </View>
                </View>
            </View>

        </View>

    )

}