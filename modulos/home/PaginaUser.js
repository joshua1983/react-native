import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { Container, Content, Text, ListItem, Button, Card, CardItem, Body } from 'native-base';
import Imagenes from '../utils/Images';
import Breadcrumb from 'react-native-breadcrumb';  
import RenderHTML from '../core/RenderHTML';


export default class PaginaUser extends React.Component {

    state = {
        Libro: '',
        Nivel: '',
        Unidad: '',
        pagina: 0,
        cargando: true,
        paginas: [{
                html: 'Cargando',
                tipo: 1
            }]
        }
    

    constructor(props){
        super(props);
        let libro = this.props.navigation.getParam('Libro', '-');
        let nivel = this.props.navigation.getParam('Nivel', '-');
        let unidad = this.props.navigation.getParam('Unidad', '1');
        
        this.state ={
            Libro: libro,
            Nivel: nivel,
            Unidad: unidad,
            pagina: 0,
            cargando: true,
            paginas: [{
                html: 'Cargando',
                tipo: 1
            }]
        };

        this.renderHTML = React.createRef();

    }

    //+    this.state.Nivel+'/'+this.state.unidad+'/'+this.state.libro
    componentDidMount(){
        return fetch('http://admin.yesynergy.com/index.php/mobile/getPaginasJSON/A1/1/book')
            .then( response => response.json())
            .then( responseJson => this.setState({ cargando: false, paginas: responseJson }) )
            .catch((error) =>{
            console.error(error);
        });

        

    }

    _siguiente = () =>{
        this.renderHTML._siguiente();
        this.setState({
            pagina: this.state.pagina + 1
        })
    }

    render(){

        if (this.state.cargando == true ){
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
                    <Card>
                        <CardItem>
                            <Body>
                                <RenderHTML
                                    html = {this.state.paginas[this.state.pagina].html}
                                    tipo = {this.state.paginas[this.state.pagina].tipo}
                                    ref = { instancia => { this.renderHTML = instancia }}
                                />
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                            <Button iconRight rounded success onPress={this._siguiente} > 
                                <Text style={estilos.textButton} >Siguiente </Text>
                            </Button>
                            </Body>
                        </CardItem>
                    </Card>
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