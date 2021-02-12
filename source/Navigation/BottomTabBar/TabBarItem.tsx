import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabBarContext } from './Context';

type TabItemProps = {
  name: string;
  tabBarIcon: string;
  navigateTo: (name: string, params?: any) => void;
  params?: any;
};

const TabBarItem: React.FC<TabItemProps> = ({
  tabBarIcon,
  name,
  navigateTo,
  params,
}) => {
  const _tabBar = useContext(TabBarContext);
  const { activeColor, inactiveColor, active, iconSize, labelStyle } = _tabBar;
  const color = active === name ? activeColor : inactiveColor;
  const pressHandler = () => navigateTo(name, params);
  return (
    <TouchableOpacity
      onPress={pressHandler}
      activeOpacity={0.4}
      style={styles.container}>
      <Icon name={tabBarIcon} size={iconSize} color={color} />
      <Text style={[{ color: color }, labelStyle]}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabBarItem;
