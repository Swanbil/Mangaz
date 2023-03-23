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
import userNfts from "../utilities/NftsUser.json";
import ShopCardDisplay from '../components/ShopCardDisplay';


export default function Web3Home({ navigation }) {

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
        const { userPseudo } = await getDataUser();
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

        // //Get the list of nfts of the user
       

        /*
        -------------------------------------------------------------------------------------
         */

        //      //Retrieve the list of collections and each collection
        //      await walletUtils.getCollections(mangaZAddress)
        //          .then((collections) => {
        //              setCollections(collections);
        //          })
        //          .catch((error) => {
        //              // gérer l'erreur
        //              console.log("error : " + error);
        //          })
        //          .finally(() => {
        //              // faire quelque chose après l'exécution de la fonction asynchrone, comme une autre fonction ou une autre action
        //              //Get the 3 more recent collections
        //              for (let i = 0; i < 3; i++) {
        //                  console.log("collections["+ i +"].slug : " + collections[i].slug);
        //                  setTimeout(() => {
        //                      walletUtils.getCollection(collections[i].slug).then((collection) => {
        //                          console.log("collection coté api : " + collection.collection.name);
        //                          setCollection(prevCollection => [...prevCollection, collection]);
        //                      });
        //                  }, i*4000);
        //              };

        //          })
        //  //Get the list of nfts of the collection
        //  await walletUtils.getNftsFromCollection(collection.slug).then((listNftCollection) => {
        //      console.log("collection coté code " + collection[0].collection.name);
        //      setListNftCollection(listNftCollection);
        //  } );
    }

    /* ---------------------- */
    return (
        /*
            <View>
                <Modal visible={isModal}>
                    <Text>Modal is open!</Text>
                    <TextInput
                        placeholder="Enter private key"
                        value={privateKeyInput}
                        onChangeText={text => setPrivateKeyInput(text)}
                    />
                    <TouchableOpacity onPress={postPrivateKey} style={styles.button}>
                        <Text style={styles.buttonTextStyle}>post private key</Text>
                    </TouchableOpacity>
                </Modal>
            </View>

            <View style={styles.containerLoad}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <Image source={require('../assets/konosuba-dance.gif')} style={styles.image} />
                        <Text style={styles.text}>Loading...</Text>
                    </View>
                ): (
                    // Votre contenu d'application ici
                    <TouchableOpacity onPress={example} style={styles.button}>
                        <Text style={styles.buttonTextStyle}>Open the general pack</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>*/


        <View style={styles.container}>
            <ScrollView>
                <View>
                    <ImageBackground source={ require('../assets/shonen_jump.jpg') } resizeMode="cover" blurRadius={2} >
                        <View style={{ backgroundColor: 'rgba(0,0,0, 0.20)'}}>
                            <View>
                                <Web3ProfilePicture address={address} balance={balance} listNftUser={listNftUser} pseudo={pseudo} userInfos={userInfos} isBlack={false}/>
                            </View>
                               <View style={{ marginTop: -20, marginLeft : 22, marginBottom : 10}}>
                                   <View style={{flexDirection : 'row', alignItems: 'center', justifyContent : 'space-between'}}>
                                       <Text style={{ fontWeight: '700', fontSize: 22, color: 'white' }}>New collaborations</Text>
                                       <Text onPress={() => navigation.navigate('PackList')}
                                             style={{ marginRight : 30, fontWeight: '500', lineHeight: 18, fontSize: 12, color: '#DA0037'}}>
                                           Voir plus
                                       </Text>
                                   </View>
                                       <FlatList
                                           data={collectionsData}
                                           keyExtractor={(item) => item.idCollection.toString()}
                                           horizontal={true}
                                           showsHorizontalScrollIndicator={false}
                                           renderItem={({ item }) => (
                                               <View>
                                                   <NewCollections navigation={navigation} element={item} />
                                                   <View style ={{zIndex : 20}}>
                                                       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop : -100, left : 146, marginLeft : 13}}>
                                                           {item.nfts
                                                               .filter((nft) => nft.rarity === "SSR")
                                                               .slice(0,2)
                                                               .map((nft) => (
                                                               <NftCollections key={nft.idNft}  navigation = {navigation} element={nft} />
                                                           ))}
                                                       </ScrollView>
                                                   </View>
                                               </View>
                                           )}
                                       />
                            </View>
                        </View>
                    </ImageBackground>
                </View>



                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, padding: 8 }}>
                    <TouchableOpacity
                        style={{ width: 166, height: 153 }}
                        onPress={() => navigation.navigate('Web3Home')}
                    >
                        <Image source={require('../assets/Web3/EchangeDeCarteButon.png')} style={{ width: '100%', height: '100%', borderRadius: 18 }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ width: 166, height: 153 }}
                        onPress={() => navigation.navigate('GalleryScreen', {nftsJson : userNfts})}
                    >
                        <Image source={require('../assets/Web3/Gallery.png')} style={{ width: '100%', height: '100%', borderRadius: 18 }} />
                    </TouchableOpacity>
                </View>


                
                <View style={{ marginTop: 20, marginBottom: 80, padding: 5 }}>
                    <Text style={{ fontWeight: '700', fontSize: 22, color: 'black', marginBottom: 10, marginLeft: 5 }}>Boutique</Text>
                    <FlatList
                        data={cardsData}
                        renderItem={({ item }) => (<ShopCardDisplay navigation={navigation} element={item} />)}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ScrollView >

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: 1000
    },
});