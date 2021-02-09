import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../Screens/Search';
import Map from '../Screens/Map';
import { NavigationParamList } from './types';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator<NavigationParamList>();

const Navigation = () => (
  <Tab.Navigator
    initialRouteName={'Map'}
    backBehavior={'initialRoute'}
    tabBarOptions={{
      tabStyle: style.tabBar,
      style: style.navigator,
    }}>
    <Tab.Screen
      name={'Map'}
      component={Map}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="map" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={'Search'}
      component={Search}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="search" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const style = StyleSheet.create({
  tabBar: {
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  navigator: {
    borderTopWidth: 0,
  },
});

export default Navigation;
