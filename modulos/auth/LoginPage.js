import React, {Component} from 'react';
import { 
    ActivityIndicator, 
    AsyncStorage, 
    Dimensions, 
    StyleSheet, 
    View, 
    TextInput, 
    Text,
    Button,
    Image
} from 'react-native';
import Imagenes from '../utils/Images';



export default class LoginPage extends Component {

    state = {
        usuario: '',
        password: '',
        consultando: false,
        mensaje: ''
    }

    constructor(props){
        super(props);
    }

    async componentWillMount() {
    
        try {
          await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            FontAwesome: require('react-native-vector-icons/FontAwesome'),
            MaterialIcons:require('react-native-vector-icons/MaterialIcons')       
          });
        }catch (error) {
          console.log('error loading icon fonts', error);
        }
      }

    _userLogin = () =>{
        this.setState({consultando: true, mensaje: ''});
        let parametros = {
            usuario: this.state.usuario,
            password: this.state.password,
            grant_type: 'password'
        }
        let formBody = [];
        let datosUsuario = {};
        for (var propiedad in parametros){
            var llaveCod = encodeURIComponent(propiedad);
            var valorCod = encodeURIComponent(parametros[propiedad]);
            formBody.push(llaveCod + "=" + valorCod);
        }
        formBody = formBody.join("&");
        var proceed = false;
        fetch("http://admin.yesynergy.com/index.php/mobile/autenticarEstudiante", {
            method: "POST", 
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
          })
          .then((response) => response.json())
          .then((response) => {
            if (response.error){
                this.setState({mensaje: response.mensaje});
            }else{ 
                this.setState({mensaje: response.mensaje});
                datosUsuario = response.usuario;
                proceed = true;
            }

          })
          .then(() => {
            this.setState({consultando: false})
            if (proceed) {
                AsyncStorage.setItem('userToken', this.state.usuario);
                AsyncStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
                this.props.navigation.navigate('App');
            }
          })
          .done();
    }

    limpiarUsuario = () =>{
       // this._usuario.setNativeProps({text:''});
        this.setState({mensaje:''});
    }

    limpiarPassword = () =>{
       // this._password.setNativeProps({text:''});
        this.setState({mensaje: ''});
    }

    render(){

        return (
        
            <View style={estilos.container}>
                <View style={estilos.encabezado}>
                    <Image
                        source={Imagenes.logoLogin}
                        style={{paddingBottom:10}}
                    />
                    <Text style={estilos.textoEncabezado}>
                        Inicio de Sesión 
                    </Text>
                </View>
                <View style={estilos.formulario}>
                    <View style={estilos.viewInput}>        
                    <TextInput 
                        placeholder="Usuario"
                        ref={component => this._usuario = component}
                        onChangeText={(usuario) => this.setState({usuario})} 
                        onFocus={this.limpiarUsuario}
                        autoFocus= {true}
                        style={estilos.cajaTexto}
                        underlineColorAndroid='transparent'
                    />
                    </View>
                    <View style={estilos.viewInput}>
                    <TextInput 
                        placeholder="Contraseña"
                        ref={component => this._password = component}
                        onChangeText={(password) => this.setState({password})} 
                        onFocus={this.limpiarPassword}
                        secureTextEntry={true}
                        onSubmitEditing={this._userLogin}                                        
                        style={estilos.cajaTexto}
                        underlineColorAndroid='transparent'
                    />
                    </View>
                    <View style={estilos.viewWrapperButton}>
                        <View style={estilos.viewButton}>
                            <Button 
                                onPress={this._userLogin}
                                title="Entrar"
                                disabled = {this.state.consultando || !this.state.usuario || !this.state.password}
                                color = "#3aa849"
                            />
                        </View>                    
                    </View>
                </View>
                <View style={estilos.mensajes}>
                {this.state.consultando && <ActivityIndicator/>}
                {!!this.state.mensaje && (
                    <Text style={estilos.textoMensajes}>
                        {this.state.mensaje}
                    </Text>
                )}
                </View>
            </View>
        )
    }
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    encabezado: {
        paddingTop: 60,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoEncabezado:{
        color: "#3aa849",
        fontWeight: 'bold'
    },
    formulario: {
        flex:1,
        paddingTop: 5
    },
    viewInput: {
        padding: 10
    },
    viewWrapperButton:{
        justifyContent:'center',
        alignItems: 'center',
        padding: 10
    },
    viewButton: {
        width: 290
    },
    mensajes: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoMensajes: {
        fontSize: 15
    },
    cajaTexto: {
        textAlign: 'center',
        borderWidth: 2,
        backgroundColor: '#c885ba',
        borderColor: '#c885ba',
        borderRadius: 20,
        color: '#ffffff',
        height: 50
        
    }
})