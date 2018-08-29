import React from 'react';
import { AppLoading, Font, Constants } from 'expo';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Image,
  StyleSheet
} from 'react-native';
import { Button } from 'native-base';


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cargando: true
    }    
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    setTimeout(this._continuar(),6000);
    
  };


  _cargarFuentes = async () =>{
        try{
        await Font.loadAsync({
          'Roboto': require("native-base/Fonts/Roboto.ttf"),
          'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf"),
          'FontAwesome': require('react-native-vector-icons/FontAwesome'),
          'MaterialIcons':require('react-native-vector-icons/MaterialIcons')       
        }); 
        this._bootstrapAsync();
      }catch(e){

      }  

  }

  _continuar = async ()=>{
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    
    this.setState({ cargando: false });
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    
  }


  componentDidMount(){
    this._cargarFuentes();
  }



  // Render any loading content that you like here
  render() {
    if (this.state.cargando) {
        return (
          <View style={styles.container}>
            <Image source={{uri: 'http://admin.yesynergy.com/img/intro.gif'}} style={{width: 300, height: 300}} />
          </View>
        );
    }
    return (
        <View style={{ backgroundColor: '#ffffff' }}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
});
