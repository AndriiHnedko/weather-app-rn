import React, { useState } from 'react';
import { Weather } from '../../Services/api';
import { CurrentWeatherType } from '../../Redux/weather/types';
import { Animated, ToastAndroid } from 'react-native';
import { LatLng } from 'react-native-maps';

type ShowMarker = (coordinates: LatLng) => Promise<void>;
type ContextType = {
  visible: boolean | undefined;
  weather?: CurrentWeatherType | undefined;
  marker?: LatLng | undefined;
  showMarker?: ShowMarker;
  hideMarker?: (duration: number) => void;
  animateParallel: (
    values: { from: Animated.Value; to: number }[],
    duration: number,
    callBack?: () => void,
  ) => void;
  // onCardPress: () => void;
};

type PropsType = { children: React.ReactNode };

export const MapContext = React.createContext<ContextType>({
  visible: undefined,
  animateParallel: (
    values: { from: Animated.Value; to: number }[],
    duration: number,
    callBack?: () => void,
  ) => {
    const arrayAnimated: Animated.CompositeAnimation[] = values.map((el) =>
      Animated.timing(el.from, {
        toValue: el.to,
        duration,
        useNativeDriver: false,
      }),
    );
    return Animated.parallel(arrayAnimated).start(callBack);
  },
});

const MapProvider: React.FC<PropsType> = ({ children }) => {
  const [visible, setVisible] = useState<boolean>();
  const [marker, setMarker] = useState<LatLng>();
  const [weather, setWeather] = useState<CurrentWeatherType>();

  const showMarker: ShowMarker = async (coordinates) => {
    try {
      const { latitude, longitude } = coordinates;
      let data = await Weather.current(latitude, longitude);
      setWeather(data);
      setMarker(coordinates);
      setVisible(true);
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    }
  };

  const hideMarker = (duration: number) => {
    if (visible) {
      setVisible(false);
      setTimeout(() => {
        setWeather(undefined);
        setMarker(undefined);
        setVisible(undefined);
      }, duration);
    }
  };

  const animateParallel = (
    values: { from: Animated.Value; to: number }[],
    duration: number,
    callBack?: () => void,
  ) => {
    const arrayAnimated: Animated.CompositeAnimation[] = values.map((el) =>
      Animated.timing(el.from, {
        toValue: el.to,
        duration,
        useNativeDriver: false,
      }),
    );
    return Animated.parallel(arrayAnimated).start(callBack);
  };

  return (
    <MapContext.Provider
      value={{
        visible,
        weather,
        marker,
        showMarker,
        hideMarker,
        animateParallel,
      }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
