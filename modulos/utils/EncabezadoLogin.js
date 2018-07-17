import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Header, Body, Left, Right, Title, Grid, Col } from 'native-base';




export default class EncabezadoLogin extends Component {

    state = {
        titulo: ''
    }

    constructor(props){
        super(props);
        this.state = {
            titulo : props.titulo
        }
    }

    render(){
        return(
            <Header>
                
                <Body style={styles.Body}>
                    <Grid>
                        <Col></Col>
                        <Col><Title> {this.state.titulo} </Title></Col>
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
    }
})