import React, {Component} from 'react';
import { ActivityIndicator} from 'react-native';
import { Container, Content, Button, Text, Label, Form, Item, Input, Grid, Col } from 'native-base';
import EncabezadoLogin from '../utils/EncabezadoLogin';


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
       // this._usuario.setNativeProps({text:''});
        this.setState({mensaje:''});
    }

    limpiarPassword = () =>{
       // this._password.setNativeProps({text:''});
        this.setState({mensaje: ''});
    }

    render(){

        return (
        <Container >
            <Content>
                    <EncabezadoLogin titulo = "Login" />
                            <Form>
                                <Item floatingLabel>
                                    <Label>Usuario</Label>
                                    <Input 
                                        ref={component => this._usuario = component}
                                        onChangeText={(usuario) => this.setState({usuario})} 
                                        onFocus={this.limpiarUsuario}
                                        autoFocus= {true}
                                        
                                        
                                    />
                                </Item>
                                <Item  floatingLabel last>
                                    <Label>Contraseña</Label>
                                    <Input 
                                        ref={component => this._password = component}
                                        onChangeText={(password) => this.setState({password})} 
                                        onFocus={this.limpiarPassword}
                                        secureTextEntry={true}
                                        onSubmitEditing={this._userLogin}                                        
                                        
                                        
                                    />
                                </Item>
                                <Grid>
                                    <Col></Col>
                                    <Col style={{paddingTop: 5}}>
                                        <Button 
                                            variant="contained"
                                            color="primary"
                                            onPress={this._userLogin}
                                            title="Entrar"
                                            disabled = {this.state.consultando || !this.state.usuario || !this.state.password}
                                        >
                                        <Text> Entrar </Text>
                                        </Button>
                                    </Col>
                                    <Col></Col>
                                    
                                </Grid>
                            </Form>
                        {this.state.consultando && <ActivityIndicator/>}
                        {!!this.state.mensaje && (
                            <Text>
                                {this.state.mensaje}
                            </Text>
                        )}
                        
            </Content>
        </Container>
        )
    }
}
