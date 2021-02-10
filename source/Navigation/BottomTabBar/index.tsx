import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import TabBarProvider from './Context';
import TabBarItem from './TabBarItem';
import { SafeAreaView } from 'react-native-safe-area-context';

type PropsType = {
  children: React.ReactNode;
};

const BottomTabBar: React.FC<PropsType> = ({ children }) => {
  const navigation = useNavigation();
  const navigateTo = (name: string) => navigation.navigate(name);
  return (
    <SafeAreaView style={[styles.area]}>
      <StatusBar barStyle="default" backgroundColor={'#000'} />
      <TabBarProvider
        activeColor={'#1383ff'}
        inactiveColor={'#8d8d8d'}
        iconSize={28}
        labelStyle={styles.labelStyle}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <TabBarItem
              name={'Map'}
              tabBarIcon={'map'}
              navigateTo={navigateTo}
            />
            <TabBarItem
              name={'Search'}
              tabBarIcon={'search'}
              navigateTo={navigateTo}
            />
          </View>
          <View style={styles.child}>{children}</View>
        </View>
      </TabBarProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: { flex: 1 },
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
