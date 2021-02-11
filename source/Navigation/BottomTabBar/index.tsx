import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import TabBarProvider from './Context';
import TabBarItem from './TabBarItem';
import { SafeAreaView } from 'react-native-safe-area-context';

type PropsType = {
  children: React.ReactNode;
  onRepeatPress?: () => void;
};

const BottomTabBar: React.FC<PropsType> = ({ children, onRepeatPress }) => {
  const navigation = useNavigation();
  const router = useRoute();
  const navigateTo = (name: string, params?: any) => {
    if (router.name === name && onRepeatPress) {
      onRepeatPress();
    }
    navigation.navigate(name, params);
  };
  return (
    <SafeAreaView style={[styles.area]}>
      <StatusBar barStyle="default" backgroundColor={'#000'} />
      <TabBarProvider
        activeColor={'#01BAEF'}
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
              params={{ discharge: 'discharge' }}
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
