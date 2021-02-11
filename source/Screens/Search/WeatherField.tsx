import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

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
  const duration = 500;
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

  useEffect(showItem);

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
            style={styles.image}
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
    marginHorizontal: 35,
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
  image: { width: 40, height: 40 },
});

export default WeatherField;
