import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Catalogue from "./Catalogue";
import axios from "axios";

export default function Home({ navigation, route, isLog }) {
  useEffect(() => {
    if (route.params?.userName) {
    }
  }, [route.params?.userName]);


  if (isLog) {
    return (
      <View style={styles.container}>
        {route.params?.userName && <Text style={{ margin: 10, fontWeight: "bold" }}>⛩ Hello <Text style={{color:"#C0A6F7"}}>{route.params?.userName}</Text> ⛩ </Text>}
        <Catalogue navigation={navigation}></Catalogue>

      </View>

    );
  }
  else {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginBottom: 15, fontWeight: "bold", color: "#C0A6F7" }}>Welcome on Mangaz</Text>
        <Image source={require('../assets/luffy.jpg')} style={{ width: 200, height: 200 }} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
          underlayColor='#fff'>
          <Text style={styles.textButton}>Go To Login Page </Text>
        </TouchableOpacity>

      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#C0A6F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
});