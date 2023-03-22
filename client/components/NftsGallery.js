import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Image, ScrollView, ImageBackground } from "react-native";

export default  function NftsGallery({navigation,element}) {

    return (
        <View style={{marginHorizontal: 6, flex : 1, alignItems : 'center', marginTop : 60}}>
            <TouchableOpacity onPress={() => navigation.navigate('DisplayNftScreen', {nft : element})}>
                <ImageBackground source={{uri: element?.image}} style={{width: 310, height: 405}}
                                imageStyle={{borderRadius: 12}}>
                    <View
                        style={{
                            padding: 2,
                            backgroundColor: 'rgba(21, 18, 18, 0.71)',
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12,
                            height: 91,

                            overflow: 'hidden',
                        }}
                    >
                        <Text style={{fontSize: 17, fontWeight: '700', color: 'white'}}>{element?.name}</Text>
                        <Text style={{fontSize: 15, fontWeight: '500', color: 'white', marginTop : 5}}>{element?.nameCollection}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop : 15}}>
                            <Text style={{fontSize: 13, fontWeight: '500', color: 'white'}}>Qty : {element?.quantity}</Text>
                            <Text style={{fontSize: 13, fontWeight: '500', color: 'white'}}>{element?.rarity}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            
        </View>
    )

}