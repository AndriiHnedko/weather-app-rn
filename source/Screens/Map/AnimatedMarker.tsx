import React, { memo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type PropsType = {
  opacity: number;
  translateY: number;
  duration: number;
};

const AnimatedMarker = memo<PropsType>((props) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const initAnimation = () => {
    translateY.value = withTiming(props.translateY, {
      duration: props.duration,
      easing: Easing.out(Easing.exp),
    });
    opacity.value = withTiming(props.opacity, {
      duration: props.duration,
      easing: Easing.out(Easing.exp),
    });
  };

  useEffect(initAnimation);

  return (
    <Animated.View style={[styles.marker, animatedStyle]}>
      <Icon name={'map-marker-alt'} size={30} color={'#C5283D'} />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  marker: {
    marginTop: 6,
  },
});

export default AnimatedMarker;
