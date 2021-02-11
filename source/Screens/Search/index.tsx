import React, { memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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

const Search = memo(() => {
  const dispatch = useDispatch();
  const weatherData = useSelector((s: StoreType) => s.weather.weekWeather);
  const defaultInputValue = weatherData
    ? `${weatherData.city_name}, ${weatherData.country_code}`
    : '';
  const translateY = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const repeatPressHandler = () => {
    translateY.value = withTiming(800, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
    setTimeout(dispatch, 300, resetWeek());
  };

  const _renderWeather = () => {
    let counter = 0;
    return weatherData?.data.map((el, id) => {
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
  };

  return (
    <BottomTabBar onRepeatPress={repeatPressHandler}>
      <View style={[styles.container]}>
        <SearchInput defaultValue={defaultInputValue} />
        <Animated.View style={[styles.result, animatedStyle]}>
          <ScrollView style={styles.scroll}>{_renderWeather()}</ScrollView>
        </Animated.View>
      </View>
    </BottomTabBar>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202c3e',
    flex: 1,
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
  },
  scroll: { paddingVertical: 35 },
});

export default Search;
