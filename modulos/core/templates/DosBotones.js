import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Platform, ToastAndroid } from 'react-native';
import { Grid, Col, Button, Toast } from 'native-base';


class DosBotones extends React.Component {

    

    constructor(props){
        super(props);    
        this.state = {
            id1: this.props.id1,
            id2: this.props.id2,
            val1: this.props.val1,
            val2: this.props.val2,
            opcionSeleccionada: '-'
        }
    }

    _selOpcion1 =() =>{
        this.setState({
            opcionSeleccionada: this.state.val1
        });
    }
    _selOpcion2 =() =>{
        this.setState({
            opcionSeleccionada: this.state.val2
        });
    }

    _guardar(){
        this._informar();
    }

    _informar(){
        if (Platform.OS == 'android'){
            ToastAndroid.show('Respuesta '+this.state.opcionSeleccionada+' guardada!', ToastAndroid.SHORT);
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
            <View style={esDosBotones.botones}>
                <Button onPress={this._selOpcion1} info>
                    <Text style={esDosBotones.textButton}> {this.state.val1}</Text>
                </Button>
                <Button onPress={this._selOpcion2} warning>
                    <Text style={esDosBotones.textButton}> {this.state.val2}</Text>
                </Button>
                
           </View>
           <View style={esDosBotones.viewRespuesta}>
                <Text style={{textAlign: 'center'}}>
                    Seleccion: {"\n"} {this.state.opcionSeleccionada}
                </Text>
            </View>
        </View>
         
      );
    }
  }

  const esDosBotones = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column'
    },
    botones: {
      padding: 5,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textButton: {
      padding: 20
    },
    viewRespuesta: {
        backgroundColor: "#c885ba",
        borderRadius: 20
    }
  });


  export default DosBotones;