import React, {useContext, useEffect, useState} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from '../components/Ripple';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../components/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

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
    const navigation = useNavigation();

    const {theme} = useContext(ThemeContext);
    const [pduList, setPduList] = useState(test_pdu_list);

    const navigateToDeviceInfo = () => {
        navigation.navigate("DeviceInfo");
    }

    const PDUItem = ({item, index}) => {
        return (
            <View style={styles(theme).itemContainer}>
                <View>
                    <Text style={styles(theme).item_title_text}>{item.PDUName}</Text>
                    <Text style={styles(theme).item_title_text}>{item.IP}</Text>
                    <Text style={styles(theme).item_title_text}>{item.Port}</Text>
                </View>
                <Text style={styles(theme).item_title_text}>{item.Autoload}</Text>
                <View>
                    <Ripple
                        onPress={() => navigateToDeviceInfo()}
                    >
                        <MaterialIcons name='info-outline' size={24} color={'white'} />
                    </Ripple>
                </View>
            </View>
        );
    }


    return (
        <View style={styles(theme).container}>
            <FlatList
                style={{
                    marginTop: 20,
                }}
                data={pduList}
                keyExtractor={(item, index) => `${index}`}
                renderItem={PDUItem}
                ItemSeparatorComponent={() => <View style={{height: 20}} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = theme => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.App_COLOR_3,
        paddingHorizontal: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 12,
        borderColor: theme.COLORS.BORDER_ITEM,
        borderWidth: 1,
        paddingVertical: 18,
        paddingHorizontal: 18,
    },
    item_title: {
        width: '50%',
        textAlign: 'center',
    },
    item_title_text: {
        fontSize: 16,
        color: theme.COLORS.WHITE,
    },
});

export default PDUList;