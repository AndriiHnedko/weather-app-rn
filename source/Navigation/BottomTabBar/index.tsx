import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TabBarProvider from './Context';
import TabBarItem from './TabBarItem';

type PropsType = {
  children: React.ReactNode;
};

const BottomTabBar: React.FC<PropsType> = ({ children }) => {
  const navigation = useNavigation();
  const navigateTo = (name: string) => navigation.navigate(name);
  return (
    <TabBarProvider
      activeColor={'#1383ff'}
      inactiveColor={'#8d8d8d'}
      iconSize={28}
      labelStyle={styles.labelStyle}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <TabBarItem name={'Map'} tabBarIcon={'map'} navigateTo={navigateTo} />
          <TabBarItem
            name={'Search'}
            tabBarIcon={'search'}
            navigateTo={navigateTo}
          />
        </View>
        <View style={styles.child}>{children}</View>
      </View>
    </TabBarProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column-reverse',
    flex: 1,
  },
  container: {
    height: 70,
    backgroundColor: '#000',
    flexDirection: 'row',
  },
  child: {
    flex: 1,
  },
  labelStyle: {
    fontSize: 12,
  },
});

export default BottomTabBar;
