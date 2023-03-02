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
import CreateRootNavigator from './src';
import { StateProvider } from './src/services/State/State';
import { initialState } from './src/services/State/InitialState';
import { DarkTheme } from './src/services/Common/theme';

const RootNavigator = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <>
    <StatusBar
      hidden={true}
      barStyle="light-content"
      translucent={true}
      backgroundColor={theme.App_COLOR_3}
      />
      <CreateRootNavigator />
    </>
  );
}

const App = () => {
  const [theme, setTheme] = useState(DarkTheme);

  useEffect(()=>{
  }, []);

  return (
    <StateProvider initialState={initialState}>
      <ThemeContext.Provider value={{theme: theme, setTheme: setTheme}}>
        <MenuProvider>
          <I18nextProvider i18n={i18next}>
            <RootNavigator />
          </I18nextProvider>
        </MenuProvider>
      </ThemeContext.Provider>
    </StateProvider>
  );
}
export default App;
