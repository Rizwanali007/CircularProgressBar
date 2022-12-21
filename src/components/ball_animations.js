import { View, Text, Animated, TouchableOpacity, PanResponder } from 'react-native'
import React, { useState } from 'react'

const BallAnimations = () => {
    // const value = useState(new Animated.Value(0))[0]
    // const opacity = useState(new Animated.Value(0))[0]
    const pan = useState(new Animated.ValueXY())[0]

    const panResponder = useState(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                console.log("ACCESS GRANTED FROM PAN RESPONDER")
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                })
            },
            // onPanResponderMove: Animated.event([null, {
            //   dx: pan.x, dy: pan.y
            // }]),
            // onPanResponderMove: (...args) => {
            // console.log("ARG", {...args[1]} )
            // },
            onPanResponderMove: (_, gesture) => {
                pan.x.setValue(gesture.dx)
                pan.y.setValue(gesture.dy)
            },
            onPanResponderRelease: () => {
                pan.flattenOffset()
            }
        })
    )[0]

    console.log(pan.getLayout())

    // const moveBall = () => {
    //   Animated.timing(value, {
    //     toValue: 1,
    //     duration: 4000,
    //     useNativeDriver: false
    //   }).start()
    // }
    // const fadeIn = () => {
    //   Animated.timing(opacity, {
    //     toValue: 1,
    //     duration: 1000,
    //     useNativeDriver: true
    //   }).start()
    // }
    // const fadeOut = () => {
    //   Animated.timing(opacity, {
    //     toValue: 0,
    //     duration: 1000,
    //     useNativeDriver: true
    //   }).start()
    // }

    return (
        <View style={{ flex: 1, alignItems: "center", }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
                {/* <Animated.View style={[
          {
            width: 150,
            height: 150,
            // opacity: value,
            // opacity,
            // top: pan.y,
            // left: pan.x,
            transform: [{
              translateX: pan.x
            },
            {
              translateY: pan.y
            }
            ],
            borderRadius: 150 / 2,
            backgroundColor: "green"
          },
          // pan.getLayout()
        ]}
          {...panResponder.panHandlers}
        /> */}
                <Animated.View style={[
                    {
                        width: 175,
                        height: 175,
                        // opacity: value,
                        // opacity,
                        // top: pan.y,
                        // left: pan.x,
                        transform: [{
                            translateX: pan.x
                        },
                        {
                            translateY: pan.y
                        }
                        ],
                        borderRadius: 175 / 2,
                        backgroundColor: "yellow"
                    },
                    // pan.getLayout()
                ]}

                    {...panResponder.panHandlers}
                />
                {/* <TouchableOpacity onPress={() => moveBall()}>
          <Text>Click here!</Text>
        </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={() => fadeIn()}>
          <Text>Fade In!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fadeOut()}>
          <Text>Fade Out!</Text>
        </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default BallAnimations;