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

    _selOpcion1(){
        this.setState({
            opcionSeleccionada: this.state.opcion1valor
        });
    }
    _selOpcion2(){
        this.setState({
            opcionSeleccionada: this.state.opcion2valor
        });
    }

    _guardar(){
        this._informar();
    }

    _informar(){
        if (Platform.OS == 'android'){
            ToastAndroid.show('Datos guardados!', ToastAndroid.SHORT);
        }else{
            Alert.alert(
                'Plataforma',
                'Datos guardados',
                [
                  {text: 'Ok'}
                ],
                { cancelable: false }
              )
        }

    }

    render() {
      return (

            <View>
                <Grid>
                    <Col>
                <Button info>
                    <Text style={esDosBotones.textButton}> {this.state.opcion1text}</Text>
                </Button>
                    </Col>
                    <Col>
                <Button warning>
                    <Text style={esDosBotones.textButton}> {this.state.opcion2text}</Text>
                </Button>
                    </Col>
                </Grid>
           </View>
        
         
      );
    }
  }

  const esDosBotones = StyleSheet.create({
    container: {
      padding: 5
    },
    textButton: {
      padding: 20
    }
  });


  export default DosBotones;