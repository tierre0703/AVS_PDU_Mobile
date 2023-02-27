import 'react-native-gesture-handler';
import {enableScreens, ScreenStackHeaderBackButtonImage} from 'react-native-screens';
enableScreens();

import React, { useState, useEffect, useContext } from 'react';
import {getFocusedRouteNameFromRoute, NavigationContainer, useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Image, View, Text, StatusBar, useColorScheme} from 'react-native';


import TabComponent from './components/Tab';
import Loading from './screens/Loading';
import Dashboard from './screens/Dashboard';

const Logo = require('./assets/logo.png');


import i18n from './languages/i18n';
import Ripple from './components/Ripple';
import { ThemeContext } from './components/ThemeProvider';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RootStack = () => {
    const {theme} = useContext(ThemeContext);

    const profileIcon = (navigation, showDetail = true) => {
        return (<></>);
      }

    const onRightButtonPress = (navigation) => {
    }
    const onClickProfileSettings = (navigation) => {
    }

    const Header = ({
        title = null,
        showBackButton = false,
        showAppIcon = false,
        isTransparent = false,
        showRightButton = false,
        rightButtonIcon = null,
        rightButtonOnPress = () => {},
        showLanguageDropdown = false,
        selectedLanguage = null,
        dispatch = null,
        languageOptions = [],
        isFullScreenHeader = false,
    },
    navigation,
    ) => ({
        title: title ? title : null,
        headerTitleStyle: styles(theme).headerTitleStyle,
        headerTitleAlign: 'center',
        headerStyle: {
          shadowOpacity: 0,
          elevation: isTransparent ? 0 : 4,
          backgroundColor: isTransparent ? 'transparent' : theme.dark? theme.colors.background : theme.COLORS.WHITE,
          justifyContent: 'flex-start',
          height:80,
        },
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
        headerRightContainerStyle: {
          marginRight: 20,
        },
        headerTransparent: isFullScreenHeader ? true : false,
        headerLeft: showBackButton
          ? () => (
              <Ripple onPress={() => navigation.goBack()} style={styles(theme).leftButton}>
                <Image source={arrowLeftIcon} resizeMode={'cover'}
                  style={{
                    tintColor:theme.dark?theme.COLORS.WHITE : theme.COLORS.DEFAULT_DARKBLUE
                  }}  />
              </Ripple>
            )
          : showAppIcon
          ? () => <Image src={Logo} style={styles(theme).logo} />
          //<Logo style={styles(theme).logo} />: <Logo style={styles(theme).logo} />
          : null,
        headerRight: rightButtonIcon ? () => (
              <Ripple onPress={()=>rightButtonOnPress(navigation)} style={styles(theme).rightButtonOuter}>
                {rightButtonIcon}
              </Ripple>
            )
          : null,
    });

    const DashboardStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={({navigation}) => {
                        return Header(
                        {
                            title: i18n.t(''),
                            // isTransparent: true,
                            // showLanguageDropdown: true,
                            showRightButton:false,
                            rightButtonIcon:profileIcon(navigation),
                            rightButtonOnPress: onRightButtonPress,
                            selectedLanguage: language,
                            dispatch,
                            languageOptions,
                            showAppIcon: true,
                        },
                        navigation,);
                      }}
                    />
            </Stack.Navigator>
        );
    };

    const BottomTabs = ({navigation}) => {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    style: {
                    display: showWalkthrough ? 'none' : 'flex',
                    zIndex: 1,
                    height: 80,
                    backgroundColor: theme.dark ? theme.colors.background : theme.COLORS.WHITE,
                    elevation: 3,
                    borderTopWidth: 0,
                    shadowOpacity: 0.5,
                    paddingBottom: 25,
                    paddingVertical: 20,
                    },
                }}
            >
                <Tab.Screen
                    name="Dashboard"
                    component={DashboardStack}
                    options={{
                    unmountOnBlur: true,
                    tabBarButton: (props) => (
                        <TabComponent label="Dashboard" {...props} />
                    ),
                    }}
                />
            </Tab.Navigator>
        );
    };

    // Root Stack
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Loading"
                component={Loading}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Dashboard"
                component={BottomTabs}
                options={{headerShown: false}}
            />
        </Stack.Navigator>

    );
}

const CreateRootNavigator = () => {
    const {theme} = React.useContext(ThemeContext);
    return (
        <NavigationContainer theme={theme}>
          <RootStack />
        </NavigationContainer>
    );
};
  
export default CreateRootNavigator;

const styles = theme => StyleSheet.create({
    leftIcon: {
      width: 40,
      height: 24,
    },
    rightIcon: {
      width: 32,
      height: 30,
    },
    leftButton: {
      width: 40,
      height: 40,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center'
    },
    languageButtonOuter: {
      borderRadius: 30,
      overflow: 'hidden',
      backgroundColor: theme.APP_COLOR_2,
    },
    rightButton: {
      padding: 5,
      borderRadius: 30,
    },
    languageOptionsContainer: {
      borderRadius: 15,
      backgroundColor: theme.COLORS.BLACK,
    },
    flagIcon: {
      width: 16,
      height: 16,
      marginRight: 5,
    },
    languageBox: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    languageOption: {
      padding: 10,
      borderColor: theme.COLORS.WHITE_OPACITY_3P,
    },
    languageOptionText: {
      fontSize: 14,
      fontFamily: 'Moon-Bold',
      color: theme.COLORS.WHITE_OPACITY_3P,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      marginRight: 5,
    },
    userName: {
      textAlign: 'right',
      color: theme.dark? theme.COLORS.WHITE : theme.COLORS.DEFAULT_DARKBLUE,
      fontFamily: fontFamilies.Rogan,
      fontWeight: '700',
      fontSize: 12,
      lineHeight: 14
    },
    userDescription: {
      textAlign: 'right',
      color: theme.COLORS.DEFAULT_BLUE,
      fontSize: 10,
      fontWeight: '800',
      lineHeight: 12,
      fontFamily: fontFamilies.Rogan
    },
    userDescriptionContainer: {
      flexDirection: 'column',
      marginRight: 17,
      justifyContent: 'center'
    },
    headerTitleStyle: {
      color: theme.dark? theme.COLORS.WHITE : theme.COLORS.DEFAULT_DARKBLUE,
      fontFamily: fontFamilies.Rogan,
      fontSize: 15,
      lineHeight: 18,
      fontWeight: '700'
    }
  });
  