import React, {useContext, useEffect, useState} from 'react';
import {Text, Image, View, StyleSheet, Alert} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from '../components/Ripple';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { ThemeContext } from '../components/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

import DeleteIcon from '../assets/ico_delete.svg';
import EditIcon from '../assets/ico_edit.svg';
import { useStateValue } from '../services/State/State';
import { actions } from '../services/State/Reducer';
import { savePDUSettings } from '../services/DataManager';
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
    const [{pduListSettings}, dispatch] = useStateValue();

    const {
        nextId = 0,
        pduList = []

    } = pduListSettings;

    const {theme} = useContext(ThemeContext);

    const navigateToDeviceInfo = () => {
        navigation.navigate("DeviceInfo");
    }
    const deleteItem = async (item, index) => {
        Alert.alert(
            "Notice",
            "Do you really delete this item?",
            [
                {
                    text: 'Cancel',
                    onPress: ()=>{},
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: async () => {

                        const filtered_list = pduList.filter(ele=>ele.ID !== item.ID);
                        const saveData = {
                            nextId: pduList.nextId,
                            pduList: filtered_list
                        };

                        await savePDUSettings(saveData);
                        dispatch({
                            type: actions.SET_PDULIST,
                            pduListSettings: saveData,
                        });
                    }
                }
            ]
            );

    }

    const editItem = async (item, index) => {
        dispatch({
            type: actions.SET_MODALSETTING,
            modalSetting: {
                show: true,
                type: 'edit',
                item: item,
                index: index,
            }
        });

    }

    const PDUItem = ({item, index}) => {

        return (
            <Ripple style={styles(theme).itemContainer}>
                <View>
                    <Text style={styles(theme).item_title_text}>{item.PDUName}</Text>
                    <Text style={styles(theme).item_title_text}>{item.host}</Text>
                    <Text style={styles(theme).item_title_text}>{item.port}</Text>
                </View>
                <Text style={styles(theme).item_title_text}>{item.Autoload}</Text>
                <View>
                    <Ripple
                        onPress={() => editItem(item, index)}
                    >
                        <EditIcon width={32} height={32} />
                    </Ripple>
                    <Ripple
                        style={{
                            marginTop: 10,
                        }}
                        onPress={() => deleteItem(item, index)}
                    >
                        <DeleteIcon width={32} height={32} />
                    </Ripple>
                </View>
            </Ripple>
        );
    }

    const Tab = (props) => {
        return (
        <>
        </>
        );
    }

    const onTabChange = (props) => {

    }


    return (
        <View style={styles(theme).container}>
           {/*  <View style={styles(theme).tabs}>
                <Tab
                    setTab={onTabChange}
                    title="My PDUs"
                />
                <Tab
                    setTab={onTabChange}
                    title="PDUs"
                />
            </View> */}
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
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default PDUList;