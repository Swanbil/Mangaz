import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Image } from "react-native";
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
import {getNftsFromCollection} from "../utilities/Wallet.js";


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
    const [listNftUser, setListNftUser] = useState([]);

    // NFT
    const [nfts, setNfts] = useState([]);

    // Loading
    const [loading, setLoading] = useState(false);

    const [profilePicture, setProfilePicture] = useState("");
    
    const [collections, setCollections] = useState([]);
    
    const [collection, setCollection] = useState([]);
    
    const [listNftCollection, setListNftCollection] = useState([]);



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

         const  fetchData = async () => {

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
                        setListNftUser(listIdNft);
                    });
                }

                // //Get the list of nfts of the user
                /*
                    for (let i = 0; i < listNftUser.length; i++) {
                        console.log("listIdNft[i].id : " + listNftUser[i].token_id);
                        await walletUtils.getNftUser(contractNftOpenSeaAddress, listNftUser[i].token_id.justifyContent, address).then(r =>
                        setNfts(nfts => [...nfts, r]));
                    }
                 */


                /*
                -------------------------------------------------------------------------------------
                 */



                 //Retrieve the list of collections and each collection
                 await walletUtils.getCollections(mangaZAddress)
                     .then((collections) => {
                         setCollections(collections);
                     })
                     .catch((error) => {
                         // gérer l'erreur
                         console.log("error : " + error);
                     })
                     .finally(() => {
                         // faire quelque chose après l'exécution de la fonction asynchrone, comme une autre fonction ou une autre action
                         //Get the 3 more recent collections
                         for (let i = 0; i < 3; i++) {
                             console.log("collections["+ i +"].slug : " + collections[i].slug);
                             setTimeout(() => {
                                 walletUtils.getCollection(collections[i].slug).then((collection) => {
                                     console.log("collection coté api : " + collection.collection.name);
                                     setCollection(prevCollection => [...prevCollection, collection]);
                                 });
                             }, i*4000);
                         };

                     })
             //Get the list of nfts of the collection
             await walletUtils.getNftsFromCollection(collection.slug).then((listNftCollection) => {
                 console.log("collection coté code " + collection[0].collection.name);
                 setListNftCollection(listNftCollection);
             } );
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


        <View style={styles.container}>
            <View style={styles.container.backgroundCollabDark}>
                <View style={styles.container.header}>
                    <View style={styles.container.header.profile}>
                        <View style={styles.container.header.profile.profilePicture}>
                            <Image source={{uri : profilePicture.profilePicture}} style={styles.container.header.profile.image} />
                        </View>
                        <View style={styles.container.header.profile.profileInformations}>
                            <Text style={styles.container.header.profile.profileInformations.pseudo}>{pseudo}</Text>
                            <Text style={styles.container.header.profile.profileInformations.address}>{address.slice(0,5) + "..." + address.slice(-4)}</Text>
                            <Text style={styles.container.header.profile.profileInformations.numberNft}>Nft possedés : {listNftUser.length}</Text>
                        </View>
                    </View>
                    <View style={styles.container.header.zenCash}>
                        <View style={styles.container.header.zenCash.picture}>
                            <Image source={require('../assets/Web3/logoZenCash.png')} style={styles.container.header.profile.image}/>
                        </View>
                        <View style={styles.container.header.zenCash.backgroundZ}>
                            {balance.toString().length > 5 ?
                                <Text style={styles.container.header.zenCash.balance}>{balance.toLocaleString().slice(0,1) + ".." + balance.toLocaleString().slice((-3))} ZC</Text>
                                :
                                <Text style={styles.container.header.zenCash.balance}>{balance.toLocaleString()} ZC</Text>
                            }
                        </View>
                        <View style={styles.container.header.zenCash.addTokenButton}>
                            <Image source={require('../assets/Web3/AddToken.png')} style={styles.container.header.zenCash.imageAddTokenButton}/>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.container.containerButtonNavigation}>
                <TouchableOpacity
                    style={styles.container.button}
                    onPress={() => navigation.navigate('Web3Home')}
                >
                    <Image source={require('../assets/Web3/EchangeDeCarteButon.png')} style={styles.container.button.imageButton}/>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.container.button}
                    onPress={() => navigation.navigate('Web3Home')}
                >
                    <Image source={require('../assets/Web3/Gallery.png')} style={styles.container.button.imageButton}/>
                </TouchableOpacity>
            </View>

            <View style={styles.container.titleNewCollab}>
                <Text style={styles.container.newCollabTitleText}>Nos nouvelles collaborations</Text>
            </View>

            <View style={styles.container.newCollabBack}>
                <View style={styles.container.newCollabCardBackground}>
                    <Image source={{ uri: "https://i.seadn.io/gcs/files/38cf87707737106fdb299f399c1c463f.jpg?w=500&auto=format" }} style={styles.container.newCollabCardBackgroundImage} />
                </View>
            </View>

            <View style={styles.container.newCollab}>
                <View style={styles.container.newCollab.newCollabCardCover}>
                    <Image source={{ uri: "https://i.seadn.io/gcs/files/ed2395633653dc6518f818e3c48278d3.jpg?w=500&auto=format" }} style={styles.image} />
                </View>
                <View style={styles.container.newCollab.newCollabBuyButton}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Web3Home')}
                    >
                        <Text> Acheter (25 Zc)</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container.newCollab.newCollabInfo}>
                    <Text> Pack Dragon Ball </Text>
                </View>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({

    image: {
        width: "100%",
        height: "100%",
        // style de l'image
    },

    container: {
        flex: 1,
        width: '100%',
        height: '100%',

        containerButtonNavigation: {
            position: 'absolute',
            top : '47%',
            width: '100%',
            height: '30%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around', // add this line
            textAlign: 'center', // centrage horizontal


        },
        button: {
            width: '45%',
            height: '70%',
            borderRadius: 18,
            alignSelf: 'center',
            overflow : 'hidden',


            imageButton: {
                width: '100%',
                height: '100%',
            },


        },

        backgroundCollabDark : {
            zIndex: 1,
            position: 'absolute',
            width: '100%',
            height: '45%',
            backgroundColor: 'rgba(0, 0, 0, 0.26)',
        },

        newCollabCardBackground : {
            zIndex: 0,


        },
        newCollabCardBackgroundImage : {
            width: '100%',
            height: '100%',
        },

        newCollabBack : {
            zIndex: 0,
            position: 'absolute',
            width: '100%',
            height: '45%',
        },

        header: {
            zIndex: 1,
            position: 'absolute',
            width: '100%',
            height: '40%',


            profile : {
                marginLeft : '5%',
                marginTop : '10%',
                width: 250,
                height: 100,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center', // add this line

                profilePicture : {
                    width: '39%',
                    height: '100%',
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: 'black',
                    overflow: 'hidden',
                    left : '8%'
                },

                image : {
                    width: '100%',
                    height: '100%',
                },

                profileInformations : {
                    marginLeft: '10%',
                    position: 'relative',
                    width: '70%',
                    height: '30%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign : 'left',
                    alignItems: 'flex-start',
                    justifyContent: 'center',

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
                width: '30%',
                height: '40%',

                right : '5%',
                top : '40%',
                position: 'absolute',

                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                overflow: 'visible',


                backgroundZ : {
                    zIndex: 0,
                    left : '-25%',
                    width: '75%',
                    height: "50%",
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
                    width: '40%',
                    height: '80%',
                    overflow: 'hidden',
                },
                balance : {
                    flex: 1,
                    marginLeft: '22%',
                    marginTop: '2%',
                    fontSize: 13,
                    fontFamily: 'Ubuntu',
                    top : '5%'

                },
                addTokenButton : {
                    zIndex: 1,
                    left : '-49%',
                    top : '-12%',
                    width: "20%",
                    height: "34%",
                    borderRadius: 100,
                    overflow: 'hidden',
                },

                imageAddTokenButton : {
                    width: '100%',
                    height: '100%',
                },
            }
        },

        titleNewCollab : {
            zIndex: 2,
            position: 'absolute',
            top : '18%',
            left : '3%',
            display : 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
        },

        newCollabTitleText : {
            fontStyle: 'normal',
            fontWeight: '600',
            height: '110%',
            fontSize: 20,
            lineHeight: 18,
            textAlign: 'center',
            color: 'white',
            overflow: 'visible',


        },


        newCollab : {
            zIndex: 1,
            position: 'absolute',
            width: '100%',
            height: '45%',


            newCollabCardCover : {
                position: 'absolute',
                top : '45%',
                left : '3%',
                backgroundColor: 'rgba(0, 0, 0, 1)',
                width: '35%',
                height: '53%',
                borderRadius: 18,
                alignSelf: 'center',
                overflow : 'hidden',
            },


            newCollabBuyButton : {
                position : 'absolute',
                top : '50%',
                left : '50%',
                width: '30%',
                height: '10%',
                borderRadius: 31,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor : 'rgba(1, 0, 0, 0.2)',
                background: 'linear-gradient(314.76deg, #A2B2FC 15.51%, #FFF1BE 137.01%)',


            },
            newCollabNfts : {

            },
            newCollabInfo : {
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.26)',
                width: '55%',
                height: '20%',
                top : '50%',
                left : '50%',

                newCollabNameCollab : {

                },
                newCollabRarities : {

                },
            }

        }
    }
});