import React, { useRef, useState } from 'react';
import BottomTabBar from '../../Navigation/BottomTabBar/index';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { LatLng, MapEvent, Marker } from 'react-native-maps';
import { customMapStyle } from '../../Services/customMapStyle';
import WeatherMarker from './WeatherMarker';
import { useDispatch } from 'react-redux';
import {
  getCurrentWeather,
  getWeekWeatherCoordinates,
} from '../../Redux/weather/actions';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const ASPECT_RADIO = width / height;
const LATITUDE = 50.351;
const LONGITUDE = 30.896;
const LATITUDE_DELTA = 20.254;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RADIO;

const Map = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const _map = useRef<React.ElementRef<typeof MapView>>(null);

  const [coordinate, setCoordinate] = useState<LatLng>();

  const longPressHandler = (event: MapEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    _map.current?.animateCamera({ center: { longitude, latitude } });
    dispatch(getCurrentWeather(latitude, longitude));
    setCoordinate({ latitude, longitude });
  };

  const touchHandler = () => {
    setCoordinate(undefined);
  };

  const onTouchMarker = (event: MapEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    dispatch(getWeekWeatherCoordinates(latitude, longitude));
    navigation.navigate('Search');
  };

  return (
    <BottomTabBar>
      <View style={[styles.container]}>
        <MapView
          provider={'google'}
          initialRegion={{
            longitude: LONGITUDE,
            latitude: LATITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          customMapStyle={customMapStyle}
          style={styles.map}
          rotateEnabled={false}
          onLongPress={longPressHandler}
          onPress={touchHandler}
          ref={_map}>
          {coordinate && (
            <Marker
              coordinate={coordinate}
              onPress={onTouchMarker}
              anchor={{ x: 0, y: 1.1 }}
              style={styles.marker}>
              <WeatherMarker />
            </Marker>
          )}
        </MapView>
      </View>
    </BottomTabBar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    height: 120,
    width: 180,
  },
});

export default Map;
