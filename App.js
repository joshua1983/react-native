import React from 'react';
import LoginPage from './modulos/auth/LoginPage';
import Home from './modulos/home/Home';
import { AppLoading, Font } from 'expo';
import FontAwesome  
  from './node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
import MaterialIcons  
  from './node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
import Roboto from 'native-base/Fonts/Roboto.ttf';
import Roboto_medium from 'native-base/Fonts/Roboto_medium.ttf';


export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      autenticado: false,
      fontLoaded:false
    }
  }

  async componentWillMount() {
    try {
      await Font.loadAsync({
        Roboto,
        Roboto_medium,
        FontAwesome,
        MaterialIcons        
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log('error loading icon fonts', error);
    }
  }



  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    
    if (this.state.autenticado){
      return (
        <Home 
          onLogoutPress={() => this.setState({autenticado: false})}
        />
      );
    }else{
      return (
        <LoginPage 
          onLoginPress={() => this.setState({autenticado: true})}
        />
      );
    }

    
  }
}


