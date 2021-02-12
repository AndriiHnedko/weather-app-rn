import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './source/Navigation';
import { Provider } from 'react-redux';
import Store from './source/Redux/index';

const App = () => {
  useEffect(() => SplashScreen.hide(), []);
  return (
    <SafeAreaProvider>
      <Provider store={Store}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
