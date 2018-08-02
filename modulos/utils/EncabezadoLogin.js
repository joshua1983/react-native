import React, {Component} from 'react';
import { StyleSheet, Image } from 'react-native';
import { Header, Body, Left, Right, Title, Grid, Col } from 'native-base';
import Imagenes from '../utils/Images';



export default class EncabezadoLogin extends Component {

    state = {
        titulo: ''
    }

    constructor(props){
        super(props);
        this.state = {
            titulo : props.titulo
        }
    }

    render(){
        return(
                 
                    <Image
                        source={Imagenes.logoLogin}
                    />
                
        )
    }
}
const styles = StyleSheet.create({
    Body:{
        paddingTop: 40,
        backgroundColor: 'white'
    }
})