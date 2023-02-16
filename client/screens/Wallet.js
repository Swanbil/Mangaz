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
import { contractTokenABI, constTokenAddress, constNftAddress, contractNftABI } from '../Utils/constants';

export default function Wallet({navigation }) {

    //Current user
    const [pseudo, setPseudo] = useState("");

    //Wallet Connect
    const connector = useWalletConnect();

    // Get the balance of the connected wallet
    const [balance, setBalance] = useState(0);

    // Get the private key of the connected wallet
    const [privateKeyInput, setPrivateKeyInput] = useState('');

    // Modal
    const [isModal, setIsModal] = useState(false);

    // Amount
    const [amountInput, setAmountInput ] = useState(0);

    //For nft
    const [pseudoClient, setPseudoClient] = useState('');
    const [pseudoSeller, setPseudoSeller] = useState('');
    const [idNft, setIdNft] = useState('');
    const [cards, setCards] = useState([]);

    const connectWallet = React.useCallback(() => {
        navigation.navigate("TabNavigator", { screen: 'Wallet' });
        return connector.connect();
    }, window.connector = [connector]);

    const killSession = React.useCallback(() => {
        return connector.killSession();
        
    }, [connector]);

    const getBalance = React.useCallback(async () => {
        const provider = new ethers.providers.InfuraProvider('goerli','8846dcd958a74362bd06d7b4eae341c7');

        // Créer un contrat à partir de l'ABI et de l'adresse du contrat
        let contract = new ethers.Contract(constTokenAddress, contractTokenABI, provider);

        // Utiliser la fonction de lecture "balanceOf" pour obtenir la balance de jetons pour une adresse spécifique
        let balance = await contract.balanceOf(connector.accounts[0]);

        setBalance(balance);
    },[connector]);    
    
    async function exchangeTokens (_pseudoClient,  _pseudoSeller, _amountInput) {

        let tokenAddress = constTokenAddress;
        let amount = _amountInput;


        //Appeler getPrivateKey pour récup la clé privé du receveur avec en entré le pseudo ecirt en input par l'envoyeur
        const toAddress = await getAdress(_pseudoSeller);
        console.log("toAddres in excahnges", toAddress);

        if(amount == 0 || amount == null || isNaN(amount) || amount == undefined || amount == ""){
            alert("Veuillez entrer un pseudo et un montant");
            return;
        }

        // Create a new instance of the ethers.js provider
        const provider = new ethers.providers.InfuraProvider('goerli', '8846dcd958a74362bd06d7b4eae341c7');

        // Set the private key of the sender account
        const privateKey = await getPrivateKey(_pseudoClient);

        // Create a new instance of the ethers.js Wallet using the private key
        const wallet = new ethers.Wallet(privateKey, provider);

        // Create a new instance of the ethers.js Contract using the ABI and the address of the contract
        const contract = new ethers.Contract(tokenAddress, contractTokenABI, wallet);

         // Set the function to call and any parameters required
        const functionToCall = "transfer";
        const functionParams = [toAddress, amount];

        // Set the gas price and gas limit
        const gasPrice = await provider.getGasPrice();
        const gasLimit =  ethers.utils.hexlify(ethers.BigNumber.from(200000));

        // // Build the transaction object
        const transaction = {
            to: tokenAddress,
            data: contract.interface.encodeFunctionData(functionToCall, functionParams),
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            nonce: await wallet.getTransactionCount()
        };

        // Sign the transaction
        const signedTransaction = await wallet.signTransaction(transaction);

        //Send the transaction
        const response = await wallet.provider.sendTransaction(signedTransaction);
        console.log(response);
    }

    /*
        Function for Private Key
     */
    const getPrivateKey = async (_pseudo) => {
        const user = { "userPseudo" : _pseudo };
        const response = await axios.get(API_URL + '/web3/getPrivateKey/' + user.userPseudo);
        console.log("data in get function : " + response.data + "");
        return (response.data);
    }
    const postPrivateKey = async () => {
        const user = { "userPseudo" : "U", "privateKey" : privateKeyInput };

        if(user.privateKey == "") {
            alert("Veuillez entrer une clé privée");
            return;
        }
        try{
            const response = await axios.post(API_URL + '/web3/postPrivateKey/', user);
            alert("Clé privée enregistrée");
            //Refresh the page
            navigation.navigate('Login');
            navigation.navigate('Wallet');

            return (response.data);
        }catch
        {
            alert("Erreur lors de l'enregistrement de la clé privée");
        }

    }
    const checkPrivateKey = async () => {
        const response = await getPrivateKey("U");
        console.log("data in check function : " + response + "")
        if (response == null || response == "") {
            console.log("data not detect");
            setIsModal(true);
        } else {
            console.log("data detect");
            setIsModal(false);
        }
    };

    //Get the adresse wallet of User
    const getAdress = async (_pseudoUser) => {
        if(_pseudoUser == ""){
            alert("Veuillez entrer un pseudo");
            return;
        }
        //Appeler getPrivateKey pour récup la clé privé du receveur avec en entré le pseudo ecirt en input par l'envoyeur
        const privateKey = await getPrivateKey(_pseudoUser);
        console.log("private key " + privateKey)
        const walletReceiver = new ethers.Wallet(privateKey);
        const toAddress = await walletReceiver.getAddress();
        console.log("toAddress : " + toAddress);
        return toAddress;
    }

    /*
        Exchange nft
     */
    
    //User click on button buy NFT
    async function  exchangeNFT(_idNft, _pseudoUserClient, _pseudoUserSeller) {
        let fromAdress = await getAdress(_pseudoUserSeller);  //Get the adress of the user
        let toAdress = await getAdress(_pseudoUserClient);  //Get the adress of the user
        let idNft = _idNft;//Get the id of the nft
        let amount = 1; //Get the amount of nft
        let data = "0x00"; //Get the data of the nft

        console.log("fromAdress : " + fromAdress);
        console.log("toAdress : " + toAdress);


            // Create a new instance of the ethers.js provider
            const provider = new ethers.providers.InfuraProvider('goerli', '8846dcd958a74362bd06d7b4eae341c7');

            const contractAddress = '0xf4910c763ed4e47a585e2d34baa9a4b611ae448c';

            // Set the private key of the sender account
            const privateKey = await getPrivateKey(_pseudoUserSeller);

            // Create a new instance of the ethers.js Wallet using the private key
            const wallet = new ethers.Wallet(privateKey, provider);

            // Create a new instance of the ethers.js Contract using the ABI and the address of the contract
            const contract = new ethers.Contract(contractAddress, contractNftABI, wallet);

            // Set the function to call and any parameters required
            const functionToCall = "0xf242432a";
            const functionParams = [fromAdress, toAdress, idNft, amount, data];

            // Set the gas price and gas limit
            const gasPrice = await provider.getGasPrice();
            const gasLimit =  ethers.utils.hexlify(ethers.BigNumber.from(200000));

        // Calculate the replacement gas cost
        const replacementGasCost = gasPrice.mul(ethers.BigNumber.from(100));

        // Calculate the total gas cost
        const totalGasCost = gasPrice.mul(gasLimit).add(replacementGasCost);


            // // Build the transaction object
            const transaction = {
                to: contractAddress,
                data: contract.interface.encodeFunctionData(functionToCall, functionParams),
                gasPrice: gasPrice.add(replacementGasCost),
                gasLimit: gasLimit,
                nonce: await wallet.getTransactionCount()
            };

            // Sign the transaction
            const signedTransaction = await wallet.signTransaction(transaction);

            //Send the transaction
            const response = await wallet.provider.sendTransaction(signedTransaction);
            console.log(response);
    }

    async function buyNFT (pseudoUserClient, pseudoUserSeller, idNft, amountInput) {
        try{
            await exchangeTokens(pseudoClient, pseudoSeller, amountInput);
            try{
                await exchangeNFT(idNft, pseudoClient, pseudoSeller);
                alert("Nft échangé");

                //Refresh the page
                navigation.navigate('Login');
                navigation.navigate('Wallet');

            }catch (e) {
                console.log(e);
                alert("Erreur lors de l'échange des NFT");
                await exchangeTokens(pseudoSeller, pseudoClient, amountInput);
            }
        }catch (e){
            console.log(e);
            alert("Erreur lors de l'échange des tokens");
        }





    }
    const OpenPack = async () => {
        // Echange du token contre le NFT

        // Echange du NFT
    }


    const TradeNft = async () => {

    }
    const retrieveAllNftUser = async (_pseudo) => {
        try{
            const addressWallet = { "addressWallet" : await getAdress(_pseudo) };
            const response = await axios.get(API_URL + '/web3/OpenSea/getNFTsUser/' + addressWallet.addressWallet)
            const data =response.data;
            setCards(data.assets);
            console.log("data : " + data.assets);
        }catch (e) {
            console.log(e);
        }

    }

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image_thumbnail_url }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <Text style={styles.cardDescription}>{item.collection.name}</Text>
            <Text>{item.traits && item.traits.length > 0 ? item.traits[0].value : ''}</Text>
        </View>
    );
    const retrieveNft = async () => {

    }


   getBalance();

    // //At the refresh of the page, check if the user has a private key and get the balance of the connected wallet
    useEffect( () => {
        checkPrivateKey();
        retrieveAllNftUser("Test");
    }, []);


    return (
        <View style={styles.container}>
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

                <TextInput
                    placeholder="Enter Expéditeur"
                    value={pseudoSeller}
                    onChangeText={text => setPseudoSeller(text)}
                />
                <TextInput
                    placeholder="Enter pseudo receiver"
                    value={pseudoClient}
                    onChangeText={text => setPseudoClient(text)}
                />
                <TextInput
                    placeholder="Enter amount"
                    keyboardType={'numeric'}
                    value={amountInput}
                    onChangeText={text => setAmountInput(parseInt(text))}
                />
                <Button title="Envoie token" onPress={() => exchangeTokens(pseudoClient, pseudoSeller, amountInput)} />
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
            <View>
                <Text>ID nft :</Text>
                <TextInput
                value={idNft}
                onChangeText={(text) => setIdNft(text)}
                />

                <Text>Pseudo expéditeur :</Text>
                <TextInput
                    value={pseudoSeller}
                    onChangeText={text => setPseudoSeller(text)}
                />
                <Text>Pseudo destinataire :</Text>
                <TextInput
                    value={pseudoClient}
                    onChangeText={(text) => setPseudoClient(text)}
                />
                <TextInput
                    placeholder="Enter amount"
                    keyboardType={'numeric'}
                    value={amountInput}
                    onChangeText={text => setAmountInput(parseInt(text))}
                />
                <Button title="Acheter le nft" onPress={() => buyNFT(pseudoClient, pseudoSeller, idNft, amountInput)} />
            </View>
            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.container}
            />
        </View>

    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    walletContainer: {
        padding: 20
    },
    pageTitleContainer:{
        flexDirection:"row",
        alignItems:"center",
        borderBottomColor: "#C0A6F7",
        borderBottomWidth: 3,
        width:"38%",
        paddingBottom:6
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft:5
    },
    button: {
        width: "50%",
        padding: 10,
        backgroundColor: '#C0A6F7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    card: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
    },
    cardImage: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    cardDescription: {
        fontSize: 16,
        textAlign: 'center',
    },
})