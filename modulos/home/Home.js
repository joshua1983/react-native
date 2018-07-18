import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Button, Text,  Grid, Col, Row } from 'native-base';
import EncabezadoHome  from '../utils/EncabezadoHome';
import Imagenes from '../utils/Images';

const estilos = StyleSheet.create({
    imagen: {
        height: 100,
        width: 100
    }
});

export default class Home extends React.Component {

    render(){
        return (
            <Container>
                <EncabezadoHome />
                <Grid style={{padding: 10}}>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Image
                                style={estilos.imagen}
                                source={Imagenes.bookImg}
                            />
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Image
                                style={estilos.imagen}
                                source={Imagenes.testImg}
                            />
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Image
                                style={estilos.imagen}
                                source={Imagenes.extraFlat}
                            />
                        </Col>
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
            </Container>
        )
    }
}

