import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { Button, Grid, Col, Row, Content, CardItem, Card, Body } from 'native-base';
import  DosBotones  from './templates/DosBotones';

//const deviceHeight = Dimensions.get('window').height;
//const deviceWidth = Dimensions.get('window').width;

export default class RenderHTML extends React.Component {

    state = {}  
    

    constructor(props){
      super(props);
      this.state = {
        cargando: true,
        libro: props.Libro,
        nivel: props.Nivel,
        unidad: props.Unidad,
        pagina: props.Pagina

      }
      this.dosBotones = React.createRef();
    }
  
    componentDidMount(){
      return fetch('http://admin.yesynergy.com/index.php/mobile/getPagina/1/1')
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            cargando: false,
            html: responseJson[0].html,
            tipo: responseJson[0].tipo
          }, function(){
  
          });
  
        })
        .catch((error) =>{
          console.error(error);
        });
    }

    _siguiente = () => {
      this.dosBotones._guardar();
    }
  
  
    render() {
      if (this.state.cargando == true){
        return (
          <View>
            <Text>Cargando...</Text>
          </View>
        );
      }
  
  
      return (
        <ScrollView style={estilos.container}>
          <HTML 
            html={this.state.html}
            /> 

          <Content>
            <Card>
              <CardItem>
                <Body>
                  { this.state.tipo == "1" && 
                  <DosBotones 
                    ref = { instancia => { this.dosBotones = instancia }}
                  />
                  }
                </Body>
                </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Body>
                  <Button iconRight rounded success onPress={this._siguiente} > 
                    <Text style={estilos.textButton} >Siguiente </Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          </Content>

        </ScrollView>
         
      );
    }
  }
  
  const estilos = StyleSheet.create({
    container: {
      padding: 5
    },
    textButton: {
      padding: 10
    }
  });
