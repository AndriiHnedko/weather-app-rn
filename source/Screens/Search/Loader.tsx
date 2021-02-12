import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type PropsType = {
  loading: boolean;
};

const Loader: React.FC<PropsType> = ({ loading }) => {
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const initAnimation = (toOpacity: number, duration: number) => {
    opacity.value = withTiming(toOpacity, {
      duration: duration,
      easing: Easing.out(Easing.exp),
    });
  };
  useEffect(() => {
    loading ? initAnimation(1, 1000) : initAnimation(0, 500);
  }, [loading]);
  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <ActivityIndicator size="small" color="#fff" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    transform: [{ scale: 2.7 }],
    left: 2,
    top: 5,
  },
});

export default Loader;
