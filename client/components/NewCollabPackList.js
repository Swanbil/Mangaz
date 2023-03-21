import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Image, ScrollView, ImageBackground } from "react-native";
import NftCollections from './NftCollections';
import collectionsData from '../utilities/collections.json';

export default function NewCollabPackList({ element }) {

    return (
        <View style={{ flexDirection: 'row', zIndex : 4, marginLeft : 6, marginTop : 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginRight: 37 }}>
                <View style={{}}>
                    <ImageBackground source={{ uri: element?.image_background }} style={{ width: 296, height: 200}} imageStyle={{ borderRadius: 12 }}>
                        <View style={{ backgroundColor: 'rgba(0,0,0, 0.50)', flex : 1, borderRadius : 12}}>
                            <View style = {{ backgroundColor : 'rgba(1,1,1,0.05)', width : 253, height : 174, top : 13, left : 21, borderRadius : 80}}>
                                <View style={{ flexDirection: 'column', marginLeft : 15, alignItems: 'flex-start'}}>
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', top : 100, left : -20}}>
                                        <Text style={{ fontWeight: '700', fontSize: 24, letterSpacing: -0.33, color: 'white' }}>
                                            {element?.collection_Name}
                                        </Text>
                                        <Text style={{ fontWeight: '500', fontSize: 13, letterSpacing: -0.33, color: 'white' }}>Inclus : {element?.rarities}</Text>
                                        <Text style={{ fontWeight: '500', fontSize: 13, letterSpacing: -0.33, color: 'white' }}>Cout : {element?.pricePack}</Text>
                                    </View>
                                    <Image source={require('../assets/Web3/logoZenCash.png')} style={{width: 13, height: 13, top : 85, left : 34}}/>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>


            </View>
        </View>

    )
}