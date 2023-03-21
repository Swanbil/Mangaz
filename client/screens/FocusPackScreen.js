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

export default function FocusPackScreen({ navigation, route }) {
    const {pack} = route.params;

    /* ---------------------- */

    const [collectionItem, setCollectionItem] = useState(pack);

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

    function randomNft(nftList) {
        const randomIndex = Math.floor(Math.random() * nftList.length);
        console.log("random ",nftList[randomIndex])
        return nftList[randomIndex];
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <ImageBackground source={{uri : collectionItem.image_background}} resizeMode="cover" blurRadius={2} style={{height : 406}}>
                    <View style={{backgroundColor : 'rgba(0,0,0, 0.40)',  flex : 1}}>
                        <View style = {{zIndex : 1000}}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{top: 27, left: 5}}>
                                <Image source={require('../assets/arrow-left.png')} style={{width: 24, height: 24}}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Web3ProfilePicture address={address} balance={balance} listNftUser={listNftUser} pseudo={pseudo} userInfos={userInfos} isBlack={false}/>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{zIndex : 30, alignItems : 'center', top : -250, flex : 1}}>
                    <Image source={{ uri: collectionItem.image_cover }}  style={{ width: 178, height: 260, borderRadius: 12}}></Image>
                    <View style={{backgroundColor : '#171717', borderRadius : 40, width : 328, top : -55, overflow : 'hidden', flex : 1}}>
                        <View style={{top : 30, marginHorizontal : 20}}>
                            <Text style = {{fontWeight: '700', fontSize: 24, color: 'white', left : -7}}> {collectionItem?.collection_Name}</Text>
                            <Text style={{fontWeight : '300', fontSize : 13, left : 170, top : -22, color : 'white'}}> ({collectionItem?.rarities})</Text>

                            <View style ={{alignItems : 'flex-start', flexDirection : 'column', marginBottom : 20}}>
                                <Text style={{fontWeight: '700', fontSize : 18, color : 'rgba(237, 237, 237, 0.5)'}}>Description</Text>
                                <Text style={{fontWeight : '500', fontSize : 12, color : 'rgba(237, 237, 237, 0.5)'}}>{collectionItem?.description}</Text>
                            </View>
                            <View>
                                <Text style={{fontWeight: '700', fontSize : 18, color : 'rgba(237, 237, 237, 0.5)'}} >Tags</Text>
                                <FlatList
                                        horizontal={true}
                                        data={collectionItem?.tags}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <Text style={{fontWeight : '500', fontSize : 12, color : 'rgba(237, 237, 237, 0.5)'}} >{item}   </Text>
                                        )}
                                />
                            </View>
                            <TouchableOpacity style={{ top : 10,left : 55, padding: 8, backgroundColor: '#A2B2FC', borderRadius: 20, width: 130,height : 40
                                , marginLeft : 20, marginBottom : 55}}  onPress={() => navigation.navigate('OpenPackScreen', {nft: randomNft(collectionItem.nfts)})}>

                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: '700', marginLeft : -6 }}>Acheter ({collectionItem?.pricePack}    )</Text>
                                <Image source={require('../assets/Web3/logoZenCash.png')} style={{ width: 12, height: 12, marginLeft: 87, marginTop : -15  }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{top : -270, flex : 1, alignItems : 'center'}}>
                    <Text style = {{fontWeight: '700', fontSize: 24, color: 'black'}}>Contenu du pack</Text>
                    <View style={{marginTop : 15}}>
                        <FlatList
                            data={collectionItem.nfts}
                            renderItem={({ item }) => (<ContentPack element={item} />)}
                            keyExtractor={(item) => item.idNft.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
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