/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';

import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import i18next from 'i18next';
import {I18nextProvider} from 'react-i18next';
import {MenuProvider} from 'react-native-popup-menu';
import { default as AsyncStorage } from '@react-native-async-storage/async-storage';
import ThemeProvider, { ThemeContext } from './src/components/ThemeProvider';

const RootNavigator = () => {
  
}
export default App;
