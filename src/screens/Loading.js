/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import {CommonActions,} from '@react-navigation/native';
import {withTranslation} from 'react-i18next';
import { ThemeContext } from '../components/ThemeProvider';

const logo = require('../assets/logo.png');

const Loading = ({navigation, t, isLoading=true}) => {
  const {theme} = useContext(ThemeContext);

  const navigateHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  }
  useEffect(() => {
      setTimeout(() => {
        //transition to dashboard
        navigateHome();
      }, 3000);
  }, []);

  
  return (
    <View style={styles(theme).container}>
      <Image source={isLoading? logo : logo_static} style={styles(theme).image} resizeMode="contain" />
      <Text style={styles(theme).text}>{t('loading.loadingText')}</Text>
      <View style={styles(theme).textBottomContainer}>
        <Text style={styles(theme).textBottom}>{t('loading.loadingTextBottom')}</Text>
      </View>
    </View>
  );
};

const styles = theme => StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.COLORS.APPBAR_BLUE,
    },
    text: {
      fontSize: 18,
      lineHeight: 24,
      fontFamily: 'Inter-Regular',
      color: theme.COLORS.WHITE,
      textAlign: 'center',
      letterSpacing: 2.3,
      marginTop: 48
    },
    image: {
      width: 300,
      height: 92
  
    },
    textBottomContainer: {
      width:'100%',
      height: 80,
      position: 'absolute',
      left: 0,
      bottom: 0,
      paddingBottom: 40,
    },
    textBottom: {
      fontSize: 12,
      lineHeight: 14,
      fontFamily: 'Inter-Regular',
      color: theme.COLORS.WHITE,
      textAlign: 'center',
      letterSpacing: .6,
    }
  });

export default withTranslation()(Loading);
