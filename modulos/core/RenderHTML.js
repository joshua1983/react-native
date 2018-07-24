import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

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
    }
  
    componentDidMount(){
      return fetch('http://desarrollo.yesynergy.com/admin/index.php/mobile/getPagina/1/1')
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            cargando: false,
            html: responseJson.Pagina.html,
          }, function(){
  
          });
  
        })
        .catch((error) =>{
          console.error(error);
        });
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
        <ScrollView>
          <HTML 
            html={this.state.html}
            /> 
        </ScrollView>
         
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: deviceWidth,
      height: deviceHeight
    },
  });
