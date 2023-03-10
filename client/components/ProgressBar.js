import React from "react";
import { View, Text } from "react-native";

export const ProgressBar = (props) => {
    const { completed, toDo } = props;
    return (
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{ height: 10, width: 234, backgroundColor: '#333', borderRadius: 50 }}>
                <View style={{ height: 10, width: ((completed * 234) / toDo), backgroundColor: '#CF9BD8', borderRadius: 50, textAlign: 'right' }}>
                </View>
            </View>
            <View style={{marginLeft:7}}>
                <Text style={{ padding: 5, color: 'white', fontWeight: 'bold' }}>{`${completed}/${toDo}`}</Text>
            </View>
        </View>

    );
};
