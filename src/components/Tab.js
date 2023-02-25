import React, {useRef} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../services/Common/theme';
import {Transition, Transitioning} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { useStateValue } from '../services/State/State';
import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
const indicator = require('../assets/active-tab.png');
const dashboardIcon = require('../assets/dashboard.png');
const dashboardIconLight = require('../assets/dashboard_light.png');
const profileIcon = require('../assets/profile.png');
const profileIconLight = require('../assets/profile_light.png');
const lighteningIcon = require('../assets/lightening.png');
const lighteningIconLight = require('../assets/lightening_light.png');
const myWalletIcon = require('../assets/wallet.png');
const myWalletIconLight = require('../assets/wallet_light.png');
const statsIcon = require('../assets/Stats.png');
const mirrorIcon = require('../assets/airplay.png');
const validateIcon = require('../assets/verify.png');
const surveyIcon = require('../assets/survey_dark.png');
const surveyIconLight= require('../assets/survey_light.png');

import DashboardIcon from '../assets/ico_dashboard_dark.svg';
import DashboardIconLight from '../assets/ico_dashboard_light.svg';
import ProfileIcon from '../assets/ico_profile_dark.svg';
import ProfileIconLight from '../assets/ico_profile_light.svg';
import LighteningIcon from '../assets/ico_lightening_dark.svg';
import LighteningIconLight from '../assets/ico_lightening_light.svg';
import WalletIcon from '../assets/ico_wallet_dark.svg';
import WalletIconLight from '../assets/ico_wallet_light.svg';
import SurveyIcon from '../assets/ico_survey_dark.svg';
import SurveyIconLight from '../assets/ico_survey_light.svg';

const styles = StyleSheet.create({
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.SHADOW,
    width: 41,
    height: 41,
    borderRadius: 10,
  },
  indicator: {
    height: 55,
    width: 30,
  },
  dashboardIcon: {
    //width: 24,
    //height: 24,
  },
  myWalletIcon: {
    width: 24,
    height: 24,
  },
});


const Container = styled.TouchableWithoutFeedback``;
const Background = styled(Transitioning.View)`
  flex: auto;
  margin: 8px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  background: ${(props) => 'transparent'};
`;

function Tab({label, accessibilityState, onPress}) {
  const focused = accessibilityState.selected;
  

  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={0} />
      <Transition.Change interpolation="easeInOut" durationMs={100} />
      <Transition.In type="fade" durationMs={10} />
    </Transition.Sequence>
  );

  const ref = useRef();

const icons = {
  Dashboard: (
    <DashboardIcon style={styles.dashboardIcon} />
  ),
  Mirror: (
    <ProfileIcon style={styles.dashboardIcon} />
  ),
  MyWallet: (
    <WalletIcon style={styles.dashboardIcon} />
  ),
  Stats: (
    <LighteningIcon style={styles.dashboardIcon} />
  ),
  Validate: (
    <Image
      resizeMode="cover"
      source={validateIcon}
      style={{
        ...styles.dashboardIcon,
        tintColor: theme.dark ? theme.COLORS.WHITE : theme.COLORS.DEFAULT_DARKBLUE
      }}
    />
  ),
  Survey: (
    <SurveyIcon  style={styles.dashboardIcon} />
  )
}


const iconsLight = {
  Dashboard: (
    <DashboardIconLight style={styles.dashboardIcon} />
  ),
  Mirror: (
    <ProfileIconLight style={styles.dashboardIcon} />
  ),
  MyWallet: (
    <WalletIconLight style={styles.dashboardIcon} />
  ),
  Stats: (
    <LighteningIconLight style={styles.dashboardIcon} />
  ),
  Validate: (
    <Image
      resizeMode="cover"
      source={validateIcon}
      style={{
        ...styles.dashboardIcon,
        tintColor: theme.dark ? theme.COLORS.WHITE : theme.COLORS.DEFAULT_DARKBLUE
      }}
    />
  ),
  Survey: (
    <SurveyIconLight  style={styles.dashboardIcon} />
  )
}
  
const icon = icons[label];

  return (
    <Container
      onPress={() => {
        ref.current.animateNextTransition();
        onPress();
      }}>
      <Background
        ref={ref}
        label={label}
        focused={focused}
        transition={transition}>
        <View style={{...styles.indicatorContainer, backgroundColor: focused ? theme.dark ? theme.COLORS.DEFAULT_DARKBLUE : theme.COLORS.SHADOW : 'transparent'}}>
          {theme.dark? icons[label] : iconsLight[label]}
      </View>
      </Background>
    </Container>
  );
}

export default Tab;
