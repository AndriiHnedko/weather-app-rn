import React, { memo, useContext, useEffect, useRef } from 'react';
import { MapContext } from './Context';
import { Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

type PropsType = {
  animationDuration?: number;
};

const CustomMarker: React.FC<PropsType> = memo(
  ({ animationDuration = 500 }) => {
    const { visible, animateParallel } = useContext(MapContext);
    const opacityMarker = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-30)).current;

    const showMarker = () =>
      animateParallel(
        [
          { from: opacityMarker, to: 1 },
          { from: translateY, to: 0 },
        ],
        animationDuration,
      );
    const hideMarker = () =>
      animateParallel(
        [
          { from: opacityMarker, to: 0 },
          { from: translateY, to: -30 },
        ],
        animationDuration,
      );
    const markerAnimatedStyle = {
      opacity: opacityMarker,
      transform: [{ translateY: translateY }],
    };
    useEffect(() => {
      if (visible !== undefined) {
        if (visible) {
          showMarker();
        } else {
          hideMarker();
        }
      }
    }, [visible]);
    return (
      <Animated.View style={[styles.marker, markerAnimatedStyle]}>
        <Icon name={'map-marker-alt'} size={30} color={'#fb8926'} />
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  marker: {
    marginTop: 6,
    alignItems: 'center',
  },
});

export default CustomMarker;
