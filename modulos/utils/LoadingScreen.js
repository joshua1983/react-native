import React from 'react';
import {
    View,
    Image,
    StyleSheet
  } from 'react-native';

export default class LoadingScreen extends React.Component {


    render() {
        return (
            <View style={styles.container}>
              <Image source={{uri: 'http://admin.yesynergy.com/img/intro.gif'}} style={{width: 300, height: 300}} />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f4f4f4',
    }
  });
  