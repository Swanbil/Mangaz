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

    const connector = useWalletConnect();

    const connectWallet = React.useCallback(() => {
        navigation.navigate("TabNavigator", { screen: 'Wallet' });
        return connector.connect();
    }, window.connector = [connector]);

    const killSession = React.useCallback(() => {
        return connector.killSession();
        
      }, [connector]);

      
      const [balance, setBalance] = useState(0);

      const getBalance = React.useCallback(async () => {
          const provider = new ethers.providers.InfuraProvider('goerli');
          // Créer un contrat à partir de l'ABI et de l'adresse du contrat
          let contract = new ethers.Contract(contractAddress, contractABI, provider);
          // Utiliser la fonction de lecture "balanceOf" pour obtenir la balance de jetons pour une adresse spécifique
          let balance = await contract.balanceOf(connector.accounts[0]);
          setBalance(balance);
        }, [connector]);
      
      if(!!connector.connected){
          getBalance();
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
                <Text>{('Your adresse on the ether chain is ' + connector.accounts[0])}</Text>
                <TouchableOpacity onPress={killSession} style={styles.button}>
                <Text style={styles.buttonTextStyle}>Log out</Text>
                </TouchableOpacity>

                <Text>{`balance : ${balance} ZC`}</Text>
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