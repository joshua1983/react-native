import React from 'react';
import { AppLoading, Font, Constants } from 'expo';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  ImageBackground
} from 'react-native';
import Imagenes from '../utils/Images';



export default class AuthLoadingScreen extends React.Component {
  state = {
    cargando: true
  }  

  constructor(props) {
    super(props);
      
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');

  };

  async componentWillMount(){
      try{
        await Font.loadAsync({
          'Roboto': require("native-base/Fonts/Roboto.ttf"),
          'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf"),
          'FontAwesome': require('react-native-vector-icons/FontAwesome'),
          'MaterialIcons':require('react-native-vector-icons/MaterialIcons')       
        }); 
      this.setState({ cargando: false });
      
    }catch(e){

    } 
    this._bootstrapAsync();
  }


  // Render any loading content that you like here
  render() {
    if (this.state.cargando) {
        return (
          <View style={styles.container}>
            <AppLoading />
          </View>
        );
    }
    return (
        <View style={{ backgroundColor: '#ffffff' }}>
          
            <ActivityIndicator />
            <StatusBar barStyle='default' />

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
    backgroundColor: '#f4f4f4',
  },
  viewButton: {
    flex:1,
    width: 290
  }
});
