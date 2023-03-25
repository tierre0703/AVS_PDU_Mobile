import React, {useEffect, useState} from 'react';
import {
    Animated,
    Easing,
    View
} from 'react-native';


export const OnlineStatus = ({
    status = true,
    onlineColors = ['green', 'transparent'],
    offlineColor = 'red',
    size=24,
    borderRadius=12,
    children
}) => {
    const colorAnimation = new Animated.Value(0);

    const [blinkAnim] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    /* useEffect(()=>{
            const animation = Animated.loop(
                Animated.sequence([
                  Animated.timing(colorAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true // add this line
                  }),
                  Animated.timing(colorAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true // add this line
                  }),
                ])
              );
          
              animation.start();
    
        return () => {
           //animation.stop();
        };
    }, []); */

    /* const backgroundColor = colorAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: onlineColors
    });
 */
    return (
        <>
        <Animated.View style={{
            backgroundColor: status ? 'green' : 'red',
            opacity: status ? blinkAnim : 1,
            //backgroundColor,
            width: size,
            height: size,
            borderRadius: borderRadius,
        }}>
            {children}
        </Animated.View>
            
        </>
    );
}