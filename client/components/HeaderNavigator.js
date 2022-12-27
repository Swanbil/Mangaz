import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const HeaderNavigator = (props) => {
  return (
    <View style={styles.headerStyle}>
      <View style={{position:'absolute', left:0, marginLeft:5}}>
        <Image source={require('../assets/MangaZ_logo.png')} style={{ width: 45, height: 45 }} resizeMode="contain" />
      </View>

      <View style={{}}>
        <Text style={styles.textHeader}>{props.title}</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    padding: 8,
    backgroundColor: "#C0A6F7",
    borderRadius: 10,
    overflow: "hidden",
    textAlign:'center'
  },
  headerStyle: {
    height: 60,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent:'center',

    paddingTop: 6,
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 2,
  }
});

export default HeaderNavigator;