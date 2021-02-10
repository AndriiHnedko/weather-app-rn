import { LatLng } from 'react-native-maps';

export type NavigationParamList = {
  Map: undefined;
  Search: { coordinates: LatLng } | undefined;
};
