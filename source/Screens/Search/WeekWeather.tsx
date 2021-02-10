import React from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../Redux';
import WeatherField from './WeatherField';
import { ScrollView, StyleSheet, View } from 'react-native';

const WeekWeather = () => {
  const weatherData = useSelector((s: StoreType) => s.weather.weekWeather);

  const _renderFields = () => {
    let counter = 0;
    return weatherData?.data.map((el, id) => {
      counter += 50;
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
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>{_renderFields()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
  },
  scroll: { paddingVertical: 35, paddingHorizontal: 35 },
});

export default WeekWeather;
