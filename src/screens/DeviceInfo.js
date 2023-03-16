import React, {useEffect, useContext} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
} from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import NameIcon from '../assets/ico_name.svg';
import SNIcon from '../assets/ico_sn.svg';
import VersionIcon from '../assets/ico_version.svg';
import ReleaseDateIcon from '../assets/ico_releasedate.svg';

const test_device_info_icons = {
    "Name": (<NameIcon width={24} height={24} />),
    'SN': (<SNIcon width={24} height={24} />),
    'Version': (<VersionIcon width={24} height={24} />),
    'ReleaseDate': (<ReleaseDateIcon width={24} height={24} />),
    /* 'Name': (<FontAwesomeIcons name='id-card-o' color={'white'} />),
    'SN': (<></>),
    'FAN': (<MaterialCommunityIcons name='fan' color={'white'} />),
    'FAN_HIGH_TEMP': (<MaterialCommunityIcons name='thermometer-high' color={'white'} />),
    'FAN_LOW_TEMP': (<MaterialCommunityIcons name='thermometer-low' color={'white'} />),
    'LAN': (<MaterialCommunityIcons name='ethernet' color={'white'} />),
    'WIFI': (<EntypoIcons name='signal' color={'white'} />), */


};
const test_device_info = {
    Name: 'Soleux PDU',
    SN: '02c0018115a3a72d',
    LANMAC: '02:81:15:a3:a7:2d',
    WIFIMAC: '02:81:15:a3:a7:2d',
    APP_NAME: '',
    VER: '1.6 Build:6',
    RELEASE_DATE: '14.05.2022',
    SYSTEMP: '24.187*C',
    CPUTEMP: '27.98*C',
    SYSTIME: '2023/02/23 12:08:32',
    UPTIME: '5 days, 19 hours, 9 minutes',
    FAN_STATUS: 'ON',
    FAN_MODE: 'Auto',
    FAN_HIGH_TEMP: '25*C',
    FAN_LOW_TEMP: '20*C',
    LANIP: '10.100.100.87',
    WIFIIP: '127.0.0.1',
    WIFISSID: '',
    RELAY_COUNT: '',
    CHAME_OUT: '',
};

const DeviceInfo = (props) =>{
    const {theme} = useContext(ThemeContext);

    const {
        //deviceInfo = {},
    } = props;

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

    

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles(theme).container}>
                <View style={styles(theme).card}>
                    <View style={styles(theme).card_header}>
                        {test_device_info_icons["Name"]}
                        <Text style={styles(theme).item_text}>{'Name:'}</Text>
                    </View>
                    <Text style={styles(theme).item_value}>{Name}</Text>
                </View>
                <View style={styles(theme).card}>
                    <View style={styles(theme).card_header}>
                        {test_device_info_icons["SN"]}
                        <Text style={styles(theme).item_text}>{'Serial No:'}</Text>
                    </View>
                    <Text style={styles(theme).item_value}>{SN}</Text>
                </View>
                <View style={styles(theme).card}>
                    <View style={styles(theme).card_header}>
                        {test_device_info_icons["Version"]}
                        <Text style={styles(theme).item_text}>{'Version:'}</Text>
                    </View>
                    <Text style={styles(theme).item_value}>{VER}</Text>
                </View>
                <View style={styles(theme).card}>
                    <View style={styles(theme).card_header}>
                        {test_device_info_icons["ReleaseDate"]}
                        <Text style={styles(theme).item_text}>{'Release Date:'}</Text>
                    </View>
                    <Text style={styles(theme).item_value}>{RELEASE_DATE}</Text>
                </View>
                <View style={styles(theme).card}>
                    <Text style={styles(theme).item_text}>{'System Time:'}</Text>
                    <Text style={styles(theme).item_value}>{SYSTIME}</Text>
                </View>
                <View style={styles(theme).card}>
                    <Text style={styles(theme).item_text}>{'Up Time:'}</Text>
                    <Text style={styles(theme).item_value}>{UPTIME}</Text>
                </View>
                <View style={styles(theme).card}>
                    <Text style={styles(theme).item_text}>{'CPU Temp:'}</Text>
                    <Text style={styles(theme).item_value}>{CPUTEMP}</Text>
                </View>
                <View style={styles(theme).card}>
                    <Text style={styles(theme).item_text}>{'Internal Temp:'}</Text>
                    <Text style={styles(theme).item_value}>{SYSTEMP}</Text>
                </View>
                <View style={styles(theme).card}>
                    <Text style={styles(theme).item_text}>{'Fan Status:'}</Text>
                    <Text style={styles(theme).item_value}>{FAN_STATUS}</Text>
                </View>
                <View style={styles(theme).card}>
                    <Text style={styles(theme).item_text}>{'Fan Mode:'}</Text>
                    <Text style={styles(theme).item_value}>{FAN_MODE}</Text>
                </View>
                <View style={styles(theme).card}>
                    <Text style={styles(theme).item_text}>{'High Temp:'}</Text>
                    <Text style={styles(theme).item_value}>{FAN_HIGH_TEMP}</Text>
                </View>
                <View style={styles(theme).card}>
                    <Text style={styles(theme).item_text}>{'Low Temp:'}</Text>
                    <Text style={styles(theme).item_value}>{FAN_LOW_TEMP}</Text>
                </View>
                <View style={styles(theme).card}>
                    <Text style={styles(theme).item_text}>{'LAN MAC ID:'}</Text>
                    <Text style={styles(theme).item_value}>{LANMAC}</Text>
                </View>
                <View style={styles(theme).card}>
                    <Text style={styles(theme).item_text}>{'LAN IP:'}</Text>
                    <Text style={styles(theme).item_value}>{LANIP}</Text>
                </View>
                <View style={styles(theme).card}>
                    <Text style={styles(theme).item_text}>{'WIFI MAC ID:'}</Text>
                    <Text style={styles(theme).item_value}>{WIFIMAC}</Text>
                </View>
                <View style={styles(theme).card}>
                    <Text style={styles(theme).item_text}>{'WIFI IP:'}</Text>
                    <Text style={styles(theme).item_value}>{WIFIIP}</Text>
                </View>
                <View style={styles(theme).card}>
                    <Text style={styles(theme).item_text}>{'WIFI SSID:'}</Text>
                    <Text style={styles(theme).item_value}>{WIFISSID}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = theme => StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        borderColor: theme.COLORS.BORDER_ITEM,
        borderWidth: 0,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: theme.COLORS.DEFAULT_DARKBLUE,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card_header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_text: {
        fontSize: 16,
        color: theme.COLORS.WHITE,
        marginLeft: 10,
    },
    item_value: {
        fontSize: 16,
        color: theme.COLORS.WHITE
    },
    icon: {
        width: 24, height: 24
    }

});

export default DeviceInfo;