import React from 'react';
import { StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Button, Text,  Grid, Col, Row, View } from 'native-base';
import { AppLoading, Font } from 'expo';
import Imagenes from '../utils/Images';
 

const estilos = StyleSheet.create({
    imagen: {
        height: 100,
        width: 100
    }
});

export default class HomeUser extends React.Component {

    state = {
        usuario:{},
        cargando: true
    };

    constructor(props){
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('otherParam', 'Bienvenido'),
        };
      };
    

    loadBook = () =>{
        this.props.navigation.navigate('Nivel',{
            Libro: 'Book'
        });
    }

    loadTest = () => {
        this.props.navigation.navigate('Nivel',{
            Libro: 'Test'
        });
    }

    loadExtra = () => {
        this.props.navigation.navigate('Interactive',{
            Libro: 'Extra'
        });
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    _cacheSplashResourcesAsync = async () => {
        const gif = Imagenes.logoIntro;
        return Asset.fromModule(gif).downloadAsync()
    }

    async componentWillMount(){
        try {
            await Font.loadAsync({
              'Roboto': require("native-base/Fonts/Roboto.ttf"),
              'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf"),
              'FontAwesome': require('react-native-vector-icons/FontAwesome'),
              'MaterialIcons':require('react-native-vector-icons/MaterialIcons')         
            });
        }catch (error) {
            console.log('error loading icon fonts', error);
        }
        
        
        await AsyncStorage.getItem('datosUsuario')
            .then(value => {
                let usuario = JSON.parse(value);
                this.setState({
                    usuario: usuario,
                    cargando: false
                });
                this.props.navigation.setParams({otherParam: 'Bienvenido '+usuario.nombres + " " + usuario.apellidos})
            })
            .done(() => {
            });
    }


    render(){
        if (this.state.cargando) {
            return (
                <AppLoading/>
              );
        }
        return (
            <Container>
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
                            <TouchableOpacity onPress = { this.loadTest }>
                                <Image
                                    style={estilos.imagen}
                                    source={Imagenes.testImg}
                                />
                            </TouchableOpacity>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <TouchableOpacity onPress = { this.loadExtra }>
                                <Image
                                    style={estilos.imagen}
                                    source={Imagenes.extraFlat}
                                />
                            </TouchableOpacity>
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

