import React from 'react';
import { AppRegistry } from 'react-native';
import LoginPage from './modulos/auth/LoginPage';
import HomeUser from './modulos/home/HomeUser';
import NivelUser from './modulos/home/NivelUser';
import UnidadUser from './modulos/home/UnidadUser';
import PaginaUser from './modulos/home/PaginaUser';
import Interactive from './modulos/core/templates/Interactive';
import AuthLoadingScreen from './modulos/auth/AuthLoadingScreen';



import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

const AppStack = createStackNavigator({ 
  Home: HomeUser, 
  Nivel: NivelUser,
  Unidad: UnidadUser,
  Pagina: PaginaUser,
  Interactive: Interactive
});

const AuthStack = createStackNavigator({ 
  Login: LoginPage 
});

AppRegistry.registerComponent('AppStack', () => AppStack);
AppRegistry.registerComponent('AuthStack', () => AuthStack);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
