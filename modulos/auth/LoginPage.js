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

var { altoVentana, anchoVentana } = Dimensions.get('window');

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

    _userLogin = () =>{
        this.setState({consultando: true, mensaje: ''});
        let parametros = {
            usuario: this.state.usuario,
            password: this.state.password,
            grant_type: 'password'
        }
        let formBody = [];
        for (var propiedad in parametros){
            var llaveCod = encodeURIComponent(propiedad);
            var valorCod = encodeURIComponent(parametros[propiedad]);
            formBody.push(llaveCod + "=" + valorCod);
        }
        formBody = formBody.join("&");
        var proceed = false;
        fetch("http://desarrollo.yesynergy.com/admin/index.php/mobile/autenticarEstudiante", {
            method: "POST", 
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
          })
          .then((response) => response.json())
          .then((response) => {
            if (response.error) this.setState({mensaje: response.mensaje});
            else proceed = true;
          })
          .then(() => {
            this.setState({consultando: false})
            if (proceed) {
                AsyncStorage.setItem('userToken', this.state.usuario);
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
                    <Text>
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
    box: {
        height: altoVentana / 3
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
        flex:2,
        paddingTop: 20
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
        paddingTop:10
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