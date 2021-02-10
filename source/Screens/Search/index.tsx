import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigationParamList } from '../../Navigation/types';
import { RouteProp } from '@react-navigation/native';
import SearchInput from './SearchInput';
import BottomTabBar from '../../Navigation/BottomTabBar/index';
import WeekWeather from './WeekWeather';

type PropsType = {
  navigation: BottomTabNavigationProp<NavigationParamList, 'Search'>;
  route: RouteProp<NavigationParamList, 'Search'>;
};

const Search = memo<PropsType>(() => {
  return (
    <BottomTabBar>
      <View style={[styles.container]}>
        <SearchInput />
        <WeekWeather />
      </View>
    </BottomTabBar>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202c3e',
    flex: 1,
  },
});

export default Search;
