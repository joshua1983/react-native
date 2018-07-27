import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { Button, Grid, Col, Row, Content, CardItem, Card, Body } from 'native-base';
import DosBotones  from './templates/DosBotones';
import TresBotones from './templates/TresBotones';
import CajaTexto from './templates/CajaTexto';

//const deviceHeight = Dimensions.get('window').height;
//const deviceWidth = Dimensions.get('window').width;

export default class RenderHTML extends React.Component {


    constructor(props){
      super(props);
      this.state = {
        html: this.props.html,
        tipo: this.props.tipo
      }
      this.botones = React.createRef();
    }


    _siguiente = () => {
      
      this.botones._guardar();
      this.setState({
        html: '',
        tipo: 0
      });
    }
    _anterior = () => {
      
      this.botones._guardar();
    }

    componentDidUpdate(prevProps) {
      if(this.props.html !== prevProps.html) {
        this.updateHtml();
      }
    } 
  
    updateHtml(){
      this.setState(this.state);
    }

    shouldComponentUpdate(nextProps){
      return nextProps.html !== this.state.html;
    }
  
  
    render() {
 
  
      return (
        <ScrollView style={estilos.container}>
          <HTML 
            html={this.props.html}
          /> 

              { this.props.tipo == 1 && 
              <DosBotones 
                          ref = { instancia => { this.botones = instancia }}
              />
              }
              { this.props.tipo == 2 && 
              <TresBotones 
                          ref = { instancia => { this.botones = instancia }}
              />
              }
              { this.props.tipo == 3 && 
              <CajaTexto 
                          ref = { instancia => { this.botones = instancia }}
              />
              }
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
      flex: 1,
      backgroundColor: 'black'
    }
  });
