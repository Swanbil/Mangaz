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
import NftCollections from "./NftCollections";
import collectionsData from "../utilities/collections.json";

export default function Web3ProfilePicture({
  navigation,
  isSubscribe,
  userInfos,
  pseudo,
  address,
  listNftUser,
  balance,
  isBlack,
}) {
  return (
    <View style={{ top: -20 }}>
      <View>
        <View style={{ padding: 20, marginTop: 30 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{}}>
                <Image
                  source={{ uri: userInfos?.profilepicture }}
                  style={{
                    width: 82,
                    height: 82,
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: "black",
                  }}
                />
                <View style={{ position: "absolute", left: 58, top: -1 }}>
                  {isSubscribe ? (
                    <Image
                      source={require("../assets/Verified.png")}
                      style={{ width: 26, height: 26 }}
                    />
                  ) : null}
                </View>
              </View>
              <View style={{ marginLeft: 8 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: isBlack ? "black" : "white",
                  }}
                >
                  {pseudo}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "400",
                    color: isBlack ? "black" : "white",
                  }}
                >
                  {address?.slice(0, 5) + "..." + address?.slice(-4)}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "400",
                    color: isBlack ? "black" : "white",
                  }}
                >
                  Nft possedés : {listNftUser?.length}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: isBlack ? "black" : "white",
                  borderRadius: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                <Image
                  source={require("../assets/Web3/logoZenCash.png")}
                  style={{
                    width: 34,
                    height: 34,
                    position: "absolute",
                    left: -12,
                  }}
                />
                {balance.toString().length > 5 ? (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "400",
                      marginLeft: 17,
                      color: isBlack ? "white" : "black",
                    }}
                  >
                    {balance?.toLocaleString().slice(0, 1) +
                      ".." +
                      balance?.toLocaleString().slice(-3)}{" "}
                    ZC
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "400",
                      marginLeft: 17,
                      color: isBlack ? "white" : "black",
                    }}
                  >
                    {balance?.toLocaleString()} ZC
                  </Text>
                )}
              </View>
              <View style={{ position: "absolute", right: -3, top: 18 }}>
                <TouchableOpacity onPress={() => navigation.navigate("BuyTokenScreen")}>
                  <Image
                    source={require("../assets/Web3/AddToken.png")}
                    style={{ width: 15, height: 16, borderRadius: 50 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
