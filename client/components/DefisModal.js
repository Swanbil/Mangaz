import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Modal, Pressable, ImageBackground } from 'react-native';
import { ProgressBar } from "./ProgressBar";

export const DefisModal = ({ isModalVisible, setModalVisible }) => {
    const defis = [{ title: "Lire 3 chapitres", toDo: 3, completed: 2 }, { title: "Lire un chapitre de One Piece", toDo: 1, completed: 0 }, { title: "Lire un manga de Glénat", toDo: 1, completed: 1 }];

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontWeight: '700', fontSize: 17 }}>Défis</Text>
                        <View>
                            {defis.map((defi) => (
                                <View key={defi.title} style={{marginVertical:15}}>
                                    <ImageBackground source={require('../assets/image_defis.png')} style={{ width: 290, height: 61 }} imageStyle={{ borderRadius: 12 }} resizeMode='cover' blurRadius={0.5}>
                                        <View style={{padding:10}}>
                                            <Text style={{ fontWeight: '500', fontSize: 15, color: 'white', marginBottom:3 }}>{defi.title}</Text>
                                            <ProgressBar completed={defi.completed} toDo={defi.toDo}/> 
                                        </View>

                                    </ImageBackground>
                                </View>
                            ))}
                        </View>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!isModalVisible)}>
                            <Text style={{ ...styles.textStyle, color: 'black' }}>Fermer</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 320
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        borderColor: '#2196F3',
        borderWidth: 2
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});