import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import DosBotones  from './templates/DosBotones';
import TresBotones from './templates/TresBotones';
import CajaTexto from './templates/CajaTexto';

//const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class RenderHTML extends React.Component {


    constructor(props){
      super(props);
      this.state = {
        libro: this.props.Libro,
        unidad: this.props.unidad,
        nivel: this.props.nivel,
        html: this.props.html,
        tipo: this.props.tipo,
        id1: this.props.id1,
        id2: this.props.id2,
        id3: this.props.id3,
        val1: this.props.val1,
        val2: this.props.val2,
        val3: this.props.val3,
        lbl1: this.props.lbl1,
        lbl2: this.props.lbl2,
        lbl3: this.props.lbl3
      }
      this.botones = React.createRef();
    }

    _renderPagina = (pagina) => {
      this.botones._guardar();
      this.setState({
          html: pagina.html,
          tipo: pagina.tipo,
          id1: pagina.id1,
          id2: pagina.id2,
          id3: pagina.id3,
          val1: pagina.val1,
          val2: pagina.val2,
          val3: pagina.val3,
          lbl1: pagina.lbl1,
          lbl2: pagina.lbl2,
          lbl3: pagina.lbl3
        }, () => {
          this.updateHtml();
        });
    }

  
    updateHtml(){
      this.setState(this.state);
    }

    shouldComponentUpdate(nextProps){
      return nextProps.html !== this.state.html || nextProps.val3 !== this.state.val3;
    }
  
  
    render() {
 
  
      return (

        <ScrollView style={estilos.container}>
          <View>
            <HTML 
              html={this.state.html}
            /> 
          </View>
          <View style={estilos.viewBotones}>
              { this.state.tipo == 1 && 
              <DosBotones 
                  ref = { instancia => { this.botones = instancia }}
                  libro = {this.props.libro}
                  unidad = {this.props.unidad}
                  nivel = {this.props.nivel}
                  id1 = {this.state.id1}
                  id2 = {this.state.id2}
                  val1 = {this.state.val1}
                  val2 = {this.state.val2}
                  lbl1 = {this.state.lbl1}
                  lbl2 = {this.state.lbl2}
              />
              }
              { this.state.tipo == 2 && 
              <TresBotones 
                  ref = { instancia => { this.botones = instancia }}
                  id1 = {this.state.id1}
                  id2 = {this.state.id2}
                  id3 = {this.state.id3}
                  val1 = {this.state.val1}
                  val2 = {this.state.val2}
                  val3 = {this.state.val3}
                  lbl1 = {this.state.lbl1}
                  lbl2 = {this.state.lbl2}
                  lbl3 = {this.state.lbl3}
              />
              }
              { this.state.tipo == 3 && 
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
