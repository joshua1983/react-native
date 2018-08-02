import React from 'react';
import { Provider } from 'react-redux';
import { AppLoading, Font } from 'expo';


import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cargando: true
    }
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  async componentWillMount() {
    
    try {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        FontAwesome: require('react-native-vector-icons/FontAwesome'),
        MaterialIcons:require('react-native-vector-icons/MaterialIcons')       
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log('error loading icon fonts', error);
    }
    
  }

  // Render any loading content that you like here
  render() {
    if (this.state.cargando) {
        return <AppLoading />;
    }
    return (
    <Provider store={store}>
        <View style={{ backgroundColor: '#ffffff' }}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    </Provider>
    );
  }
}