import React, {useContext, useEffect, useState} from 'react';
import {Text, Image, View, StyleSheet, Alert} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
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
import RenewIcon from '../assets/ico_renew.svg';
import PDUEditModal from '../components/PDUEditModal';
import { useDiscoveryServerContext } from '../services/PDUServerProvider';
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
    const discoveryContext = useDiscoveryServerContext();
    const {
        discoveredPDUs,
        requestDiscoverPDUs,
        localNetworkAddresses
    } = useDiscoveryServerContext();

    const [modalSettings, setModalSettings] = useState({show: false});

    useEffect(()=>{
        console.log(discoveredPDUs);
    }, [discoveredPDUs]);

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

    const addItem = async () => {
        setModalSettings({
            show: true,
            type: 'add',
        });
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

    const closeModal = () => {
        setModalSettings({
            show: false,
        });
    }

    const PDUItem = ({item, index}) => {

        return (
            <Ripple style={styles(theme).itemContainer}>
                <View>
                    <Text style={styles(theme).item_title_text}>{item.PDUName}</Text>
                    <Text style={styles(theme).item_property_text}>{`${item.host}:${item.port}`}</Text>
                </View>
                <Text style={styles(theme).item_title_text}>{item.Autoload}</Text>
                <View>
                    <Ripple
                        onPress={() => editItem(item, index)}
                    >
                        <EditIcon width={32} height={32} fill={theme.COLORS.APP_GREY} />
                    </Ripple>
                    <Ripple
                        style={{
                            marginTop: 10,
                        }}
                        onPress={() => deleteItem(item, index)}
                    >
                        <DeleteIcon width={32} height={32} fill={theme.COLORS.APP_GREY} />
                    </Ripple>
                </View>
            </Ripple>
        );
    }

    
    const PDUNetworkItem = ({item, index}) => {

        return (
            <Ripple style={styles(theme).itemContainer}>
                <View>
                    <Text style={styles(theme).item_title_text}>{item.PDUName}</Text>
                    <Text style={styles(theme).item_property_text}>{`${item.host}:${item.port}`}</Text>
                </View>
                <Text style={styles(theme).item_title_text}>{item.Autoload}</Text>
                <View>
                    <Ripple
                        onPress={() => editItem(item, index)}
                    >
                        <EditIcon width={32} height={32} fill={theme.COLORS.APP_GREY} />
                    </Ripple>
                    <Ripple
                        style={{
                            marginTop: 10,
                        }}
                        onPress={() => deleteItem(item, index)}
                    >
                        <DeleteIcon width={32} height={32} fill={theme.COLORS.APP_GREY} />
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

    const VirtualizedList = ({children}) => {
        return (
            <FlatList
                style={styles(theme).container}
                data={[]}
                keyExtractor={() => "key"}
                renderItem={null}
                ListHeaderComponent={
                    <>{children}</>
                }
            />
        )
    }

    const headerMyPDUComponent = () => {
        return (
            <>
                <View style={styles(theme).headerList}>
                    <Text style={styles(theme).headerTitle}>My PDUs</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Ripple onPress={addItem}>
                            <MaterialIcons name='add' size={28} color={theme.COLORS.APPBAR_BLUE} />
                        </Ripple>
                        {/* <Ripple>
                            <RenewIcon width="24" height="24" fill={theme.COLORS.APPBAR_BLUE} />
                        </Ripple> */}
                    </View>
                </View>
                <View style={styles(theme).border} />
            </>
        );
    }

    const headerNetworkComponent = () => {
        return (
        <>
            <View style={styles(theme).headerList}>
                <Text style={styles(theme).headerTitle}>PDUs found on Network</Text>
                <Ripple onPress={
                    ()=>{
                        requestDiscoverPDUs(localNetworkAddresses);
                    }
                }>
                    <RenewIcon width="24" height="24" fill={theme.COLORS.APPBAR_BLUE} />
                </Ripple>
            </View>
            <View style={styles(theme).border} />
        </>
        );
    }

    return (
        <VirtualizedList>
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
                        marginTop: 5,
                    }}
                    data={pduList}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={PDUItem}
                    ItemSeparatorComponent={() => <View style={{height: 1}} />}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={headerMyPDUComponent}
                />
                {/** network devices */}
                <FlatList
                    style={{
                        marginTop: 30,
                    }}
                    data={discoveredPDUs}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={PDUNetworkItem}
                    ItemSeparatorComponent={() => <View style={styles(theme).border} />}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={headerNetworkComponent}
                />
               
            </View>
            <PDUEditModal {...modalSettings} closeModal={closeModal} />
        </VirtualizedList>
    );
}

const styles = theme => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.APP_BG,
    },
    headerList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 18,
        paddingHorizontal: 18,
        backgroundColor: theme.COLORS.APP_BG_PANEL,
    },

    border: {
        width: '100%',
        height: 1,
        backgroundColor: theme.COLORS.APP_BG,
    },

    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.COLORS.BLACK,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 0,
        backgroundColor: theme.COLORS.APP_BG_PANEL,
        borderColor: theme.COLORS.BORDER_ITEM,
        borderWidth: 0,
        paddingVertical: 18,
        paddingHorizontal: 18,
    },
    item_title: {
        width: '50%',
        textAlign: 'center',

    },
    item_title_text: {
        fontSize: 16,
        color: theme.COLORS.BLACK,
    },
    item_property_text: {
        fontSize: 14,
        color: theme.COLORS.APP_GREY

    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default PDUList;