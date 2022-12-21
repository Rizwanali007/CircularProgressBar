import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'
import Animated, {
    useAnimatedProps, useDerivedValue,
    interpolate, useSharedValue,
    withTiming, runOnJS
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'
import { ReText } from 'react-native-redash'

const BACKGROUND_COLOR = '#444B6F';
// const BACKGROUND_COLOR = 'skyblue'
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#A6E1FA"
const TEMP_STROKE_COLOR = "green"
const TEMP_BACKGROUND_STROKE_COLOR = "skyblue"

const { height, width } = Dimensions.get('window');
const CIRCLE_LENGTH = 800;
const R = CIRCLE_LENGTH / (2 * Math.PI);


const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const AnimatedProgressBar = () => {

    const progress = useSharedValue(0)
    const [opacity, setOpacity] = useState()
    const [text, setText] = useState()
    const opacityRef = useRef(0)

    // console.log("progress.value", progress.value)


    // useEffect(() => {
    //     progress.value = withTiming(1, { duration: 2000 })
    // }, [])

    const animatedProps = useAnimatedProps(() => ({
        // strokeDashoffset: ((CIRCLE_LENGTH/3.90) * (1-progress.value))
        strokeDashoffset: (CIRCLE_LENGTH) * (1 - progress.value)

    }))

    // const progressText = useDerivedValue(() => {
    //     'worklet';
    //     let value = `${Math.floor(progress.value * 100)}`
    //     let temp = parseFloat(value)
    //     let opacity = temp*0.01
    //     // console.log("opacity",opacity)
    //     // opacityRef.current = opacity
    //     // opacityRef.current = opacity.toFixed(2)
    //     // setOpacity(opacity)
    //     return value

    // })

    const progressTextOpacity = () => {
        let value = `${Math.floor(progress.value * 100)}`
        setText(value)
        let temp = parseFloat(value)
        let opacity = temp * 0.01
        // console.log("CHCK",opacity)
        setOpacity(opacity)
    }

    useDerivedValue(() => {
        runOnJS(progressTextOpacity)(progress.value)
    })

    const onPress = () => {
        progress.value = withTiming(1, { duration: 3000 })
        // progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 3000 })
        // console.log("progressText.value",progress.value)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.progressText}>{text}</Text>
            {/* <ReText style={styles.progressText} text={progressText} /> */}
            <Svg style={{ position: 'absolute' }}>
                <Circle
                    cx={width / 2}
                    cy={height / 2}
                    r={R}
                    stroke={TEMP_BACKGROUND_STROKE_COLOR}
                    strokeWidth={30}

                // opacity={opacityText}
                // ref= {opacityRef}
                />
                <AnimatedCircle
                    cx={width / 2}
                    cy={height / 2}
                    r={R}
                    stroke={TEMP_STROKE_COLOR}
                    strokeWidth={30}
                    opacity={opacity}
                    strokeDasharray={CIRCLE_LENGTH}
                    animatedProps={animatedProps}
                    transform={`rotate(-90 ${width / 2} ${height / 2})`}
                    // strokeDashoffset={CIRCLE_LENGTH * 0.5}
                    strokeLinecap={'round'}
                // strokeOpacity={}

                />
            </Svg>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onPress()}
            >
                <Text style={styles.buttonText}>Run</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AnimatedProgressBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: BACKGROUND_COLOR,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: -90
    },
    progressText: {
        fontSize: 80,       // color: "rgba(256,256,256,0.7)",
        color: BACKGROUND_STROKE_COLOR,
        width: 200,
        textAlign: "center"
    },
    button: {
        position: "absolute",
        bottom: 80,
        width: width * 0.7,
        height: 60,
        backgroundColor: BACKGROUND_STROKE_COLOR,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 25,
        color: "white",
        letterSpacing: 1.0,
    }
})

// import CircularProgress from 'react-native-circular-progress-indicator';
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'

// const BACKGROUND_STROKE_COLOR = "#303858";
// const { height, width } = Dimensions.get('window');

// const ProgressBar = () => {

//     // const progress = useSharedValue(0)
//     const [value, setValue] = useState(0)


//     const onPress = () => {
//         if (value == 0) {
//             setValue(100)
//         }

//         else {
//             setValue(0)
//         }
//         // setValue(value === 0 ? 100 : 0)
//         // progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 3000 })
//     }
//     console.log("VALUE", value * 0.01)
//     return (
//         <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//             <CircularProgress
//                 radius={90}
//                 value={value}
//                 textColor="#222"
//                 fontSize={10}
//                 // valueSuffix={"%"}
//                 inActiveStrokeColor={"#2ecc71"}
//                 inActiveStrokeOpacity={value * 0.1}
//                 inActiveStrokeWidth={6}
//                 duration={3000}

//             />
//             <TouchableOpacity
//                 style={styles.button}
//                 onPress={
//                     () => {
//                         onPress()
//                         // setValue(0)
//                     }
//                 }
//             >
//                 <Text style={styles.buttonText}>Run</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default ProgressBar

// const styles = StyleSheet.create({
//     button: {
//         position: "absolute",
//         bottom: 80,
//         width: width * 0.7,
//         height: 60,
//         backgroundColor: BACKGROUND_STROKE_COLOR,
//         borderRadius: 25,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     buttonText: {
//         fontSize: 25,
//         color: "white",
//         letterSpacing: 1.0,
//     }
// })