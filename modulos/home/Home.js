import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View, 
    Button,
    Image
} from 'react-native';
import Imagenes from '../utils/Images';

export default class Home extends React.Component {

    render(){
        return (

            <ScrollView style={{padding: 20}}>
            <Image 
                source={Imagenes.logoLogin}
            />
            <Text 
                style={{fontSize: 27}}>
                Bienvenido
            </Text>
            <View style={{margin:20}} />
            <Button
                        onPress={this.props.onLogoutPress}
                        title="Salir"
                    />
            </ScrollView>
        )
    }
}