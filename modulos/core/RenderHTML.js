import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { Button, Grid, Col, Row, Content, CardItem, Card, Body } from 'native-base';
import  DosBotones  from './templates/DosBotones';

//const deviceHeight = Dimensions.get('window').height;
//const deviceWidth = Dimensions.get('window').width;

export default class RenderHTML extends React.Component {


    constructor(props){
      super(props);
      this.state = {
        html: this.props.html,
        tipo: this.props.tipo
      }
      this.dosBotones = React.createRef();
    }


    _siguiente = () => {
      
      this.dosBotones._guardar();
    }
  
  
    render() {
 
  
      return (
        <ScrollView style={estilos.container}>
          <HTML 
            html={this.state.html}
          /> 

            <Grid>
              <Col>
              { this.state.tipo == 1 && 
              <DosBotones style={estilos.botones}
                ref = { instancia => { this.dosBotones = instancia }}
              />
              }
              </Col>
            </Grid>
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
    },
    botones:{
      flex: 1
    }
  });
