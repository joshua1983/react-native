import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions,  Platform, ToastAndroid } from 'react-native';
import {Textarea, Content, Form} from 'native-base';


class CajaTexto extends React.Component {

    state = {
        texto: ''
    }

    constructor(props){
      super(props);    
      this._actualizaTexto = this._actualizaTexto.bind(this);
    }

    _guardar(){
        this._informar();
    }

    _actualizaTexto(event){
        this.setState({
            texto: event.target.value
        })
    }

    _informar(){
        if (Platform.OS == 'android'){
            ToastAndroid.show('Respuesta guardada!', ToastAndroid.SHORT);
        }else{
            Alert.alert(
                'Plataforma',
                'Respuesta guardada',
                [
                  {text: 'Ok'}
                ],
                { cancelable: false }
              )
        }

    }

    render() {
      return (

            <Content padder>
                <Form>
                    <Textarea value={this.state.texto} onChange={this._actualizaTexto} rowSpan={5} bordered  />
                </Form>
            </Content>
                
        
         
      );
    }
  }

  const esTextarea = StyleSheet.create({
    container: {
      padding: 5,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    textButton: {
      padding: 20
    }
  });


  export default CajaTexto;