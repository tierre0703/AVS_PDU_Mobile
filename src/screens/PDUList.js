import React, {useContext, useEffect} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';

const test_pdu_list = [
    {
        IP: '192.168.1.100',
        Port: 8982,
        ID: 1,
        PDUName: 'PDU Unit 1',
        Autoload: false,
    },
    {
        IP: '192.168.1.101',
        Port: 8982,
        ID: 2,
        PDUName: 'PDU Unit 2',
        Autoload: false,
    },
    {
        IP: '192.168.1.100',
        Port: 8982,
        ID: 3,
        PDUName: 'PDU Unit 3',
        Autoload: false,
    },
];

const PDUList = (props) => {
    const {theme} = useContext(ThemeContext);
    return (
        <View style={styles(theme).container}></View>
    );
}

const styles = theme => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.App_COLOR_3
    }
});

export default PDUList;