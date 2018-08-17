import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Platform, ToastAndroid } from 'react-native';
import { Grid, Col, Button, Toast } from 'native-base';


class TresBotones extends React.Component {

    

    constructor(props){
        super(props);    
        this.state = {
            id1: this.props.id1,
            id2: this.props.id2,
            id3: this.props.id3,
            val1: this.props.val1,
            val2: this.props.val2,
            val3: this.props.val3,
            lbl1: this.props.lbl1,
            lbl2: this.props.lbl2,
            lbl3: this.props.lbl3,
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
    _selOpcion3 =() =>{
        this.setState({
            opcionSeleccionada: this.state.val3
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
            <View style={esTresBotones.botones}>
                <Button onPress={this._selOpcion1} info>
                    <Text style={esTresBotones.textButton}> {this.state.lbl1}</Text>
                </Button>
                <Button onPress={this._selOpcion2} warning>
                    <Text style={esTresBotones.textButton}> {this.state.lbl2}</Text>
                </Button>
                <Button onPress={this._selOpcion3} success>
                    <Text style={esTresBotones.textButton}> {this.state.lbl3}</Text>
                </Button>
            </View>
            <View style={esTresBotones.viewRespuesta}>
                <Text style={{textAlign: 'center'}}>
                    Seleccion: {"\n"} {this.state.opcionSeleccionada}
                </Text>
            </View>
        </View>
        
         
      );
    }
  }

  const esTresBotones = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    textButton: {
        padding: 20
    },
    botones:{
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewRespuesta: {
        backgroundColor: "#c885ba",
        borderRadius: 20
    }
  });


  export default TresBotones;