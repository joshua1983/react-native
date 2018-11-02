import React from 'react';
import { StyleSheet, TextInput, View, ScrollView, Dimensions,  Platform, ToastAndroid } from 'react-native';
import { Content, Text} from 'native-base';


class TextoInput extends React.Component {

    state = {
        texto: '',
        id: '',
        lbl: '',
        val: ''
    }

    constructor(props){
      super(props);    
      this._actualizaTexto = this._actualizaTexto.bind(this);
      this.state.id = this.props.id;
      this.state.lbl = this.props.lbl;
      this.state.val = this.props.val;
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

            
                <View style={esTextarea.container}>
                <Text style={esTextarea.cajaNumero}>{this.state.lbl}</Text>
                    <TextInput
                    name={this.state.id}
                    style={esTextarea.cajaTexto}
                    underlineColorAndroid="transparent"
                    />
                </View>
            
      );
    }
  }

  const esTextarea = StyleSheet.create({
    container: {
      padding: 5,
      flex: 1,
      flexDirection: 'row'
    },
    cajaNumero:{
        backgroundColor:'#2ab041',
        borderWidth: 1,
        borderColor:'#2ab041',
        padding: 5,
        color: 'white',
        height: 30
    },
    cajaTexto:{
        flex:2,
        textAlign: 'left',
        borderWidth: 2,
        backgroundColor: 'transparent',
        borderColor: '#c885ba',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        color: 'black',
        height: 30,
        paddingLeft: 5
    }
  });


  export default TextoInput;