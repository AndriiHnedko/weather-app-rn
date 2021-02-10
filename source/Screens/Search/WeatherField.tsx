import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { StoreType } from '../../Redux';

const daysOfWeek = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

type PropsType = {
  temperature: number;
  picture: string;
  date: string;
  delay: number;
};

const WeatherField: React.FC<PropsType> = ({
  temperature,
  picture,
  date,
  delay,
}) => {
  const { loading } = useSelector((s: StoreType) => s.weather);
  const duration = 200;
  const dayId = new Date(date).getDay();
  const focusedDay = daysOfWeek[dayId];
  const stateTranslateX = useSharedValue(-200);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: stateTranslateX.value }],
  }));

  const animateItem = (
    toValue: number,
    timeDelay: number,
    timeDuration: number,
  ) => {
    stateTranslateX.value = withDelay(
      timeDelay,
      withTiming(toValue, {
        duration: timeDuration,
        easing: Easing.out(Easing.exp),
      }),
    );
  };

  const showItem = () => {
    animateItem(0, delay, duration);
  };

  const hideItem = () => {
    animateItem(0, delay, duration);
  };

  useEffect(showItem);
  useEffect(() => {
    if (loading) {
      hideItem();
    }
  }, [loading]);

  return (
    <Animated.View style={[animatedStyle]}>
      <View style={{ ...styles.container }}>
        <Text style={{ ...styles.text, ...styles.left }}>
          {focusedDay[0].toUpperCase() + focusedDay.slice(1)}
        </Text>
        <View style={styles.right}>
          <Image
            source={{
              uri: `https://www.weatherbit.io/static/img/icons/${picture}.png`,
            }}
            style={{ width: 40, height: 40 }}
          />
          <Text style={styles.text}>{Math.floor(temperature)}&deg;</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 30,
    marginBottom: 40,
    justifyContent: 'space-between',
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  left: {
    flex: 2,
  },
  right: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
});

export default WeatherField;
