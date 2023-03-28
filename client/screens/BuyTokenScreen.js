import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome5";
import { API_URL } from "@env";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

import { useWalletConnect } from "@walletconnect/react-native-dapp";

// Import the required shims
import "@ethersproject/shims";

// Import the ethers library
import { ethers } from "ethers";
import {
  contractTokenABI,
  constTokenAddress,
  constNftAddress,
  contractNftABI,
  contractNftOpenSeaAddress,
  mangaZAddress,
} from "../Utils/constants";

//Import Wallet.js
import * as walletUtils from "../utilities/Wallet.js";
import { getNftsFromCollection } from "../utilities/Wallet.js";

import cardsData from "../utilities/card.json";
import collectionsData from "../utilities/collections.json";
import { useFocusEffect } from "@react-navigation/native";
import { getDataUser } from "../utilities/localStorage";
import ShopCard from "../components/ShopCard";
import NewCollections from "../components/NewCollections";
import NftCollections from "../components/NftCollections";
import Web3ProfilePicture from "../components/Web3ProfilePicture";
import userNfts from "../utilities/NftsUser.json";
import ShopCardDisplay from "../components/ShopCardDisplay";
import ShopToken from "../utilities/ShopToken.json";
import ShopTokenComnponent from "../components/ShopTokenComponent.js";

export default function BuyTokenScreen({ navigation, isSubscribe }) {
  const numColumns = 2;
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
  const [privateKeyInput, setPrivateKeyInput] = useState("");

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
      await walletUtils
        .getNftUser(
          contractNftOpenSeaAddress,
          listNftUser[i].token_id.justifyContent,
          address
        )
        .then((r) => setNfts((nfts) => [...nfts, r]));
    }
  };

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
  };

  const fetchData = async () => {
    const { userPseudo } = await getDataUser();
    const pseudo = userPseudo;
    setPseudo(userPseudo);

    getUserInfos();

    const userAddress = await walletUtils.getAddress(pseudo);
    setAddress(userAddress);

    // Get the balance of the connected wallet
    await walletUtils.getBalance(pseudo).then((balance) => {
      setBalance(balance);
    });

    if (userAddress) {
      await walletUtils.getAllNftUser(userAddress).then((listIdNft) => {
        setListNftUser(listIdNft);
        setAllNfts(listIdNft);
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Web3ProfilePicture
            address={address}
            balance={balance}
            listNftUser={listNftUser}
            pseudo={pseudo}
            userInfos={userInfos}
            isBlack={true}
          />
        </View>
        <View style={{ alignItems: "center", top: -20 }}>
          <View
            style={{
              zIndex: 1000,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ left: -30 }}
            >
              <Image
                source={require("../assets/arrow-left.png")}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 28, fontWeight: "400", left: -10 }}>
              {" "}
              Magasin{" "}
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", alignContent : 'center', alignItems : 'center', justifyContent : 'center' ,marginTop : 20 }}>
            {ShopToken.map((item) => (
              <ShopTokenComnponent
                key={item.idShop.toString()}
                navigation={navigation}
                element={item}
                style={{ width: "50%", paddingLeft: 2, paddingRight: 2 }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
