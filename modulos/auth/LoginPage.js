import React, {Component} from 'react';
import { StyleSheet, View, ScrollView, WebView } from 'react-native';
import { Container, Header, Content, Button, Text, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class LoginPage extends Component {

    state = {
        usuario: '',
        password: '',
        consultando: false,
        mensaje: ''
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
            if (proceed) this.props.onLoginPress();
          })
          .done();
    }

    limpiarUsuario = () =>{
        this._usuario.setNativeProps({text:''});
        this.setState({mensaje:''});
    }

    limpiarPassword = () =>{
        this._password.setNativeProps({text:''});
        this.setState({mensaje: ''});
    }

    render(){
        return (
        <Container style={{padding: 30}}>
            <Row>
                <Header />
                <Content>
                    <Text 
                        style={{fontSize: 27}}>
                        Login
                    </Text>
                    <Input 
                        ref={component => this._usuario = component}
                        placeholder='Usuario' 
                        onChangeText={(usuario) => this.setState({usuario})} 
                        onFocus={this.limpiarUsuario}
                        autoFocus= {true}
                        style={styles.inputLetra}
                    />
                    <Input 
                        ref={component => this._password = component}
                        placeholder='Contraseña' 
                        onChangeText={(password) => this.setState({password})} 
                        onFocus={this.limpiarPassword}
                        secureTextEntry={true}
                        onSubmitEditing={this._userLogin}
                        style={styles.inputLetra}
                    />
                    <Button 
                            variant="contained"
                            color="primary"
                            onPress={this._userLogin}
                            title="Entrar"
                            disabled = {this.state.consultando || !this.state.usuario || !this.state.password}
                        >
                        <Text> Entrar </Text>
                    </Button>
                    {this.state.consultando && <ActivityIndicator/>}
                    {!!this.state.mensaje && (
                        <Text
                            style={styles.mensajeAlerta}>
                            {this.state.mensaje}
                        </Text>
                    )}
                </Content>
            </Row>
        </Container>
        )
    }
}

const styles = StyleSheet.create({
    inputLetra: {
        fontSize: 20
    },
    mensajeAlerta:{
        fontSize: 14,
        color: 'red',
        padding: 5
    }
})