import React from 'react';
import {
    StyleSheet,
    PanResponder,
    Animated
} from 'react-native';


export default class Arrastrar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showDraggable: true,
            dropAreaValues: null,
            pan: new Animated.ValueXY(),
            opacity: new Animated.Value(1)
        }
        
    }

    componentWillMount(){
        // agregar escuchador para el valor delta en cambio de ubicacion
        this._val ={x:0,y:0};
        this.state.pan.addListener( (value) => this._val = value );

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: Animated.event([
                null, {
                    dx: this.state.pan.x, 
                    dy: this.state.pan.y
                }
            ]),
            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setValue({x: 0, y: 0});
            },
            onPanResponderRelease:(e, gesture) => {

                if (this.isDropArea(gesture)){
                    Animated.timing(this.state.opacity,{
                        toValue: 0,
                        duration: 1000
                    }).start( () => {
                        this.setState({
                            showDraggable: false
                        })
                    });
                }else{
                    Animated.spring(this.state.pan,{
                        toValue: {x:0, y:0},
                        friction: 5
                    }).start();
                }

                Animated.spring(this.state.pan, {
                    toValue: {x:0, y:0},
                    friction: 5
                }).start();
            }
            
        });
    }
    isDropArea(gesture){
        return gesture.moveY  < 200;
    }

    render (){
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        }
        return (
            <Animated.View
                { ...this.panResponder.panHandlers }
                style={[panStyle, styles.circle]}
            />
        )
    }
}

let RADIO_CIRCULO = 30;
let styles = StyleSheet.create({
    circle:{
        backgroundColor: "skyblue",
        width: RADIO_CIRCULO * 2,
        height: RADIO_CIRCULO * 2,
        borderRadius: RADIO_CIRCULO 
    }
})