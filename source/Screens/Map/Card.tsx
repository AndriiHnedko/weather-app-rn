import React, { memo, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CurrentWeatherType } from '../../Services/api';

type PropsType = {
  opacity: number;
  height: number;
  duration: number;
  weather: CurrentWeatherType;
};

const Card = memo<PropsType>((props) => {
  const opacity = useSharedValue(0);
  const height = useSharedValue(0);
  const width = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    width: width.value,
    opacity: opacity.value,
  }));

  const adaptiveWidth = (() => {
    const value =
      (props.weather.city_name.length + props.weather.country_code.length) * 10;
    if (value < 100) {
      return 100;
    }
    if (value > 140) {
      return 150;
    }
    return value + 10;
  })();

  const initAnimation = () => {
    opacity.value = withTiming(props.opacity, {
      duration: props.duration,
      easing: Easing.out(Easing.exp),
    });
    width.value = withTiming(adaptiveWidth, {
      duration: props.duration,
      easing: Easing.out(Easing.exp),
    });
    height.value = withTiming(props.height, {
      duration: props.duration,
      easing: Easing.out(Easing.exp),
    });
  };

  useEffect(initAnimation);

  const { temp, city_name, country_code, weather } = props.weather;
  return (
    <View>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {city_name}, {country_code}
        </Text>
        <View style={styles.downContainer}>
          <Text style={[styles.text, styles.temperature]}>
            {Math.floor(temp)}&deg;
          </Text>
          <Image
            source={{
              uri: `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`,
            }}
            style={styles.picture}
          />
        </View>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#01BAEF',
    elevation: 10,
    borderRadius: 2,
    padding: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  downContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  temperature: {
    fontSize: 29,
    marginRight: 5,
  },
  picture: { width: 40, height: 40 },
});

export default Card;
