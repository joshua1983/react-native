import React from 'react';
import { StyleSheet, AsyncStorage, Image } from 'react-native';
import { Container, Content, Text, ListItem, View } from 'native-base';
import { AppLoading } from 'expo';
import Imagenes from '../utils/Images';


export default class NivelUser extends React.Component {
    static navigationOptions = {
        headerBackTitle: 'Atras',
        headerTitle: (
            <View style={{flex:1, flexDirection:'row',backgroundColor:'#872386', alignItems:'center'}}>
                
                    <Text style={{
                        flex:1, 
                        fontSize:20, 
                        fontWeight:'bold', 
                        color:'white', 
                        paddingLeft:10}}>Nivel</Text>
                
                <Image
                    source={Imagenes.barraLogo}
                    style={{flex:2, width: 190, height: 57, padding:10}} 
                />
            </View>
        ),
        headerTintColor: "#872386",
        headerTitleStyle: {
          fontWeight: "bold",
          backgroundColor: '#872386'
        }
      };
    
    state = {
        Libro: '',
        niveles:["A1", "A2.1", "A2.2", "B1.1", "B1.2", "B2"],
        cargando:true
    }

    constructor(props){
        super(props);
    }

    async componentWillMount(){
        let libro = this.props.navigation.getParam('Libro', '-');
        
        this.setState({
            Libro: libro,
            Nivel: '-',
            cargando:true
        });
        await AsyncStorage.getItem('datosUsuario')
            .then(value => {
                let usuario = JSON.parse(value);
                this.setState({
                    usuario: usuario,
                    cargando: true
                });
                this._getNivelesUsuario(usuario.usuidentificador)
            })
            .done(() => {
            });
        
        
    }

    _getNivelesUsuario(id){
        let url = "http://admin.yesynergy.com/index.php/mobile/getNivelesEstudiante/"+id;


        fetch(url, {
                method: "GET"
            })
            .then((response) => response.json())
            .then((response) => {
                if (Array.isArray(response)){
                    this.setState({
                        niveles: response,
                        cargando:false
                    })
                }else{
                    this.setState({
                        niveles:[]
                    })
                }
                

            });
    }

    loadUnidad = (nivel) => {
        this.props.navigation.navigate('Unidad',{
            Libro: this.state.Libro,
            Nivel: nivel.replace('.',''),
            Id: this.state.usuario.usuidentificador
        });
    }
    loadLibro = () => {
        this.props.navigation.navigate('Home');
    }

    navegarBarra (index){
        console.log(index);
        if (index == 0){
            this.props.navigation.navigate('home');
        }
        
    }

    render(){
        if (this.state.cargando) {
            return <AppLoading/>;
        }
        return (
            <Container >
                
                
            <Text style={estilos.titulo}>Seleccione el nivel</Text>
            <Content style={estilos.contenido}>
                {this.state.niveles.map(r => {
                    if (r == 'A21') r= 'A2.1';
                    if (r == 'A22') r= 'A2.2';
                    if (r == 'B11') r= 'B1.1';
                    if (r == 'B12') r= 'B1.2';
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
        textAlign: 'center',
        color:'white'
    },
    contenido:{
        backgroundColor:'white',
        padding:10
    },
    fondoBread:{
        backgroundColor:'#902290',

    }
})