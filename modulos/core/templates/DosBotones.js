import React from 'react';
import { StyleSheet, Text, View, Platform, ToastAndroid, AsyncStorage } from 'react-native';
import { Button } from 'native-base';
import FormData from 'FormData';


class DosBotones extends React.Component {

    

    constructor(props){
        super(props);    
        this.state = {
            libro: this.props.libro,
            unidad: this.props.unidad,
            nivel: this.props.nivel,
            id1: this.props.id1,
            id2: this.props.id2,
            val1: this.props.val1,
            val2: this.props.val2,
            opcionSeleccionada: '-',
            idSeleccionado: '-'
        }
    }

    _selOpcion1 =() =>{
        this.setState({
            opcionSeleccionada: this.state.val1,
            idSeleccionado: this.state.id1
        });
    }
    _selOpcion2 =() =>{
        this.setState({
            opcionSeleccionada: this.state.val2,
            idSeleccionado: this.state.id2
        });
    }

    _guardar = () =>{
        

        let formData = new FormData();
        formData.append('libro', this.state.libro);
        formData.append('unidad', this.state.unidad);
        formData.append('nivel', this.state.nivel);
        formData.append('idControl', this.state.idSeleccionado);
        formData.append('valControl', this.state.valControl);

        return fetch('http://admin.yesynergy.com/index.php/mobile/guardarRespuesta', {
                method: 'POST',
                body: formData
            },)
            .then((response) => response.json())
            .then((responseJson) => {
                this._informar();
            })
            .catch((error) => {
                console.error(error);
            });
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