import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import Arrastrar from '../Arrastrar';

export default class Interactive extends React.Component{
    render(){
        return (
            <View>
                <View style={styles.dropZone}>

                </View>
                <View style={styles.row}>
                    <Arrastrar />
                    <Arrastrar />
                    <Arrastrar />
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    },
    dropZone:{
        height: 200,
        backgroundColor: "#00334d"
    },
    row:{
        flexDirection: "row"
    }
})