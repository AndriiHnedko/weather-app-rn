import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedMarker from './AnimatedMarker';
import Card from './Card';
import { useSelector } from 'react-redux';
import { StoreType } from '../../Redux';

const WeatherMarker = memo(() => {
  const weather = useSelector((s: StoreType) => s.weather.currentWeather);
  const animationValue = {
    marker: {
      opacity: 1,
      translateY: 0,
      duration: 500,
    },
    card: { height: 80, opacity: 1, duration: 200 },
  };

  return (
    <View style={styles.container}>
      <AnimatedMarker {...animationValue.marker} />
      {weather && <Card {...animationValue.card} weather={weather} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column-reverse',
    flex: 1,
  },
});

export default WeatherMarker;
