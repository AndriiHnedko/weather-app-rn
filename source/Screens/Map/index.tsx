import React, { memo } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { customMapStyle } from '../../Services/customMapStyle';

const Map = memo(() => {
  return (
    <SafeAreaView style={[styles.area]}>
      <StatusBar barStyle="default" backgroundColor={'#000'} />
      <View style={[styles.container]}>
        <MapView
          provider={'google'}
          customMapStyle={customMapStyle}
          // mapType={MAP_TYPES.TERRAIN}
          style={styles.map}
        />
      </View>
    </SafeAreaView>
  );
});

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

export default Map;
