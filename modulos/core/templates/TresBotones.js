import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Platform, ToastAndroid } from 'react-native';
import { Grid, Col, Button, Toast } from 'native-base';


class TresBotones extends React.Component {

    state = {
        opcion1text: 'Opcion 1',
        opcion1valor: '0',
        opcion2text: 'Opcion 2',
        opcion2valor: '0',
        opcionSeleccionada: '0',
        opcion3valor: '0',
        opcion3text: 'Opcion 2',
        
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
    _selOpcion3 =() =>{
        this.setState({
            opcionSeleccionada: this.state.opcion3valor
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

            <View style={esTresBotones.container}>
                <Button onPress={this._selOpcion1} info>
                    <Text style={esTresBotones.textButton}> {this.state.opcion1text}</Text>
                </Button>
                <Button onPress={this._selOpcion2} warning>
                    <Text style={esTresBotones.textButton}> {this.state.opcion2text}</Text>
                </Button>
                <Button onPress={this._selOpcion3} success>
                    <Text style={esTresBotones.textButton}> {this.state.opcion3text}</Text>
                </Button>
           </View>
        
         
      );
    }
  }

  const esTresBotones = StyleSheet.create({
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


  export default TresBotones;