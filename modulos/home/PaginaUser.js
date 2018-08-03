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
                tipo: 1,
                id1: "-",
                id2: "-",
                id3: "-",
                val1: "-",
                val2: "-",
                val3: "-"
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
                tipo: 1,
                id1: "-",
                id2: "-",
                id3: "-",
                val1: "-",
                val2: "-",
                val3: "-"
            }]
        };

        this.renderHTML = React.createRef();

    }

    //+    this.state.Nivel+'/'+this.state.unidad+'/'+this.state.libro
    componentDidMount(){
        let URL_consulta = "http://admin.yesynergy.com/index.php/mobile/getPaginasJSON/"+this.state.Nivel+"/"+this.state.Unidad+"/"+this.state.Libro;
        return fetch(URL_consulta)
            .then( response => response.json())
            .then( responseJson => this.setState({ cargando: false, paginas: responseJson }) )
            .catch((error) =>{
            console.error(error);
        });

        

    }

    _siguiente = () =>{
        this.renderHTML._siguiente();
        if (this.state.pagina +1 != this.state.paginas.length){
            this.setState({
                pagina: this.state.pagina + 1
            });

        }
    }

    _anterior = () =>{       
        this.renderHTML._anterior(); 
        if (this.state.pagina -1 > -1){
            this.setState({
                pagina: this.state.pagina -1 
            });
        }
        
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
                            <Body >
                                
                                <RenderHTML
                                    html = {this.state.paginas[this.state.pagina].html}
                                    tipo = {this.state.paginas[this.state.pagina].tipo}
                                    id1 = {this.state.paginas[this.state.pagina].id1}
                                    id2 = {this.state.paginas[this.state.pagina].id2}
                                    id3 = {this.state.paginas[this.state.pagina].id3}
                                    val1 = {this.state.paginas[this.state.pagina].val1}
                                    val2 = {this.state.paginas[this.state.pagina].val2}
                                    val3 = {this.state.paginas[this.state.pagina].val3}
                                    ref = { instancia => { this.renderHTML = instancia }}
                                />
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body style={estilos.botones}>
                            {
                                (this.state.pagina -1) > -1 &&
                                
                                <Button iconLeft rounded warning onPress={this._anterior} > 
                                    <Text style={estilos.textButton} >Anterior </Text>
                                </Button>
                            }  
                            {
                                ( (this.state.pagina +1) != (this.state.paginas.length) || this.state.pagina == 0) &&
                                <Button iconRight rounded success onPress={this._siguiente} > 
                                    <Text style={estilos.textButton} >Siguiente </Text>
                                </Button>

                            }
                              
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
    botones: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listaItems:{
        backgroundColor: "transparent"
    }
})