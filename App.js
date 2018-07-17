import React from 'react';
import LoginPage from './modulos/auth/LoginPage';
import Home from './modulos/home/Home';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      autenticado: false
    }
  }



  render() {
    
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


