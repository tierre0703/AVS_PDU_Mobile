import 'react-native-gesture-handler';
import {enableScreens, ScreenStackHeaderBackButtonImage} from 'react-native-screens';
enableScreens();

import React, { useState, useEffect, useContext } from 'react';
import {getFocusedRouteNameFromRoute, NavigationContainer, useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Image, View, Text, StatusBar, useColorScheme, Dimensions} from 'react-native';
import English from './assets/english.png';
import Chinese from './assets/chinese.png';
import Deutsch from './assets/deutsch.png';
import Japanese from './assets/japanese.png';
import Spanish from './assets/spanish.png';


import TabComponent from './components/Tab';
import Loading from './screens/Loading';
import Dashboard from './screens/Dashboard';

const Logo = require('./assets/logo.png');


import i18n from './languages/i18n';
import Ripple from './components/Ripple';
import { ThemeContext } from './components/ThemeProvider';
import { useStateValue } from './services/State/State';
import { fontFamilies } from './utils/FontFamilies';
import Setting from './screens/Setting';
import { createDrawerNavigator, DrawerItemList, DrawerToggleButton } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PDUList from './screens/PDUList';
import DeviceInfo from './screens/DeviceInfo';
import DevicesIcon from './assets/ico_devices.svg';

import LeftArrowIcon from './assets/ico_arrow_left.svg';
import { actions } from './services/State/Reducer';
import { Cloud } from './screens/Cloud';

const { width } = Dimensions.get("window");

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

 

const RootStack = () => {
    const {theme} = useContext(ThemeContext);

    const profileIcon = (navigation, showDetail = true) => {
        return (<></>);
    }

    const addDevice = (navigation) => {
    }

    const navigateToDeviceList = (navigation) => {
      navigation.navigate('DeviceList');
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
          backgroundColor: isTransparent ? 'transparent' : theme.dark? theme.colors.background : theme.COLORS.APPBAR_BLUE,
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
                <LeftArrowIcon
                  style={{
                    tintColor:theme.dark?theme.COLORS.WHITE : theme.COLORS.DEFAULT_DARKBLUE
                  }}
                />
              </Ripple>
            )
          : showAppIcon
          ? () => <Image source={Logo} style={styles(theme).logo}  resizeMode={'contain'} />
          //<Logo style={styles(theme).logo} />: <Logo style={styles(theme).logo} />
          : null,
        headerRight: rightButtonIcon ? () => (
              <Ripple onPress={()=>rightButtonOnPress(navigation)} style={styles(theme).rightButtonOuter}>
                {rightButtonIcon}
              </Ripple>
            )
          : null,
    });

    const DrawerNavigator = (props) => {
      console.log(props);
      return (
        <Drawer.Navigator
          initialRouteName='Dashboard'
          drawerContent={(props) => <CustomDrawerNavigation {...props} />}
          screenOptions={{
            drawerPosition: 'right',
            headerTitleAlign: 'center',
            headerStyle: {
              shadowOpacity: 0,
              elevation: 4,
              backgroundColor: theme.dark? theme.colors.background : theme.COLORS.WHITE,
              height:80,
            },
            headerLeftContainerStyle: {
              marginLeft: 20,
            },
            headerRightContainerStyle: {
              marginRight: 20,
            },
            headerTitleStyle:styles(theme).headerTitleStyle,
            headerLeft: ()=><Image source={Logo} style={styles(theme).logo}  resizeMode={'contain'} />,
            headerRight: () => <DrawerToggleButton tintColor='white' />,
            drawerOpenRoute: 'DrawerOpen',
            drawerCloseRoute: 'DrawerClose',
            drawerToggleRoute: 'DrawerToggle',
            drawerWidth: (width / 3) * 2
          }}
        >
          <Drawer.Screen
            name="Dashboard"
            component={Dashboard}
          />
          <Drawer.Screen
            name="PDU List"
            component={PDUList}
          />
        </Drawer.Navigator>
  
      );
    }
  
    const CustomDrawerNavigation = (props) => {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ height: 250, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
            <View style={{ height: 200, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
              <Image source={Logo} style={{ width: 150 }} resizeMode={'contain'} />
            </View>
          </View>
          <ScrollView>
            <DrawerItemList {...props} />
          </ScrollView>
          <View style={{ alignItems: "center", bottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', marginRight: 15 }}>
                <Icon name="flask" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Icon name="call" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    const SettingStack = () => {
      const [{selectedLanguage}, dispatch] = useStateValue();

      return (
        <Stack.Navigator>
            <Stack.Screen
                name="Setting"
                component={Setting}
                options={({navigation}) => {
                    return Header(
                    {
                        title: i18n.t('Setting'),
                        // isTransparent: true,
                        // showLanguageDropdown: true,
                        showRightButton:false,
                        dispatch,
                        showAppIcon: true,
                    },
                    navigation,);
                  }}
                />
        </Stack.Navigator>
    );
    }

    const DevicesStack = () => {
      const [{}, dispatch] = useStateValue();

      return (
        <Stack.Navigator>
        <Stack.Screen
            name="Devices"
            component={PDUList}
            options={({navigation}) => {
                return Header(
                {
                    title: i18n.t('Devices'),
                    dispatch,
                    showRightButton: true,
                    rightButtonIcon: (<MaterialIcons name='add' size={24} color={'white'} />),
                    rightButtonOnPress: ()=>{
                      dispatch({
                        type: actions.SET_MODALSETTING,
                        modalSetting: {
                          show: true,
                          type: 'add',
                        }
                      });
                    },
                    showAppIcon: true,
                },
                navigation,);
              }}
            />
       
    </Stack.Navigator>
      );
    }

    const CloudStack = () => {
      const [{}, dispatch] = useStateValue();

      return (
        <Stack.Navigator>
        <Stack.Screen
            name="Cloud"
            component={Cloud}
            options={({navigation}) => {
                return Header(
                {
                    title: i18n.t('Cloud'),
                    dispatch,
                    showRightButton: true,
                    rightButtonIcon: (<MaterialIcons name='add' size={24} color={'white'} />),
                    rightButtonOnPress: ()=>{
                      dispatch({
                        type: actions.SET_MODALSETTING,
                        modalSetting: {
                          show: true,
                          type: 'add',
                        }
                      });
                    },
                    showAppIcon: true,
                },
                navigation,);
              }}
            />
       
    </Stack.Navigator>
      );
    }

    const DashboardStack = () => {
      const languageOptions = [
        {
          icon: English,
          label: i18n.t('landing.english'),
          value: 'en',
        },
        {
          icon: Chinese,
          label: i18n.t('landing.chinese'),
          value: 'zh',
        },
        {
          icon: Deutsch,
          label: i18n.t('landing.deutsch'),
          value: 'de',
        },
        {
          icon: Japanese,
          label: i18n.t('landing.japanese'),
          value: 'ja',
        },
        {
          icon: Spanish,
          label: i18n.t('landing.spanish'),
          value: 'es',
        },
      ];
      const [{selectedLanguage}, dispatch] = useStateValue();
      const language = languageOptions.find((l) => l.value === selectedLanguage);
    
        return (
            <Stack.Navigator>
              <Stack.Screen
                  name="Dashboard"
                  component={Dashboard}
                  options={({navigation}) => {
                      return Header(
                      {
                          title: i18n.t('Dashboard'),
                          // isTransparent: true,
                          // showLanguageDropdown: true,
                          showRightButton:false,
                          //rightButtonIcon:<DrawerToggleButton tintColor='white' />,
                          rightButtonIcon: <DevicesIcon width="24" height="24" fill="white" />,
                          rightButtonOnPress: ()=>{
                            navigation.navigate('Devices');
                          },
                          selectedLanguage: language,
                          dispatch,
                          languageOptions,
                          showAppIcon: true,
                      },
                      navigation,);
                    }}
                  />
              <Stack.Screen
                name="DeviceInfo"
                component={DeviceInfo}
                options={({navigation}) => {
                  return Header(
                  {
                      title: i18n.t('Device Info'),
                      dispatch,
                      showBackButton: true,
                  },
                  navigation,);
                }}
              />  
              <Stack.Screen
                name="Devices"
                component={PDUList}
                options={({navigation}) => {
                    return Header(
                    {
                        title: i18n.t('Devices'),
                        dispatch,
                        showBackButton: true,
                        showRightButton: true,
                        //rightButtonIcon: (<MaterialIcons name='add' size={24} color={'white'} />),
                        //rightButtonOnPress: ()=>{
                        //  dispatch({
                        //    type: actions.SET_MODALSETTING,
                        //    modalSetting: {
                        //      show: true,
                        //      type: 'add',
                        //    }
                        //  });
                        //},
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
              screenOptions={{
                
                //activeTintColor: '#F60081',
                tabBarStyle: {
                  display: 'flex',
                  zIndex: 1,
                  height: 80,
                  borderTopWidth: .1,
                  backgroundColor: theme.dark ? theme.colors.background : '#fafafa',
                  elevation: 3,
                  shadowOpacity: 0.5,
                  paddingBottom: 25,
                  paddingVertical: 20,
              }
            }}
            >
                <Tab.Screen
                    name="DashboardPage"
                    //component={DrawerNavigator}
                    component={DashboardStack}
                    options={{
                      headerShown: false,
                      unmountOnBlur: true,
                      tabBarButton: (props) => (
                          <TabComponent label="Dashboard" {...props} />
                      ),
                    }}
                />
                <Tab.Screen
                    name="Cloud"
                    //component={DrawerNavigator}
                    component={CloudStack}
                    options={{
                      headerShown: false,
                      unmountOnBlur: true,
                      tabBarButton: (props) => (
                          <TabComponent label="Cloud" {...props} />
                      ),
                    }}
                />
                <Tab.Screen
                  name="Setting"
                  component={SettingStack}
                  options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    tabBarButton: (props) => (
                        <TabComponent label="Setting" {...props} />
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
                name="Home"
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
      width: 100,
      height: 50
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
      color: theme.dark? theme.COLORS.WHITE : theme.COLORS.WHITE,
      fontFamily: fontFamilies.Rogan,
      fontSize: 15,
      lineHeight: 18,
      fontWeight: '700'
    },
    rightButtonOuter: {
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
  