import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { StoreType } from '../../Redux';

const Loader = () => {
  const loading = useSelector((s: StoreType) => s.weather.loading);
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const initAnimation = (toOpacity: number) => {
    opacity.value = withTiming(toOpacity, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
  };
  useEffect(() => {
    loading ? initAnimation(1) : initAnimation(0);
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
    right: 60,
    bottom: 14,
    transform: [{ scale: 1.3 }],
  },
});

export default Loader;
