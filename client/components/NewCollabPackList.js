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
                        <View style={{ backgroundColor: 'rgba(0,0,0, 0.20)', flex : 1, borderRadius : 12}}>
                            <View style={{ flexDirection: 'column', marginLeft: 20, top: -55, alignItems: 'flex-start'}}>
                                <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: 5, marginLeft : -13 }}>
                                    <Text style={{ fontWeight: '700', fontSize: 16, letterSpacing: -0.33, color: 'white' }}>
                                        {element?.collection_Name}
                                    </Text>
                                    <Text style={{ fontWeight: '300', fontSize: 13, letterSpacing: -0.33, color: 'white' }}>({element?.rarities})</Text>
                                </View>
                            </View>
                        </View>

                    </ImageBackground>
                </View>


            </View>
        </View>

    )
}