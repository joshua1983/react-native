import React from 'react';
import { StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Button, Text,  Grid, Col, Row } from 'native-base';
import EncabezadoHome  from '../utils/EncabezadoHome';
import Imagenes from '../utils/Images';
 

const estilos = StyleSheet.create({
    imagen: {
        height: 100,
        width: 100
    }
});

export default class HomeUser extends React.Component {

    static navigationOptions = {
        title: 'Welcome to the Yesynergy!',
    };

    loadBook = () =>{
        this.props.navigation.navigate('Nivel',{
            Libro: 'Book'
        });
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render(){
        return (
            <Container>
                <EncabezadoHome />
                <Grid style={{padding: 10}}>
                    <Row>
                        <Col></Col>
                        <Col>
                            <TouchableOpacity onPress = { this.loadBook }>
                                <Image
                                    style={estilos.imagen}
                                    source={Imagenes.bookImg}
                                    
                                />
                            </TouchableOpacity>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Image
                                style={estilos.imagen}
                                source={Imagenes.testImg}
                            />
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Image
                                style={estilos.imagen}
                                source={Imagenes.extraFlat}
                            />
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Button
                                onPress={this._signOutAsync}
                                title="Salir"
                            >
                                <Text> Salir </Text>
                            </Button>
                        </Col>
                        <Col></Col>
                        
                    </Row>
                </Grid>
                
            </Container>
        )

    }
}

