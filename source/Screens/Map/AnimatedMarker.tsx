import React, { memo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Icon from '../../Services/customFont/icomoon';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type PropsType = {
  translateY: number;
  duration: number;
};

const AnimatedMarker = memo<PropsType>((props) => {
  const translateY = useSharedValue(-20);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const initAnimation = () => {
    translateY.value = withTiming(props.translateY, {
      duration: props.duration,
      easing: Easing.out(Easing.exp),
    });
  };

  useEffect(initAnimation);

  return (
    <Animated.View style={[styles.marker, animatedStyle]}>
      <Icon name={'map-marker'} size={30} color={'#C5283D'} />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  marker: {
    marginTop: 6,
  },
});

export default AnimatedMarker;
