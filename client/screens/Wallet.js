import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useWalletConnect } from '@walletconnect/react-native-dapp';
// Import the required shims
import '@ethersproject/shims';
// Import the ethers library
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../Utils/constants';

export default function Wallet({navigation }) {

    //Wallet Connect 
    const connector = useWalletConnect();

    const connectWallet = React.useCallback(() => {
        navigation.navigate("TabNavigator", { screen: 'Wallet' });
        return connector.connect();
    }, window.connector = [connector]);

    const killSession = React.useCallback(() => {
        return connector.killSession();
        
    }, [connector]);

      
    // Get the balance of the connected wallet
    const [balance, setBalance] = useState(0);

    const getBalance = React.useCallback(async () => {
        const provider = new ethers.providers.InfuraProvider('goerli');
        // Créer un contrat à partir de l'ABI et de l'adresse du contrat
        let contract = new ethers.Contract(contractAddress, contractABI, provider);
        // Utiliser la fonction de lecture "balanceOf" pour obtenir la balance de jetons pour une adresse spécifique
        let balance = await contract.balanceOf(connector.accounts[0]);
        setBalance(balance);
    },[connector]);    
    
    getBalance();
    

    async function exchangeTokens () {
        let tokenAddress = "0x7b2F269a95863002B9174Cc1C2EeF478c61530D3";
        let fromAddress = "0x685EAa4fFDCa637EE8b3c2AC454E7Dbd4EFd2d64";
        let toAddress = "0x7424b8bfD8dB7d8Ed37cd7751a3C9F31f7467940"; 
        let amount = 0;

        // / Set the Infura endpoint and your API key
        const endpoint = 'https://goerli.infura.io/v3/8846dcd958a74362bd06d7b4eae341c7';

        // Create a new instance of the ethers.js provider
        //const provider = new ethers.providers.JsonRpcProvider(endpoint);
        
        const provider = new ethers.providers.InfuraProvider('goerli', '8846dcd958a74362bd06d7b4eae341c7');

        // Set the private key of the sender account
        const privateKey = '8d8d16a9c74ed6588821aef2eb4ff79379c9ed9ba9728a5cbda0c0fdf97c9da8';

        // Create a new instance of the ethers.js Wallet using the private key
        const wallet = new ethers.Wallet(privateKey, provider);

        const contract = new ethers.Contract(tokenAddress, contractABI, wallet);

         // Set the function to call and any parameters required
        const functionToCall = "transfer";
        const functionParams = [toAddress, amount];

        // // Set the gas price and gas limit
        const gasPrice = ethers.utils.parseUnits('10', 'gwei');
        const gasLimit =200000;

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

                <TouchableOpacity onPress={exchangeTokens} style={styles.button}>
                <Text style={styles.buttonTextStyle}>exchange</Text>
                </TouchableOpacity>
            </>
            )}

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