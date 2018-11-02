import React from 'react';
import { StyleSheet, Image, TouchableOpacity, AsyncStorage, ImageBackground, Dimensions } from 'react-native';
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

    static navigationOptions = {
        headerTitle: (
            <View style={{flex:1, flexDirection:'row',backgroundColor:'#872386', alignItems:'center'}}>
                
                    <Text style={{
                        flex:1, 
                        fontSize:20, 
                        fontWeight:'bold', 
                        color:'white', 
                        paddingLeft:10}}>Home</Text>
                
                <Image
                    source={Imagenes.barraLogo}
                    style={{flex:2, width: 190, height: 57, padding:10}} 
                />
            </View>
        ),
            
        
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };
    
    state = {
        usuario:{},
        cargando: true
    };

    constructor(props){
        super(props);
    }

    

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
                this.props.navigation.setParams({header:null})
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
                <ImageBackground 
                source={Imagenes.fondoHome} 
                style={{width: '100%', height: '100%', flex:1}}
                resizeMode='cover' 
                >
                <Grid >
                    <Row>
                        <Text style={styles.titulo}>Bienvenido: {this.state.usuario.nombres} {this.state.usuario.apellidos}</Text>
                    </Row>
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
                </ImageBackground>
            </Container>
            
        )

    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        position: 'absolute'
    },
    titulo:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }

});