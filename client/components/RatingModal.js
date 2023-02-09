import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Modal, Pressable } from 'react-native';
import { RatingButton } from './RatingButton';

export const RatingModal = ({ onValidate, isModalVisible, setModalVisible, mangaName, responseMessage }) => {
    const [starRating, setStarRating] = useState(null);
    useEffect(() => {
        setStarRating(null);
    }, [])
    const validate = () => {
        onValidate(starRating)
    }
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
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Rate <Text style={{ color: '#C0A6F7' }}>{mangaName}</Text> !</Text>
                        <View style={{ marginVertical: 10 }}>
                            <RatingButton onChange={(stars) => setStarRating(stars)} starRating={starRating}/>
                            
                        </View>
                        <Text style={{textAlign:'center', marginBottom:8, fontSize:14, fontWeight:'bold'}}>{responseMessage}</Text>

                        <TouchableOpacity onPress={() => validate()} style={{ ...styles.button, backgroundColor: '#2196F3', width: 100, marginBottom: 10 }}>
                            <Text style={styles.textStyle}>Send</Text>
                        </TouchableOpacity>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!isModalVisible)}>
                            <Text style={{ ...styles.textStyle, color: 'black' }}>Hide Modal</Text>
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
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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