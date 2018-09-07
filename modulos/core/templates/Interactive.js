import React from 'react';
import {
    View,
    StyleSheet,
    PanResponder,
    Animated,
    Text
} from 'react-native';

export default class Interactive extends React.Component{

    constructor(props){
        super(props);

        this.state ={
            dragRes1:true,
            dragRes2:true,
            dragRes3:true,
            dropZoneValues  : null,
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

                if (this.isDropZone(gesture)){
                    this.setState({
                        dragRes1: false
                    })
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

    isDropZone(gesture){     //Step 2
        var dz = this.state.dropZoneValues;
        return gesture.moveY > dz.y  - dz.height && gesture.moveY < dz.y + dz.height;
    }

    renderRes(){
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        }
        if (this.state.dragRes1){
            return(
                <Animated.View
                    { ...this.panResponder.panHandlers }
                    style={[panStyle, styles.rectangulo]}
                >
                    <Text>Respuesta 1</Text>
                </Animated.View>
            )
        }
    }

    setDropZoneValues(event){      //Step 1
        this.setState({
            dropZoneValues : event.nativeEvent.layout
        });
    }

    render(){
        
        return (
            <View>
                <View 
                    onLayout={this.setDropZoneValues.bind(this)} 
                    style={styles.dropZone}>
                    <Text>Colocar la respuesta aqui</Text>
                </View>
                
                <View style={styles.row}>
                    {this.renderRes()}
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({

    mainContainer:{
        flex:1
    },
    dropZone:{
        height: 150,
        width:400,
        backgroundColor: "#00334d"
    },
    row:{
        flexDirection: "row"
    },
    rectangulo:{
        backgroundColor: "skyblue",
        width: 80,
        height: 30,
        borderRadius: 5,
        justifyContent: "center"
    }
})