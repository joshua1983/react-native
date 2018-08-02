import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Platform, ToastAndroid } from 'react-native';
import { Grid, Col, Button, Toast } from 'native-base';


class DosBotones extends React.Component {

    state = {
        opcion1text: 'Opcion 1',
        opcion1valor: '0',
        opcion2text: 'Opcion 2',
        opcion2valor: '0',
        opcionSeleccionada: '0'
    }

    constructor(props){
      super(props);    

    }

    _selOpcion1 =() =>{
        this.setState({
            opcionSeleccionada: this.state.opcion1valor
        });
    }
    _selOpcion2 =() =>{
        this.setState({
            opcionSeleccionada: this.state.opcion2valor
        });
    }

    _guardar(){
        this._informar();
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

            <View style={esDosBotones.container}>
                <Button onPress={this._selOpcion1} info>
                    <Text style={esDosBotones.textButton}> {this.state.opcion1text}</Text>
                </Button>
                <Button warning>
                    <Text onPress={this._selOpcion2} style={esDosBotones.textButton}> {this.state.opcion2text}</Text>
                </Button>
           </View>
        
         
      );
    }
  }

  const esDosBotones = StyleSheet.create({
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


  export default DosBotones;