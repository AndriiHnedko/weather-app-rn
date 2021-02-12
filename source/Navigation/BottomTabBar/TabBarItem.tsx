import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from '../../Services/customFont/icomoon';
import { TabBarContext } from './Context';

type TabItemProps = {
  name: string;
  icon: string;
  outLineIcon?: string;
  navigateTo: (name: string, params?: any) => void;
  params?: any;
};

const TabBarItem: React.FC<TabItemProps> = ({
  icon,
  name,
  navigateTo,
  params,
  outLineIcon,
}) => {
  const _tabBar = useContext(TabBarContext);
  const { activeColor, inactiveColor, active, iconSize, labelStyle } = _tabBar;
  const isActive = active === name;
  const pressHandler = () => navigateTo(name, params);
  return (
    <TouchableOpacity
      onPress={pressHandler}
      activeOpacity={0.4}
      style={styles.container}>
      <Icon
        name={outLineIcon && !isActive ? outLineIcon : icon}
        size={iconSize}
        color={isActive ? activeColor : inactiveColor}
      />
      <Text
        style={[{ color: isActive ? activeColor : inactiveColor }, labelStyle]}>
        {name}
      </Text>
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
