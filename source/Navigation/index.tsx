import React from 'react';
import Search from '../Screens/Search';
import Map from '../Screens/Map/index';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { NavigationParamList } from './types';

const Stack = createStackNavigator<NavigationParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName={'Map'} headerMode={'none'}>
      <Stack.Screen
        name={'Map'}
        component={Map}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={'Search'}
        component={Search}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
