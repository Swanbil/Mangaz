import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { API_URL } from '@env';
import axios from 'axios';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

// Import the required shims
import '@ethersproject/shims';

// Import the ethers library
import { ethers } from 'ethers';
import { contractTokenABI, constTokenAddress, constNftAddress, contractNftABI, contractNftOpenSeaAddress} from '../Utils/constants';

//Import Wallet.js
import * as walletUtils from '../utilities/Wallet.js';



export default function Web3Home({ navigation }) {

    /* ---------------------- */

    //Current user
    const [pseudo, setPseudo] = useState("");

    //Current address
    const [address, setAddress] = useState("");

    //Wallet Connect
    const connector = useWalletConnect();

    // Get the balance of the connected wallet
    const [balance, setBalance] = useState(0);

    // Get the private key of the connected wallet
    const [privateKeyInput, setPrivateKeyInput] = useState('');

    // Modal
    const [isModal, setIsModal] = useState(false);

    // list of NFT
    const [listNft, setListNft] = useState([]);

    // NFT
    const [nfts, setNfts] = useState([]);

    // Loading
    const [loading, setLoading] = useState(false);

    const [profilePicture, setProfilePicture] = useState("");



/*  ------ Link with Metamask------

    const connectWallet = React.useCallback(() => {
        navigation.navigate("TabNavigator", { screen: 'Wallet' });
        return connector.connect();
    }, window.connector = [connector]);

    const killSession = React.useCallback(() => {
        return connector.killSession();

    }, [connector]);

*/

    async function getProfilePicture (_pseudo) {
        const user = { "userPseudo" : _pseudo };
        const response = await axios.get(API_URL + '/user/getProfilePicture/' + user.userPseudo);
        return (response.data);
    };

    /* ---------------------- */
    // //At the refresh of the page, check if the user has a private key and get the balance of the connected wallet
    useEffect(() => {

        const fetchData = async () => {

            setPseudo("Test");

            await getProfilePicture(pseudo).then((picture) => {
                setProfilePicture(picture);
            });

            let userAddress = address;
                if (!userAddress) {
                    userAddress = await walletUtils.getAddress(pseudo);
                    setAddress(userAddress);
                }

                // Get the balance of the connected wallet
                await walletUtils.getBalance(pseudo).then((balance) => {
                    setBalance(balance)
                });

                if (userAddress) {
                    await walletUtils.getAllNftUser(userAddress).then((listIdNft) => {
                        setListNft(listIdNft);
                    });
                }

                // //Get the list of nfts of the user
                /*
                    for (let i = 0; i < listNft.length; i++) {
                        console.log("listIdNft[i].id : " + listNft[i].token_id);
                        await walletUtils.getNftUser(contractNftOpenSeaAddress, listNft[i].token_id.justifyContent, address).then(r =>
                        setNfts(nfts => [...nfts, r]));
                    }
                 */
            }
        fetchData();

    }, [address, pseudo]);

    const renderGalleryCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image_thumbnail_url }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <Text style={styles.cardDescription}>{item.collection.name}</Text>
            <Text style={styles.cardDescription}>{item.ownership.quantity}</Text>
            <Text>{item.traits && item.traits.length > 0 ? item.traits[0].value : ''}</Text>
        </View>
    );




    /* ---------------------- */
    return (
        /*<View style={styles.container}>
            <TouchableOpacity
                style={{ margin: 20 }}
                underlayColor='#fff' onPress={() => navigation.goBack()}
            >
                <AntDesign name="leftcircleo" size={26} color="#C0A6F7" />
            </TouchableOpacity>

            <View style={styles.walletContainer}>
                <View style={styles.pageTitleContainer}>
                    <Icon name={"wallet"} color={"#333"} size={20} />
                    <Text style={styles.pageTitle}>Wallet</Text>
                </View>
            </View>
            {!connector.connected && (
                <TouchableOpacity onPress={connectWallet} style={styles.button}>
                    <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
                </TouchableOpacity>
            )}
            {!!connector.connected && (
                <>
                    <Text>{('Your address on the Ether chain is ' + connector.accounts[0])}</Text>
                    <TouchableOpacity onPress={killSession} style={styles.button}>
                        <Text style={styles.buttonTextStyle}>Log out</Text>
                    </TouchableOpacity>
                    <Text>{`Your balance : ${balance} ZC`}</Text>
                </>
            )}
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

            <FlatList
                data={nfts}
                renderItem={renderGalleryCard}
                keyExtractor={(item) => item.id.toString()}
                style={styles.container}
            />

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

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Web3Home')}
                underlayColor='#fff'
            >
                <Text style={styles.textButton}>Go Wallet</Text>
            </TouchableOpacity>
        </View>*/

        <View style={styles.backgroundCollabDark}>
            <View style={styles.header}>
                <View style={styles.header.profile}>
                    <View style={styles.header.profile.profilePicture}>
                        <Image source={{uri : profilePicture.profilePicture}} style={styles.header.profile.image} />
                    </View>
                    <View style={styles.header.profile.profileInformations}>
                        <Text style={styles.header.profile.profileInformations.pseudo}>{pseudo}</Text>
                        <Text style={styles.header.profile.profileInformations.address}>{address.slice(0,5) + "..." + address.slice(-4)}</Text>
                        <Text style={styles.header.profile.profileInformations.numberNft}>Nft possedés : {listNft.length}</Text>
                    </View>
                </View>

                <View style={styles.header.zenCash}>
                    <View style={styles.header.zenCash.picture}>
                        <Image source={require('../assets/Web3/logoZenCash.png')} style={styles.header.profile.image}/>
                    </View>
                    <View style={styles.header.zenCash.backgroundZ}>
                        {balance.toString().length > 5 ?
                            <Text style={styles.header.zenCash.balance}>{balance.toLocaleString().slice(0,1) + ".." + balance.toLocaleString().slice((-3))} ZC</Text>
                            :
                            <Text style={styles.header.zenCash.balance}>{balance.toLocaleString()} ZC</Text>
                        }
                    </View>
                    <View style={styles.header.zenCash.addTokenButton}>
                        <Image source={require('../assets/Web3/AddToken.png')} style={styles.header.zenCash.imageAddTokenButton}/>
                    </View>

                </View>
            </View>
        </View>



    );
}


const styles = StyleSheet.create({

    backgroundCollabDark : {
        position: 'absolute',
        width: 430.58,
        height: 406,
        left: -13.4,
        top: -4,
        backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },

    header: {
        position: 'relative',
        display: 'flex',




        profile : {
            marginLeft : '8%',
            marginTop : '10%',
            position: 'relative',
            width: 200,
            height: 83,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center', // add this line

            profilePicture : {
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: 'black',
                overflow: 'hidden',
            },

            image : {
                width: '100%',
                height: '100%',
            },

            profileInformations : {
                marginLeft: '10%',
                position: 'relative',
                width: 105,
                height: 50,
                display: 'flex',
                flexDirection: 'column',
                textAlign : 'left',
                alignItems: 'flex-start',

                pseudo : {
                    /* H5 */
                    fontfamily: 'Ubuntu',
                    fontstyle: 'normal',
                    fontweight: 400,
                    fontsize: 16,
                    lineheight: 18,
                    textalign: 'center',

                    /* Color 1 */
                    color: '#EDEDED',
                },
                address : {
                    fontFamily: 'Ubuntu',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: 13,
                    lineHeight: 15,
                    textAlign: 'center',
                    color: '#EDEDED',
                },
                numberNft : {
                    fontFamily: 'Ubuntu',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: 13,
                    lineHeight: 15,
                    textAlign: 'center',
                    color: '#EDEDED',

                }
            }
        },

        zenCash : {
            marginTop: '-13%',
            marginLeft: '65%',
            position: 'relative',
            width: 80,
            height: 36.02,
            right: "-3%",
            top: "-28%",

            backgroundZ : {
                display : 'flex',
                flexWrap : 'wrap',
                overflow : 'scroll',
                zIndex: 0,
                justifyContent: 'center',

                position: 'relative',
                width: '110%',
                height: "70%",
                right: '0%',
                top: '0%',
                backgroundColor: '#FFFFFF',
                shadowColor: '#FDFDFD',
                shadowOffset: {
                    width: 1,
                    height: 4,
                },
                shadowOpacity: 0.25,
                shadowRadius: -1,
                borderRadius: 17,
            },

            picture : {
                zIndex: 1,
                position: 'relative',
                right : '20%',
                top : '79%',
                width: 34,
                height: 34,
            },
            balance : {
                flex: 1,
                marginLeft: '22%',
                marginTop: '2%',

                fontSize: 13,
                fontFamily: 'Ubuntu',

            },
            addTokenButton : {
                position: 'relative',
                zIndex: 1,
                top: '-95%',
                right : '-97%',
                width: "23%",
                height: "55%",
                borderRadius: 100,
                overflow: 'hidden',
            },

            imageAddTokenButton : {
                width: '100%',
                height: '100%',
            },
        }
    }
});