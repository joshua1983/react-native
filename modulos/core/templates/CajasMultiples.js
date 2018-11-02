import React from 'react';
import { StyleSheet, TextInput, View, ScrollView, Dimensions,  Platform, ToastAndroid } from 'react-native';
import { Content, Form} from 'native-base';
import  TextoInput  from './TextoInput';

class CajasMultiples extends React.Component {

    state = {
        texto: ''
    }

    constructor(props){
      super(props);    
      this._actualizaTexto = this._actualizaTexto.bind(this);

      this.state = {
        libro: this.props.libro,
        unidad: this.props.unidad,
        nivel: this.props.nivel,
        id1: this.props.id1,
        id2: this.props.id2,
        id3: this.props.id3,
        id4: this.props.id4,
        id5: this.props.id5,
        id6: this.props.id6,
        id7: this.props.id7,
        id8: this.props.id8,
        val1: this.props.val1,
        val2: this.props.val2,
        val3: this.props.val3,
        val4: this.props.val4,
        val5: this.props.val5,
        val6: this.props.val6,
        val7: this.props.val7,
        val8: this.props.val8,
        lbl1: this.props.lbl1,
        lbl2: this.props.lbl2,
        lbl3: this.props.lbl3,
        lbl4: this.props.lbl4,
        lbl5: this.props.lbl5,
        lbl6: this.props.lbl6,
        lbl7: this.props.lbl7,
        lbl8: this.props.lbl8
      }
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
                    {(this.state.id1.trim() != '' ) &&
                        <TextoInput
                        id ={this.state.id1}
                        lbl="1"
                        val=""
                        />
                    }
                    {(this.state.id2.trim() != '' ) &&
                        <TextoInput
                        id ={this.state.id2}
                        lbl="2"
                        val=""
                        />
                    }
                    {(this.state.id3.trim() != '') &&
                        <TextoInput
                        id ={this.state.id3}
                        lbl="3"
                        val=""
                        />
                    }
                    {(this.state.id4.trim() != '') &&
                        <TextoInput
                        id ={this.state.id4}
                        lbl="4"
                        val=""
                        />
                    }
                    {(this.state.id5.trim() != '') &&
                        <TextoInput
                        id ={this.state.id5}
                        lbl="5"
                        val=""
                        />
                    }
                    {(this.state.id6.trim() != '') &&
                        <TextoInput
                        id ={this.state.id6}
                        lbl="6"
                        val=""
                        />
                    }
                    {(this.state.id7.trim() != '') &&
                        <TextoInput
                        id ={this.state.id7}
                        lbl="7"
                        val=""
                        />
                    }
                    {(this.state.id8.trim() != '') &&
                        <TextoInput
                        id ={this.state.id8}
                        lbl="8"
                        val=""
                        />
                    }
                    
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
      justifyContent: 'space-between',
      backgroundColor: '#ffffff'
    },
    textButton: {
      padding: 20
    }
  });


  export default CajasMultiples;