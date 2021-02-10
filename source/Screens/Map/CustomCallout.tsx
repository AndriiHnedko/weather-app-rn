import React, { memo, useContext, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { MapContext } from './Context';

type PropsType = {
  animationDuration?: number;
  animationDelay?: number;
};

const CustomCallout: React.FC<PropsType> = memo(
  ({ animationDuration = 500, animationDelay = 500 }) => {
    const markerContext = useContext(MapContext);
    const data = markerContext?.weather;
    const { animateParallel, visible } = markerContext;
    const height = useRef(new Animated.Value(0)).current;
    const width = useRef(new Animated.Value(0)).current;
    const opacityCard = useRef(new Animated.Value(0)).current;

    const showCard = () =>
      animateParallel(
        [
          { from: opacityCard, to: 1 },
          { from: height, to: 80 },
          { from: width, to: 150 },
        ],
        animationDuration,
      );

    const hideCard = () =>
      animateParallel(
        [
          { from: opacityCard, to: 0 },
          { from: height, to: 0 },
          { from: width, to: 0 },
        ],
        animationDuration,
      );

    const cardAnimatedStyle = {
      height: height,
      width: width,
      opacity: opacityCard,
    };

    useEffect(() => {
      if (visible !== undefined) {
        if (visible) {
          showCard();
        } else {
          hideCard();
        }
      }
    }, [visible]);

    return (
      <View>
        <Animated.View style={[styles.container, cardAnimatedStyle]}>
          <Text style={styles.text}>{data?.name}</Text>
          <Text style={{ ...styles.text, marginTop: 5 }}>
            {data?.main.temp}
          </Text>
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#096ee2',
    elevation: 10,
    borderRadius: 3,
    padding: 5,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  marker: {
    marginTop: 6,
    alignItems: 'center',
  },
});

export default CustomCallout;
