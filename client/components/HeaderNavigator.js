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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader:{
    fontSize: 18, 
    fontWeight: "bold", 
    color: "black", 
  },
  headerStyle: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F6F6F6'
  }
});

export default HeaderNavigator;