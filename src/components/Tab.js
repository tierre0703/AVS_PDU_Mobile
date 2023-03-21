import React, {useRef} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../services/Common/theme';
import {Transition, Transitioning} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useStateValue } from '../services/State/State';
import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

import DashboardIcon from '../assets/ico_dashboard.svg';
import ProfileIcon from '../assets/ico_profile_dark.svg';
import SurveyIcon from '../assets/ico_survey_dark.svg';
import SettingIcon from '../assets/ico_setting.svg';
import DevicesIcon from '../assets/ico_devices.svg';
import CloudIcon from '../assets/ico_cloud.svg';
import Setting from '../screens/Setting';
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
    width: 24,
    height: 24,
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
    <DashboardIcon style={styles.dashboardIcon} width={24} height={24} />
  ),
  Mirror: (
    <ProfileIcon style={styles.dashboardIcon} />
  ),
  Survey: (
    <SurveyIcon  style={styles.dashboardIcon} />
  ),
  Setting: (
    <SettingIcon style={styles.dashboardIcon} />
  ),
  Devices: (
    <DevicesIcon style={styles.dashboardIcon} />
  ),
  Cloud: (
    <CloudIcon style={styles.dashboardIcon} />
  )
}


const iconsLight = {
  Dashboard: (
    <DashboardIcon style={styles.dashboardIcon} width={24} height={24} fill={theme.COLORS.APP_GREY} />
  ),
  Mirror: (
    <ProfileIcon style={styles.dashboardIcon} width={24} height={24} fill={theme.COLORS.APP_GREY} />
  ),
  Survey: (
    <SurveyIcon  style={styles.dashboardIcon} width={24} height={24} fill={theme.COLORS.APP_GREY} />
  ),
  Setting: (
    <SettingIcon style={styles.dashboardIcon} width={24} height={24} fill={theme.COLORS.APP_GREY} />
  ),
  Devices: (
    <DevicesIcon style={styles.dashboardIcon} width={24} height={24} fill={theme.COLORS.APP_GREY} />
  ),
  Cloud: (
    <CloudIcon style={styles.dashboardIcon} width={24} height={24} fill={theme.COLORS.APP_GREY} />
  )
}

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
