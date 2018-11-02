import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Content, Text, Button, Card, CardItem, Body, View } from 'native-base';
import Imagenes from '../utils/Images';
import RenderHTML from '../core/RenderHTML';


export default class PaginaUser extends React.Component {
    static navigationOptions = {
      
        headerTitle: (
            <View style={{flex:1, flexDirection:'row',backgroundColor:'#872386', alignItems:'center'}}>
                
                    <Text style={{
                        flex:1, 
                        fontSize:20, 
                        fontWeight:'bold', 
                        color:'white', 
                        paddingLeft:10}}></Text>
                
                <Image
                    source={Imagenes.barraLogo}
                    style={{flex:2, width: 190, height: 57, padding:10}} 
                />
            </View>
        ),
        headerTintColor: "#872386",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };
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
            }],
        NoPagina: false
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
                val3: "-",
                lbl1: "-",
                lbl2: "-",
                lbl3: "-"
            }],
            NoPagina: false
        };

        this.renderHTML = React.createRef();

    }

    //+    this.state.Nivel+'/'+this.state.unidad+'/'+this.state.libro
    componentDidMount(){
        let URL_consulta = "http://admin.yesynergy.com/index.php/mobile/getPaginasJSON/"+this.state.Nivel+"/"+this.state.Unidad+"/"+this.state.Libro;
        
        return fetch(URL_consulta)
            .then( response => response.json())
            .then( responseJson =>  {
                if (responseJson.length == 0){
                    this.setState({NoPagina: true});
                }else{
                    this.setState({ cargando: false, paginas: responseJson, NoPagina: false }); 
                }
                
                
            })
            .catch((error) =>{
            console.error(error);
        });

        

    }

    _siguiente = () =>{
        
        if (this.state.pagina +1 != this.state.paginas.length){
            this.setState({
                pagina: this.state.pagina + 1
            }, () => {
                this.renderHTML._renderPagina(this.state.paginas[this.state.pagina]);
            });
            
        }
        this.forceUpdate();
    }

    _anterior = () =>{       
        if (this.state.pagina -1 > -1){
            this.setState({
                pagina: this.state.pagina -1 
            }, () => {
                this.renderHTML._renderPagina(this.state.paginas[this.state.pagina]);
            });   
        }
        this.forceUpdate();
    }

    render(){

        if (this.state.NoPagina){
            return (
                <View>
                  <Text>Opcion no disponble</Text>
                </View>
              );
        }
        if (this.state.cargando == true ){
            return (
              <View>
                <Text>Cargando...</Text>
              </View>
            );
          }

        return (
            <Container>
                
                <Content>
                    <Card>
                        <CardItem>
                            <Body >
                                
                                <RenderHTML
                                    libro = {this.state.Libro}
                                    unidad = {this.state.Unidad}
                                    nivel = {this.state.Nivel}
                                    html = {this.state.paginas[this.state.pagina].html}
                                    tipo = {this.state.paginas[this.state.pagina].tipo}
                                    id1 = {this.state.paginas[this.state.pagina].id1}
                                    id2 = {this.state.paginas[this.state.pagina].id2}
                                    id3 = {this.state.paginas[this.state.pagina].id3}
                                    val1 = {this.state.paginas[this.state.pagina].val1}
                                    val2 = {this.state.paginas[this.state.pagina].val2}
                                    val3 = {this.state.paginas[this.state.pagina].val3}
                                    lbl1 = {this.state.paginas[this.state.pagina].lbl1}
                                    lbl2 = {this.state.paginas[this.state.pagina].lbl2}
                                    lbl3 = {this.state.paginas[this.state.pagina].lbl3}
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