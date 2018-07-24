import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Text, ListItem } from 'native-base';
import Imagenes from '../utils/Images';
import Breadcrumb from 'react-native-breadcrumb';  


export default class UnidadUser extends React.Component {

    
    unidades = ["1", "2", "3", "4", "5", "6", "7", "8"];
    state = {
        Libro: '',
        Nivel: ''
    }

    constructor(){
        super();
    }

    loadPagina = (pagina) => {
        this.props.navigation.navigate('Pagina',{
            Libro: this.state.Libro,
            Nivel: this.state.Nivel,
            Unidad: pagina
        });
    }
    
    componentWillMount(){
        let libro = this.props.navigation.getParam('Libro', '-');
        let nivel = this.props.navigation.getParam('Nivel', '-');
        
        this.setState({
            Libro: libro,
            Nivel: nivel
        });
    }


    render(){
        var i =0;
        return (
            <Container>
                <Breadcrumb
                        entities={[this.state.Libro, "Nivel "+ this.state.Nivel+" "]}
                        isTouchable={true}
                        flowDepth={0}
                        height={30}
                        borderRadius={5}
                />
                <Text style={estilos.titulo}>Seleccione la unidad</Text>
                <Content style={{padding: 10}}>
                    {this.unidades.map(r => {
                        return (
                                <ListItem key={r} style={estilos.listaItems} onPress = { () => this.loadPagina(r) }>
                                    <Text>Unidad {r}</Text>
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
    },
    listaItems:{
        backgroundColor: "transparent"
    }
})