import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const RatingButton = ({ onValidate }) => {
    const [starRating, setStarRating] = useState(null);

    const validate = () => {
        onValidate(starRating)
    }
    return (
        <View style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <View style={styles.stars}>
                <TouchableOpacity onPress={() => setStarRating(1)}>
                    <MaterialIcons
                        name={starRating >= 1 ? 'star' : 'star-border'}
                        size={26}
                        style={starRating >= 1 ? styles.starSelected : styles.starUnselected}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(2)}>
                    <MaterialIcons
                        name={starRating >= 2 ? 'star' : 'star-border'}
                        size={26}
                        style={starRating >= 2 ? styles.starSelected : styles.starUnselected}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(3)}>
                    <MaterialIcons
                        name={starRating >= 3 ? 'star' : 'star-border'}
                        size={26}
                        style={starRating >= 3 ? styles.starSelected : styles.starUnselected}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(4)}>
                    <MaterialIcons
                        name={starRating >= 4 ? 'star' : 'star-border'}
                        size={26}
                        style={starRating >= 4 ? styles.starSelected : styles.starUnselected}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(5)}>
                    <MaterialIcons
                        name={starRating >= 5 ? 'star' : 'star-border'}
                        size={26}
                        style={starRating >= 5 ? styles.starSelected : styles.starUnselected}
                    />
                </TouchableOpacity>

            </View>
            <View style={{ marginLeft: 27, marginTop:10 }}>
                <TouchableOpacity onPress={() => validate()} style={{ borderColor: '#C0A6F7', borderWidth: 2, padding: 5, borderRadius: 7, backgroundColor: '#F4F4F4' }}>
                    <Text>Send</Text>
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