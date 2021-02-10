import React, { useContext, useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import MapView, { Callout, MapEvent, Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { customMapStyle } from '../../Services/customMapStyle';
import { MapContext } from './Context';
import CustomMarker from './CustomMarker';
import CustomCallout from './CustomCallout';
import { useNavigation } from '@react-navigation/native';

const MapContainer = () => {
  const navigation = useNavigation();
  const duration = 500;
  const _marker = useRef<React.ElementRef<typeof Marker>>(null);
  const _map = useRef<React.ElementRef<typeof MapView>>(null);
  const markerContext = useContext(MapContext);
  const longPressHandle = (event: MapEvent) => {
    markerContext!.showMarker!(event.nativeEvent.coordinate);
  };
  const pressHandle = () =>
    markerContext!.hideMarker!(duration + duration + duration);
  const calloutPressHandler = () => {
    navigation.navigate('Search', { coordinates: markerContext.marker! });
  };
  useEffect(() => {
    if (markerContext.visible && markerContext.marker) {
      _map?.current?.animateCamera({ center: markerContext.marker });
    }
  }, [markerContext.visible]);
  return (
    <View style={[styles.container]}>
      <MapView
        provider={'google'}
        customMapStyle={customMapStyle}
        style={styles.map}
        onRegionChangeComplete={_marker?.current?.showCallout}
        onLongPress={longPressHandle}
        onPress={pressHandle}
        ref={_map}>
        {markerContext.marker !== undefined && (
          <Marker
            ref={_marker}
            coordinate={markerContext.marker}
            calloutAnchor={{ x: 3.2, y: 0 }}
            onCalloutPress={calloutPressHandler}>
            <CustomMarker animationDuration={duration} />
            <Callout tooltip={true} style={{ height: 80, width: 150 }}>
              <CustomCallout />
            </Callout>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapContainer;
