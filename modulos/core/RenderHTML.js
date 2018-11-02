import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import DosBotones  from './templates/DosBotones';
import TresBotones from './templates/TresBotones';
import CajaTexto from './templates/CajaTexto';
import CajasMultiples from './templates/CajasMultiples';

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
          id4: pagina.id4,
          id5: pagina.id5,
          id6: pagina.id6,
          id7: pagina.id7,
          id8: pagina.id8,
          val1: pagina.val1,
          val2: pagina.val2,
          val3: pagina.val3,
          val4: pagina.val4,
          val5: pagina.val5,
          val6: pagina.val6,
          val7: pagina.val7,
          val8: pagina.val8,
          lbl1: pagina.lbl1,
          lbl2: pagina.lbl2,
          lbl3: pagina.lbl3,
          lbl4: pagina.lbl4,
          lbl5: pagina.lbl5,
          lbl6: pagina.lbl6,
          lbl7: pagina.lbl7,
          lbl8: pagina.lbl8
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
              { this.state.tipo == 4 &&
              <CajasMultiples
              ref = { instancia => { this.botones = instancia }}
              id1 = {this.state.id1}
              id2 = {this.state.id2}
              id3 = {this.state.id3}
              id4 = {this.state.id4}
              id5 = {this.state.id5}
              id6 = {this.state.id6}
              id7 = {this.state.id7}
              id8 = {this.state.id8}
              val1 = {this.state.val1}
              val2 = {this.state.val2}
              val3 = {this.state.val3}
              val4 = {this.state.val4}
              val5 = {this.state.val5}
              val6 = {this.state.val6}
              val7 = {this.state.val7}
              val8 = {this.state.val8}
              lbl1 = {this.state.lbl1}
              lbl2 = {this.state.lbl2}
              lbl3 = {this.state.lbl3}
              lbl4 = {this.state.lbl4}
              lbl5 = {this.state.lbl5}
              lbl6 = {this.state.lbl6}
              lbl7 = {this.state.lbl7}
              lbl8 = {this.state.lbl8}
              
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
