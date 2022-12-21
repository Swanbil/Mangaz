import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HeaderNavigator = (props) => {
  return (
    <View style={styles.headerStyle}>
        <Text style={styles.textHeader}>{props.title}</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  textHeader:{
    fontSize: 15, 
    fontWeight: "bold", 
    color: "black", 
    padding:8,
    backgroundColor:"#C0A6F7",
    borderRadius:10,
    overflow:"hidden"
  },
  headerStyle: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#FFFFFF',
    paddingTop:6,
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 2,
  }
});

export default HeaderNavigator;