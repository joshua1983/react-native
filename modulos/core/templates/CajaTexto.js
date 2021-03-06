import React from 'react';
import { StyleSheet, TextInput, View, ScrollView, Dimensions,  Platform, ToastAndroid } from 'react-native';
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
                    <View style={esTextarea.container} >
                    <TextInput 
                    underlineColorAndroid="transparent"
                    style={esTextarea.cajaTexto}
                    value={this.state.texto} 
                    onChange={this._actualizaTexto} 
                    rowSpan={5} bordered  />
                    </View>
                </Form>
            </Content>
                
        
         
      );
    }
  }

  const esTextarea = StyleSheet.create({
    container: {
      padding: 5,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    textButton: {
      padding: 20
    },
    cajaTexto:{
        padding: 10,
        borderWidth: 1,
        borderColor: '#c885ba',
        borderRadius: 20,
        color: 'black',
    }
  });


  export default CajaTexto;