import React, { useEffect } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from './Loader';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { StoreType } from '../../Redux';

type PropsType = {
  onPress: () => void;
  active: boolean;
  style?: StyleProp<ViewStyle>;
};

const SearchButton: React.FC<PropsType> = ({ onPress, active, style }) => {
  const loading = useSelector((s: StoreType) => s.weather.loading);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.6);
  const translateX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scale: scale.value }],
    opacity: opacity.value,
    zIndex: 20,
  }));
  const initAnimate = (scl: number, opct: number, trnX: number) => {
    scale.value = withTiming(scl, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    opacity.value = withTiming(opct, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    translateX.value = withTiming(trnX, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  };
  useEffect(() => {
    loading ? initAnimate(0, 0, 0) : initAnimate(1, active ? 1 : 0.6, 0);
  }, [loading, active]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.button}
        activeOpacity={1}>
        <Animated.View style={animatedStyle}>
          <Icon name="search" size={30} color={'#fff'} />
        </Animated.View>
      </TouchableOpacity>
      <Loader loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative', height: 28, width: 30 },
  button: { zIndex: 20 },
});
export default SearchButton;
