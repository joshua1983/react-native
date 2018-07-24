
import React from 'react';
import { AppLoading, Font } from 'expo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class AppFontLoader extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentWillMount() {

    try {
      await Font.loadAsync({
        FontAwesome,
        MaterialIcons,
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
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
    return this.props.children;
  }
}

export default AppFontLoader;