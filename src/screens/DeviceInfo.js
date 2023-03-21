import React, {useEffect, useContext, useState} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Linking,
} from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import NameIcon from '../assets/ico_name.svg';
import SNIcon from '../assets/ico_sn.svg';
import VersionIcon from '../assets/ico_version.svg';
import ReleaseDateIcon from '../assets/ico_releasedate.svg';
import SystimeIcon from '../assets/ico_systemtime.svg';
import UptimeIcon from '../assets/ico_uptime.svg';
import CputempIcon from '../assets/ico_cputemp.svg';
import InternaltempIcon from '../assets/ico_internaltemp.svg';
import FanIcon from '../assets/ico_fan.svg';
import HightempIcon from '../assets/ico_hightemp.svg';
import LowtempIcon from '../assets/ico_lowtemp.svg';
import LanIcon from '../assets/ico_lanip.svg';
import WifiIcon from '../assets/ico_wifi.svg';

import WebIcon from '../assets/ico_web.svg';
import RebootIcon from '../assets/ico_reboot.svg';
import ResetIcon from '../assets/ico_renew.svg';
import ShutdownIcon from '../assets/ico_shutdown.svg';

import TcpSocket from 'react-native-tcp-socket';
import { useStateValue } from '../services/State/State';
import Ripple from '../components/Ripple';
import { FlatList } from 'react-native-gesture-handler';
import { VirtualizedList } from '../components/VirtualizedList';

const test_device_info = [
    {title: 'Name', value:'Soleux PDU'},
    {title: 'SN', value: '02c0018115a3a72d'},
    {title: 'LANMAC', value: '02:81:15:a3:a7:2d'},
    {title: 'WIFIMAC', value: '02:81:15:a3:a7:2d'},
    //{title: 'APP_NAME', value: ''},
    {title: 'VER', value: '1.6 Build:6'},
    {title: 'RELEASE_DATE', value: '14.05.2022'},
    {title: 'SYSTEMP', value: '24.187*C'},
    {title: 'CPUTEMP', value: '27.98*C'},
    {title: 'SYSTIME', value: '2023/02/23 12:08:32'},
    {title: 'UPTIME', value: '5 days, 19 hours, 9 minutes'},
    {title: 'FAN_STATUS', value: 'ON'},
    {title: 'FAN_MODE', value: 'Auto'},
    {title: 'FAN_HIGH_TEMP', value: '25*C'},
    {title: 'FAN_LOW_TEMP', value: '20*C'},
    {title: 'LANIP', value: '10.100.100.87'},
    {title: 'WIFIIP', value: '127.0.0.1'},
    {title: 'WIFISSID', value: ''},
    //{title: 'RELAY_COUNT', value: ''},
    //{title: 'CHAME_OUT', value: ''},
];

const DeviceInfo = (props) =>{
    const {theme} = useContext(ThemeContext);
    const [deviceInfo, setDeviceInfo] = useState(test_device_info);

    const {
        //deviceInfo = {},
        route
    } = props;

    const {
        host='192.168.1.204',
        port= 12345,
    } = route.params;
        
    const test_device_info_icons = {
        "Name": (<NameIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'SN': (<SNIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'VER': (<VersionIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'RELEASE_DATE': (<ReleaseDateIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'SYSTIME': (<SystimeIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'UPTIME': (<UptimeIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'CPUTEMP': (<CputempIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'SYSTEMP': (<InternaltempIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'FAN_STATUS': (<FanIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'FAN_MODE': (<FanIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'FAN_HIGH_TEMP': (<HightempIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'FAN_LOW_TEMP': (<LowtempIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'LANIP': (<LanIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'LANMAC': (<LanIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'WIFIIP': (<WifiIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'WIFIMAC': (<WifiIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
        'WIFISSID': (<WifiIcon width={24} height={24} fill={theme.COLORS.APP_GREY} />),
    };

    const {
        Name,
        SN,
        LANMAC,
        WIFIMAC,
        APP_NAME,
        VER,
        RELEASE_DATE,
        SYSTEMP,
        CPUTEMP,
        SYSTIME,
        UPTIME,
        FAN_STATUS,
        FAN_MODE,
        FAN_HIGH_TEMP,
        FAN_LOW_TEMP,
        LANIP,
        WIFIIP,
        WIFISSID,
        RELAY_COUNT,
        CHAME_OUT,
    } = test_device_info;


 
    const RenderItem = ({item, index}) => {
        return (
            <View style={styles(theme).card}>
                <View style={styles(theme).card_header}>
                    {test_device_info_icons[item.title]}
                    <Text style={styles(theme).item_text}>{item.title}</Text>
                </View>
                <Text style={styles(theme).item_value}>{item.value}</Text>
            </View>
        );
    }

    const headerMyPDUComponent =() => {
        return null;
    }

    return (
        <VirtualizedList style={styles(theme).container}>
            <View style={styles(theme).control_panel}>
                {/** Shutdown Device */}
                <Ripple style={styles(theme).action_button}>
                    <ShutdownIcon fill={theme.COLORS.APPBAR_BLUE} width="48" height="48" />
                    <Text style={styles(theme).action_title}>Shutdown System</Text>
                </Ripple>

                {/** Reset Device */}
                <Ripple style={styles(theme).action_button}>
                    <ResetIcon fill={theme.COLORS.APPBAR_BLUE} width="48" height="48" />
                    <Text style={styles(theme).action_title}>Reset System</Text>
                </Ripple>

                {/** Reboot device */}
                <Ripple style={styles(theme).action_button}>
                    <RebootIcon fill={theme.COLORS.APPBAR_BLUE} width="48" height="48" />
                    <Text style={styles(theme).action_title}>Reboot System</Text>
                </Ripple>

                {/** Web Access */}
                <Ripple
                    onPress={()=>{
                        Linking.openURL(`http://${host}`)
                    }}
                    style={styles(theme).action_button}
                >
                    <WebIcon fill={theme.COLORS.APPBAR_BLUE} width="48" height="48" />
                    <Text style={styles(theme).action_title}>Web Access</Text>
                </Ripple>

            </View>
            {/* <Text>{message}</Text>
            <Ripple
                onPress={()=>{
                    tcpClient.write('hellow !!!' + Date.now());
                }}

            >
                <Text>Press me</Text>
            </Ripple> */}
            <FlatList
                data={deviceInfo}
                renderItem={RenderItem}
                keyExtractor={(item, index) => `${index}`}
                ItemSeparatorComponent={() => <View style={styles(theme).border} />}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={headerMyPDUComponent}
            />
        </VirtualizedList>
    );
}

const styles = theme => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.APP_BG,
    },
    card: {
        borderRadius: 0,
        borderColor: theme.COLORS.BORDER_ITEM,
        borderWidth: 0,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: theme.COLORS.WHITE,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card_header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_text: {
        fontSize: 16,
        color: theme.COLORS.BLACK,
        marginLeft: 10,
    },
    item_value: {
        fontSize: 16,
        color: theme.COLORS.APP_GREY
    },
    icon: {
        width: 24, height: 24
    },
    border: {
        height: 1,
        backgroundColor: theme.COLORS.BORDER_ITEM
    },
    control_panel: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: theme.COLORS.WHITE,
        marginBottom: 30,
    },
    action_button: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,

    },
    action_title: {
        fontSize: 14,

    }


});

export default DeviceInfo;