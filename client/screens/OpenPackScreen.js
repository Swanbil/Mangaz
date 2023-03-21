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
import Web3ProfilePicture from "../components/Web3ProfilePicture";
import ContentPack from "../components/ContentPack";

export default function OpenPackScreen({ navigation, route }) {
    const {nft} = route.params;

    /* ---------------------- */
    const [nftItem, setNftItem] = useState(nft);

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
            <ScrollView>
                <View>
                    <Web3ProfilePicture address={address} balance={balance} listNftUser={listNftUser} pseudo={pseudo} userInfos={userInfos} isBlack={true}/>
                </View>
                <View style={{alignItems : 'center'}}>
                    <Image source={{uri: nftItem?.image}} style={{width: 358, height: 358, borderRadius : 20}}/>

                    <View style={{backgroundColor : '#171717' , width : '110%',height : 310,
                        borderTopLeftRadius: 60,
                        borderTopRightRadius: 60,
                        marginTop : 35,marginBottom : -50 }}>
                        <View style={{flex : 1, flexDirection : 'row', marginTop : 25, marginLeft : 35}}>
                            <Image source={{uri: nftItem?.coverCollection}} style={{width: 86, height: 86, borderRadius : 50}}/>
                            <View style={{flex : 1, flexDirection : 'column', alignItems : 'flex-start', left : 15}}>
                                <Text style={{fontSize : 16, fontWeight : '600', color : '#8D8D8D'}}>{nftItem.nameCollection}</Text>
                                <View style={{flex : 1, flexDirection : 'row', alignItems : 'flex-start'}}>
                                    <Text style={{fontSize : 24, fontWeight : '800', color : 'white'}}>{nftItem.name}, </Text>
                                    <Text style={{fontSize : 24, fontWeight : '700',  color: nftItem.rarity === "SSR" ? "#FAFF00" : nftItem.rarity === "SR" ? "#FF74E0" : "#FFB545"}}>{nftItem.rarity}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{top : -60, flex : 1, width : 300, left : 40, marginTop : 25}}>
                            <Text style={{fontSize : 18, fontWeight : '700', color : 'rgba(237, 237, 237, 0.5)'}}>Description</Text>
                            <Text style={{fontSize : 16, fontWeight : '500', color : 'rgba(237, 237, 237, 0.5)'}}>{nftItem.description}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={ () => {navigation.navigate("Web3Home")}} style={{ backgroundColor: '#A2B2FC', borderRadius: 20, width: 130,height : 40, top : -50, alignItems : 'center', justifyContent : 'center'}}>
                        <Text style={{fontSize : 16, fontWeight : '400', color : 'white'}}>Retour</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});