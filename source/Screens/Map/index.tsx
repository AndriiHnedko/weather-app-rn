import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { MAP_TYPES } from 'react-native-maps';

const Map = memo(() => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={'google'}
        mapType={MAP_TYPES.TERRAIN}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
    </View>
  );
});

export default Map;
