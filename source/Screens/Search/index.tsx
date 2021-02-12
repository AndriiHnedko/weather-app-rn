import React, { memo, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import SearchInput from './SearchInput';
import BottomTabBar from '../../Navigation/BottomTabBar/index';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../Redux';
import WeatherField from './WeatherField';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { resetWeek } from '../../Redux/weather/actions';
import { useRoute } from '@react-navigation/native';

const Search = memo(() => {
  const dispatch = useDispatch();

  const windowWidth = Dimensions.get('window').width;
  const route = useRoute();
  const weatherData = useSelector((s: StoreType) => s.weather.weekWeather);
  const translateX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const repeatPressHandler = () => {
    translateX.value = withTiming(windowWidth, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
    setTimeout(() => {
      dispatch(resetWeek());
      translateX.value = 0;
    }, 600);
  };

  const _renderWeather = () => {
    let counter = 0;
    if (weatherData && weatherData.data) {
      return weatherData.data.map((el, id) => {
        counter += 100;
        return (
          <WeatherField
            temperature={el.temp}
            picture={el.weather.icon}
            date={el.valid_date}
            delay={counter}
            key={id}
          />
        );
      });
    }
    if (weatherData === null) {
      return (
        <Text style={styles.text}>Nothing found, try another city...</Text>
      );
    }
  };

  useEffect(() => {
    dispatch(resetWeek());
  }, [route.params]);

  return (
    <BottomTabBar onRepeatPress={repeatPressHandler}>
      <View style={[styles.container]}>
        <SearchInput />
        <Animated.View style={[styles.result, animatedStyle]}>
          {_renderWeather()}
        </Animated.View>
      </View>
    </BottomTabBar>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#08304a',
    flex: 1,
  },
  result: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginLeft: 35,
    marginRight: 70,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

export default Search;
