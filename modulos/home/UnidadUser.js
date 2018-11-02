import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Content, Text, ListItem, View } from 'native-base';
import Imagenes from '../utils/Images'; 


export default class UnidadUser extends React.Component {
    static navigationOptions = {
        headerBackTitle: 'Atras',
        headerTitle: (
            <View style={{flex:1, flexDirection:'row',backgroundColor:'#872386', alignItems:'center'}}>
                
                    <Text style={{
                        flex:1, 
                        fontSize:20, 
                        fontWeight:'bold', 
                        color:'white', 
                        paddingLeft:10}}>Unidad</Text>
                
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
        Id: 0,
        Libro: '',
        Nivel: '',
        Unidades: []
    }

    constructor(props){
        super(props);
        let libro = this.props.navigation.getParam('Libro', '-');
        let nivel = this.props.navigation.getParam('Nivel', '-');
        let idUsuario = this.props.navigation.getParam('Id', '-');
        this.state.Libro = libro;
        if (nivel == 'A21') nivel= 'A2.1';
        if (nivel == 'A22') nivel= 'A2.2';
        if (nivel == 'B11') nivel= 'B1.1';
        if (nivel == 'B12') nivel= 'B1.2';
        this.state.Nivel = nivel;
        this.state.Id = idUsuario;
        this._getUnidadesUsuario(idUsuario);
    }

    loadPagina = (pagina) => {
        this.props.navigation.navigate('Pagina',{
            Libro: this.state.Libro,
            Nivel: this.state.Nivel,
            Unidad: pagina
        });
    }

    _getUnidadesUsuario(id){
        let url = "http://admin.yesynergy.com/index.php/mobile/getUnidadesEstudiante/"+id+"/"+this.state.Nivel.replace('.','');
        
        fetch(url, {
                method: "GET"
            })
            .then((response) => response.json())
            .then((response) => {
                if (Array.isArray(response)){
                    this.setState({
                        Unidades: response,
                        cargando:false
                    })
                }else{
                    this.setState({
                        Unidades:[]
                    })
                }
                

            });
    }
    
    componentWillMount(){
        let libro = this.props.navigation.getParam('Libro', '-');
        let nivel = this.props.navigation.getParam('Nivel', '-');
        if (nivel == 'A21') nivel= 'A2.1';
        if (nivel == 'A22') nivel= 'A2.2';
        if (nivel == 'B11') nivel= 'B1.1';
        if (nivel == 'B12') nivel= 'B1.2';
        
        this.setState({
            Libro: libro,
            Nivel: nivel
        });
    }


    render(){
        var i =0;
        return (
            <Container>
                
                <Text style={estilos.titulo}>Seleccione la unidad</Text>
                <Content style={{padding: 10}}>
                    {this.state.Unidades.map(r => {
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