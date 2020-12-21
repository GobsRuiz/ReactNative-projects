/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer';
import { StatusBar } from 'react-native';

import Home from './src/pages/home';
import Detail from './src/pages/detail';

const drawer = createDrawerNavigator(
  {
    Homeinc: Home,
    Detailhes: Detail,
  },
)

export default NavigationContainer(drawer);
