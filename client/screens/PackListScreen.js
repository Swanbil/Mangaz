import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Image, ScrollView, ImageBackground } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { API_URL } from '@env';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';


import { useWalletConnect } from '@walletconnect/react-native-dapp';

// Import the required shims
import '@ethersproject/shims';

// Import the ethers library
import { ethers } from 'ethers';
import {
    contractTokenABI,
    constTokenAddress,
    constNftAddress,
    contractNftABI,
    contractNftOpenSeaAddress,
    mangaZAddress
} from '../Utils/constants';

//Import Wallet.js
import * as walletUtils from '../utilities/Wallet.js';
import { getNftsFromCollection } from "../utilities/Wallet.js";

import cardsData from '../utilities/card.json';
import collectionsData from '../utilities/collections.json';
import { useFocusEffect } from '@react-navigation/native';
import { getDataUser } from '../utilities/localStorage';
import ShopCard from '../components/ShopCard';
import NewCollections from '../components/NewCollections';
import NftCollections from "../components/NftCollections";


export default function PackListScreen({ navigation }) {

    /* ---------------------- */

    //Current user
    const [pseudo, setPseudo] = useState("");

    //Current address
    const [address, setAddress] = useState(null);

    //Wallet Connect
    const connector = useWalletConnect();

    // Get the balance of the connected wallet
    const [balance, setBalance] = useState(0);

    // Get the private key of the connected wallet
    const [privateKeyInput, setPrivateKeyInput] = useState('');

    // Modal
    const [isModal, setIsModal] = useState(false);

    // list of NFT
    const [listNftUser, setListNftUser] = useState([]);

    // NFT
    const [nfts, setNfts] = useState([]);

    // Loading
    const [loading, setLoading] = useState(false);

    const [userInfos, setUserInfos] = useState();

    const [collections, setCollections] = useState([]);

    const [collection, setCollection] = useState([]);

    const [listNftCollection, setListNftCollection] = useState([]);


    /* ---------------------- */
    // //At the refresh of the page, check if the user has a private key and get the balance of the connected wallet
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const setAllNfts = async (listNftUser) => {
        for (let i = 0; i < listNftUser.length; i++) {
            await walletUtils.getNftUser(contractNftOpenSeaAddress, listNftUser[i].token_id.justifyContent, address).then(r =>
                setNfts(nfts => [...nfts, r]));
        }
    }

    const getUserInfos = async () => {
        const { userPseudo } = await getDataUser();
        if (userPseudo) {
            try {
                const response = await axios.get(`${API_URL}/user/${userPseudo}`);
                setUserInfos(response.data.userInfos);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const fetchData = async () => {
        const {userPseudo} = await getDataUser();
        const pseudo = userPseudo;
        setPseudo(userPseudo);

        getUserInfos();

        const userAddress = await walletUtils.getAddress(pseudo);
        setAddress(userAddress);

        // Get the balance of the connected wallet
        await walletUtils.getBalance(pseudo).then((balance) => {
            setBalance(balance)
        });

        if (userAddress) {
            await walletUtils.getAllNftUser(userAddress).then((listIdNft) => {
                setListNftUser(listIdNft);
                setAllNfts(listIdNft)
            });
        }
    }
    return (
        <View style={styles.container}>
            <View style = {{zIndex : 1000}}>
                <TouchableOpacity onPress={() => navigation.navigate("Web3Home")} style={{top: 27, left: 5}}>
                    <Image source={require('../assets/arrow-left.png')} style={{width: 24, height: 24}}/>
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style = {{top: -20}}>
                    <View>
                        <View style={{padding: 20, marginTop: 30}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{}}>
                                        <Image source={{uri: userInfos?.profilepicture}} style={{
                                            width: 82,
                                            height: 82,
                                            borderRadius: 50,
                                            borderWidth: 1,
                                            borderColor: 'black'
                                        }}/>
                                    </View>
                                    <View style={{marginLeft: 8, color : 'black'}}>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{pseudo}</Text>
                                        <Text style={{
                                            fontSize: 13,
                                            fontWeight: '400',
                                        }}>{address?.slice(0, 5) + "..." + address?.slice(-4)}</Text>
                                        <Text style={{fontSize: 13, fontWeight: '400'}}>Nft possedés
                                            : {listNftUser?.length}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                                    <View style={{
                                        backgroundColor: 'black',
                                        borderRadius: 15,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 5
                                    }}>
                                        <Image source={require('../assets/Web3/logoZenCash.png')}
                                               style={{width: 34, height: 34, position: 'absolute', left: -12}}/>
                                        {balance.toString().length > 5 ?
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: '400',
                                                marginLeft: 17,
                                                color : 'white'
                                            }}>{balance?.toLocaleString().slice(0, 1) + ".." + balance?.toLocaleString().slice((-3))} ZC</Text>
                                            :
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: '400',
                                                marginLeft: 6,
                                                color : 'white'
                                            }}>{balance?.toLocaleString()} ZC</Text>
                                        }
                                    </View>
                                    <View style={{position: 'absolute', right: -3, top: 18}}>
                                        <Image source={require('../assets/Web3/AddToken.png')}
                                               style={{width: 15, height: 16, borderRadius: 50}}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: 1000
    },
});