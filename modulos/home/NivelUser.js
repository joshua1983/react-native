import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Text, ListItem, ListView, View } from 'native-base';
import { AppLoading } from 'expo';
import Breadcrumb from 'react-native-breadcrumb';  


export default class NivelUser extends React.Component {

    
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

    render(){
        if (this.state.cargando) {
            return <AppLoading/>;
        }
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
        textAlign: 'center'
    }
})