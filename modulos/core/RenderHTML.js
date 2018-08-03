import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { Button, Grid, Col, Row, Content, CardItem, Card, Body } from 'native-base';
import DosBotones  from './templates/DosBotones';
import TresBotones from './templates/TresBotones';
import CajaTexto from './templates/CajaTexto';

//const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class RenderHTML extends React.Component {


    constructor(props){
      super(props);
      this.state = {
        html: this.props.html,
        tipo: this.props.tipo,
        id1: this.props.id1,
        id2: this.props.id2,
        id3: this.props.id3,
        val1: this.props.val1,
        val2: this.props.val2,
        val3: this.props.val3
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
          <View>
            <HTML 
              html={this.props.html}
            /> 
          </View>
          <View style={estilos.viewBotones}>
              { this.props.tipo == 1 && 
              <DosBotones 
                  ref = { instancia => { this.botones = instancia }}
                  id1 = {this.state.id1}
                  id2 = {this.state.id2}
                  val1 = {this.state.val1}
                  val2 = {this.state.val2}
              />
              }
              { this.props.tipo == 2 && 
              <TresBotones 
                  ref = { instancia => { this.botones = instancia }}
                  id1 = {this.state.id1}
                  id2 = {this.state.id2}
                  id3 = {this.state.id3}
                  val1 = {this.state.val1}
                  val2 = {this.state.val2}
                  val3 = {this.state.val3}
              />
              }
              { this.props.tipo == 3 && 
              <CajaTexto 
                  ref = { instancia => { this.botones = instancia }}
              />
              }
            </View>
        </ScrollView>
      );
    }
  }
  
  const estilos = StyleSheet.create({
    container: {
      padding: 5,
      flex:1,
      width: deviceWidth -40
    },
    textButton: {
      padding: 10
    },
    viewBotones:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    botones:{
      flex: 1,
      backgroundColor: 'black'
    }
  });
