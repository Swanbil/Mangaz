import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Button } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { API_URL } from '@env';
import axios from 'axios';

import { useWalletConnect } from '@walletconnect/react-native-dapp';
// Import the required shims
import '@ethersproject/shims';
// Import the ethers library
import { ethers } from 'ethers';
import { contractABI, constTokenAddress } from '../Utils/constants';

export default function Wallet({navigation }) {
    
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

    // To Address
    const [toAddressInput, setToAddressInput ] = useState('');

    const connectWallet = React.useCallback(() => {
        navigation.navigate("TabNavigator", { screen: 'Wallet' });
        return connector.connect();
    }, window.connector = [connector]);

    const killSession = React.useCallback(() => {
        return connector.killSession();
        
    }, [connector]);

    const getBalance = React.useCallback(async () => {
        const provider = new ethers.providers.InfuraProvider('goerli');

        // Créer un contrat à partir de l'ABI et de l'adresse du contrat
        let contract = new ethers.Contract(constTokenAddress, contractABI, provider);

        // Utiliser la fonction de lecture "balanceOf" pour obtenir la balance de jetons pour une adresse spécifique
        let balance = await contract.balanceOf(connector.accounts[0]);

        setBalance(balance);
    },[connector]);    
    
    async function exchangeTokens () {
        let tokenAddress = constTokenAddress;
        let toAddress = toAddressInput ;
        let amount = amountInput;


        //Appeler getPrivateKey pour récup la clé privé du receveur avec en entré le pseudo ecirt en input par l'envoyeur
        const privateKeyReceiver = await getPrivateKey();
        const walletReceiver = new ethers.Wallet(privateKeyReceiver);
        const addressReceiver = walletReceiver.address;


        if(amount == 0 || toAddress == "") {
            alert("Veuillez entrer une adresse et un montant");
            return;
        }

        // Create a new instance of the ethers.js provider
        const provider = new ethers.providers.InfuraProvider('goerli', '8846dcd958a74362bd06d7b4eae341c7');

        // Set the private key of the sender account
        const privateKey = await getPrivateKey();

        // Create a new instance of the ethers.js Wallet using the private key
        const wallet = new ethers.Wallet(privateKey, provider);

        // Create a new instance of the ethers.js Contract using the ABI and the address of the contract
        const contract = new ethers.Contract(tokenAddress, contractABI, wallet);

         // Set the function to call and any parameters required
        const functionToCall = "transfer";
        const functionParams = [toAddress, amount];

        // // Set the gas price and gas limit
        const gasPrice = await provider.getGasPrice();
        const gasLimit = 200000;

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

        alert("Transaction envoyée");

        //Refresh the page
        navigation.navigate('Login');
        navigation.navigate('Wallet');

    }

    /*
        Function for Private Key
     */
    const getPrivateKey = async () => {
        const user = { "userPseudo" : "U" };
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
        const response = await getPrivateKey();
        console.log("data in check function : " + response + "")
        if (response == null || response == "") {
            console.log("data not detect");
            setIsModal(true);
        } else {
            console.log("data detect");
            setIsModal(false);
        }
      };


    // //At the refresh of the page, check if the user has a private key and get the balance of the connected wallet
    useEffect( () => {
        checkPrivateKey();
        getBalance();
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
                    placeholder="Enter address"
                    value={toAddressInput}
                    onChangeText={text => setToAddressInput(text)}
                />
                <TextInput
                    placeholder="Enter amount"
                    keyboardType={'numeric'}
                    value={amountInput}
                    onChangeText={text => setAmountInput(parseInt(text))}
                />
                <TouchableOpacity onPress={exchangeTokens} style={styles.button}>
                <Text style={styles.buttonTextStyle}>exchange</Text>
                </TouchableOpacity>
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
    
})