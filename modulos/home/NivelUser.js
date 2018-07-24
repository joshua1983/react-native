import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Text, ListItem, ListView, View } from 'native-base';
import Imagenes from '../utils/Images';
import Breadcrumb from 'react-native-breadcrumb';  


export default class NivelUser extends React.Component {

    
    niveles = ["A1", "A2.1", "A2.2", "B1.1", "B1.2", "B2"];
    state = {
        Libro: ''
    }

    constructor(){
        super();
    }

    componentWillMount(){
        let libro = this.props.navigation.getParam('Libro', '-');
        
        this.setState({
            Libro: libro,
            Nivel: '-'
        });
    }

    loadUnidad = (nivel) => {
        this.props.navigation.navigate('Unidad',{
            Libro: this.state.Libro,
            Nivel: nivel
        });
    }
    loadLibro = () => {
        this.props.navigation.navigate('Home');
    }

    render(){
        var i =0;
        return (
            <Container>
                <Breadcrumb
                        entities={[this.state.Libro]}
                        isTouchable={true}
                        flowDepth={0}
                        height={30}
                        borderRadius={5}
                />
                
            <Text style={estilos.titulo}>Seleccione el nivel</Text>
            <Content style={{padding: 10}}>
                {this.niveles.map(r => {
                    return (
                        

                            <ListItem key={r} onPress = { () => this.loadUnidad(r) }>
                                <Text>Nivel {r}</Text>
                            </ListItem>

                        
                    )
                    
                })}
            </Content>
            </Container>
        )
    }
}
const estilos = StyleSheet.create({
    titulo: {
        fontSize: 17,
        fontWeight: 'bold',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
})