import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const RatingButton = ({  onChange, starRating }) => {
    

    const onChangeRating = (stars) => {
        onChange(stars);
    }
    return (
        <View style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <View style={styles.stars}>
                <TouchableOpacity onPress={() => onChangeRating(1)}>
                    <MaterialIcons
                        name={starRating >= 1 ? 'star' : 'star-border'}
                        size={30}
                        style={starRating >= 1 ? styles.starSelected : styles.starUnselected}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onChangeRating(2)}>
                    <MaterialIcons
                        name={starRating >= 2 ? 'star' : 'star-border'}
                        size={30}
                        style={starRating >= 2 ? styles.starSelected : styles.starUnselected}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onChangeRating(3)}>
                    <MaterialIcons
                        name={starRating >= 3 ? 'star' : 'star-border'}
                        size={30}
                        style={starRating >= 3 ? styles.starSelected : styles.starUnselected}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onChangeRating(4)}>
                    <MaterialIcons
                        name={starRating >= 4 ? 'star' : 'star-border'}
                        size={30}
                        style={starRating >= 4 ? styles.starSelected : styles.starUnselected}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onChangeRating(5)}>
                    <MaterialIcons
                        name={starRating >= 5 ? 'star' : 'star-border'}
                        size={30}
                        style={starRating >= 5 ? styles.starSelected : styles.starUnselected}
                    />
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stars: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    starUnselected: {
        color: '#aaa',
    },
    starSelected: {
        color: '#ffb300',
    },
});