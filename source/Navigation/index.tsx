import React from 'react';
import Search from '../Screens/Search';
import Map from '../Screens/Map';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationParamList } from './types';

const Stack = createStackNavigator<NavigationParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName={'Search'} headerMode={'none'}>
      <Stack.Screen name={'Map'} component={Map} />
      <Stack.Screen name={'Search'} component={Search} />
    </Stack.Navigator>
  );
};

export default Navigation;
