/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import Home from './src/pages/home';
import Detail from './src/pages/detail';

const App: () => React$Node = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home"
            component={Home}
            options={{ 
              headerShown: false
           }}
          />
          <Stack.Screen 
            name="Detail"
            component={Detail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
