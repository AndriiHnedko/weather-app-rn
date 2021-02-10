import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

type ContextType = {
  activeColor: string;
  inactiveColor: string;
  iconSize: number;
  labelStyle: StyleProp<TextStyle>;
  active: string;
};

type PropsType = {
  children: React.ReactNode;
  activeColor: string;
  inactiveColor: string;
  iconSize: number;
  labelStyle: StyleProp<TextStyle>;
};

export const TabBarContext = React.createContext<ContextType>({
  activeColor: 'blue',
  inactiveColor: 'gray',
  iconSize: 24,
  labelStyle: {},
  active: '',
});

const TabBarProvider: React.FC<PropsType> = ({
  children,
  activeColor,
  inactiveColor,
  iconSize,
  labelStyle,
}) => {
  const active = useRoute().name;
  return (
    <TabBarContext.Provider
      value={{
        activeColor,
        iconSize,
        inactiveColor,
        labelStyle,
        active,
      }}>
      {children}
    </TabBarContext.Provider>
  );
};

export default TabBarProvider;
