import React, {useEffect} from 'react';
import {
    Animated,
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

    useEffect(()=>{
            const animation = Animated.loop(
                Animated.sequence([
                  Animated.timing(colorAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false // add this line
                  }),
                  Animated.timing(colorAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false // add this line
                  }),
                ])
              );
          
              animation.start();
    
        return () => {
           //animation.stop();
        };
    }, []);

    const backgroundColor = colorAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: onlineColors
    });

    return (
        <>
        <Animated.View style={{
            backgroundColor,
            width: size,
            height: size,
            borderRadius: borderRadius,
        }}>
            {children}
        </Animated.View>
            
        </>
    );
}