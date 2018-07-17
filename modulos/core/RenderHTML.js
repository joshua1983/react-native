import React from 'react';
import { StyleSheet, Text, View, ScrollView, WebView } from 'react-native';


export default class RenderHTML extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        cargando: true
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
        <WebView source={{html: this.state.html}} />
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
