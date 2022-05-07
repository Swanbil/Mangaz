import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function MangaReader({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>MangaReader</Text>
            <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
            
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
  });