import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Header, Body, Title, Grid, Col } from 'native-base';




export default class EncabezadoHome extends Component {


    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <Header style={styles.FondoHeader}
                androidStatusBarColor="#902290"
            >
                
                <Body style={styles.Body}>
                    <Grid>
                        <Col></Col>
                        <Col><Title> {this.props.nombre} </Title></Col>
                        <Col></Col>
                    </Grid>
                </Body>
                
            </Header>
        )
    }
}
const styles = StyleSheet.create({
    Body:{
        paddingTop: 20
    },
    FondoHeader:{
        backgroundColor: '#902290'
        
    }
})