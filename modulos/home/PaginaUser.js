import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Text, ListItem, Button } from 'native-base';
import Imagenes from '../utils/Images';
import Breadcrumb from 'react-native-breadcrumb';  
import RenderHTML from '../core/RenderHTML';


export default class PaginaUser extends React.Component {

    state = {
        Libro: '',
        Nivel: '',
        Unidad: '',
        Pagina: 1,
        Pagina_actual: 1,
        cargando: true
        }
    paginas = [];

    constructor(){
        super();
    }

    
    componentWillMount(){
        let libro = this.props.navigation.getParam('Libro', '-');
        let nivel = this.props.navigation.getParam('Nivel', '-');
        let unidad = this.props.navigation.getParam('Unidad', '1');
        
        this.setState({
            Libro: libro,
            Nivel: nivel,
            Unidad: unidad,
            Pagina: 1
        });


    }


    render(){

        if (this.state.cargando == true){
            return (
              <View>
                <Text>Cargando...</Text>
              </View>
            );
          }

        return (
            <Container>
                <Breadcrumb
                        entities={[this.state.Libro, "Nivel "+ this.state.Nivel+"", "Unidad "+this.state.Unidad]}
                        isTouchable={true}
                        flowDepth={0}
                        height={30}
                        borderRadius={5}
                />
                <Content>
                    <RenderHTML
                    Libro = {this.state.Libro}
                    Nivel = {this.state.Nivel}
                    Unidad = {this.state.Unidad}
                    Pagina = {this.state.Pagina}
                    />
                    
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