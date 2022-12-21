// import { Text, View, Dimensions} from 'react-native'
// import Svg, { Circle } from 'react-native-svg'
// import React from 'react'
// import Animated, { Value, interpolate, multiply } from 'react-native-reanimated'


// const AnimatedCircle = Animated.createAnimatedComponent(Circle)
// const { width } = Dimensions.get("window");
// const size = width - 32;
// const strokeWidth = 50;
// const radius = (size - strokeWidth) / 2;
// const circumference = radius * 2 * Math.PI;

// const CircularBar = (progress) => {
//     // const progress = Value
//     const α = interpolate(progress, {
//         inputRange: [0, 1],
//         outputRange: [0, Math.PI * 2]
//     });
//     const strokeDashoffset = multiply(α, radius);


//     return (
//         <View style={{ }}>
//             <Svg width={size} height={size}>
//                 <Circle
//                     stroke="rgba(255,255,255,0.3)"
//                     fill="none"
//                     cx={size / 2}
//                     cy={size / 2}
//                     r={radius}
//                     {...{strokeWidth}}
//                 />
//                 <AnimatedCircle
//                     stroke="#2162cc"
//                     fill="none"
//                     cx={size / 2}
//                     cy={size / 2}
//                     r={radius}
//                     strokeDasharray={`${circumference} ${circumference}`}
//                     {...{ strokeWidth,strokeDashoffset}}
//                 />
//             </Svg>
//         </View>
//     )
// }

// export default CircularBar

import React, { useEffect } from 'react';
import { SafeAreaView, View, TextInput } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
    useAnimatedProps,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const radius = 45;
const circumference = radius * Math.PI * 2;

const SvgCircle = () => {
    const strokeOffset = useSharedValue(circumference);

    const percentage = useDerivedValue(() => {
        const number =
            ((circumference - strokeOffset.value) / (circumference)) * 100;

        return withTiming(number, { duration: 2000 });
    });

    const animatedCircleProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: withTiming(strokeOffset.value, { duration: 2000 }),
        };
    });

    const animatedTextProps = useAnimatedProps(() => {
        return {
            text: `${Math.round(percentage.value)}%`,
        };
    });

    useEffect(() => {
        strokeOffset.value = 0;
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#17021A',
            }}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}>
                <AnimatedText
                    style={{ color: 'white', fontSize: 24, fontWeight: 'bold', position: 'absolute' }}
                    animatedProps={animatedTextProps}
                />
                <Svg height="50%" width="50%" viewBox="0 0 100 100">
                    <AnimatedCircle
                        animatedProps={animatedCircleProps}
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="rgb(246, 79, 89)"
                        strokeWidth="5"
                        fill="rgba(255,255,255,0.2)"
                        strokeDasharray={`${radius * Math.PI * 2}`}
                    />
                </Svg>
            </View>
        </SafeAreaView>
    );
};

export default SvgCircle;