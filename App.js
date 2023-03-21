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
import { StateProvider, useStateValue } from './src/services/State/State';
import { initialState } from './src/services/State/InitialState';
import { DarkTheme, LightTheme } from './src/services/Common/theme';
import PDUEditModal from './src/components/PDUEditModal';
import { actions, reducer } from './src/services/State/Reducer';
import { getPDUSettings } from './src/services/DataManager';
import { PDUSocketProvider } from './src/services/PDUSocketProvider';
import { PDUServerProvider } from './src/services/PDUServerProvider';

const RootNavigator = () => {
  const {theme} = useContext(ThemeContext);

  const [{}, dispatch] = useStateValue();

  useEffect(()=>{
    checkPduListSettings();
  }, []);

  const checkPduListSettings = async () => {
    const save_data = await getPDUSettings();
    console.log(save_data);
    dispatch({
      type: actions.SET_PDULIST,
      pduListSettings: save_data,
    });
  };

  return (
    <>
      <StatusBar
        hidden={true}
        barStyle="light-content"
        translucent={true}
        backgroundColor={theme.App_COLOR_3}
        />
      {/* <PDUEditModal /> */}
      <CreateRootNavigator />
    </>
  );
}

const App = () => {
  const [theme, setTheme] = useState(LightTheme);

  useEffect(()=>{
  }, []);

  return (
    <StateProvider initialState={initialState}  reducer={reducer}>
      <ThemeContext.Provider value={{theme: theme, setTheme: setTheme}}>
        <PDUServerProvider>
          <PDUSocketProvider>
            <MenuProvider>
              <I18nextProvider i18n={i18next}>
                <RootNavigator />
              </I18nextProvider>
            </MenuProvider>
          </PDUSocketProvider>
        </PDUServerProvider>
      </ThemeContext.Provider>
    </StateProvider>
  );
}
export default App;
