import React from 'react';
import { Container, Content, Button, Text, Label, Form, Item, Input, Grid, Col, Row } from 'native-base';

export default class Home extends React.Component {

    render(){
        return (

            <Grid>
                <Row>
                    <Col></Col>
                    <Col><Text>Bienvenido</Text></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col><Text>Bienvenido</Text></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col><Text>Bienvenido</Text></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col><Text>Bienvenido</Text></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <Button
                            onPress={this.props.onLogoutPress}
                            title="Salir"
                        >
                            <Text> Salir </Text>
                        </Button>
                    </Col>
                    <Col></Col>
                    
                </Row>
            </Grid>
        )
    }
}