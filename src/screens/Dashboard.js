import React, {useContext, useEffect, useState} from 'react';
import {Text, Image, View, StyleSheet, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from '../components/Ripple';
import { ThemeContext } from '../components/ThemeProvider';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { fontFamilies } from '../utils/FontFamilies';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../services/State/State';
import { VirtualizedList } from '../components/VirtualizedList';
import { usePDUSocketContext } from '../services/PDUSocketProvider';
import { OnlineStatus } from '../components/OnlineStatus';
const test_pdu_data = [
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

const test_pdu_button_data = [
    {status: 'active'},
    {status: 'disabled'},
    {status: 'active'},
    {status: 'disabled'},
    {status: 'active'},
    {status: 'disabled'},
    {status: 'active'},
    {status: 'disabled'},
    {status: 'active'},
    {status: 'disabled'},
    {status: 'active'},
    {status: 'disabled'},
];

const Dashboard = (props) => {
    const {theme} = useContext(ThemeContext);
    const [{pduListSettings}, dispatch] = useStateValue();

    const {

    } = usePDUSocketContext();


    const {pduList=[]} = pduListSettings;

    //const [pduList, setPduList] = useState(test_pdu_data);
    const [pduButtonList, setPduButtonList] = useState(test_pdu_button_data);
    const navigation = useNavigation();

    const [selectedDevice, setSelectedDevice] = useState(null);


    const PduItem = ({index, item}) => {
        const {
            ID = 0, 
            status= 'active', // active, disable
        } = item;
        const isActive = status === 'active';
        const itemName = `Output_${index}`;
        return (
            <Ripple
                style={styles(theme).itemContainer}
            >
                <View
                    style={styles(theme).item_title}
                >
                    <Text
                        style={styles(theme).item_title_text}
                    >{itemName}</Text>
                </View>
                <LinearGradient
                        end={{x: 1, y: 0.5}}
                        start={{x: 0, y: .5}}
                        colors={status === 'active' ? theme.COLORS.BTN_ACTIVE : theme.COLORS.BTN_DISABLE}
                        style={styles(theme).btn_container}
                    >
                    <Ripple
                        style={styles(theme).item_btn_container}
                    >
                        <View style={styles(theme).btn_content}>
                            <Text style={{
                                ...styles(theme).btn_text,
                                color: isActive? theme.COLORS.WHITE : theme.COLORS.TEXT_DISABLE
                            }}>{status === 'active' ? 'Active' : 'Disabled'}</Text>
                            <View style={{
                                ...styles(theme).border,
                                backgroundColor: isActive ? theme.COLORS.WHITE : theme.COLORS.TEXT_DISABLE
                            }} />
                            <IonIcons
                                name='power'
                                size={24}
                                color={isActive ? theme.COLORS.WHITE : theme.COLORS.TEXT_DISABLE}
                            />
                        </View>
                    </Ripple>
                </LinearGradient>
                <LinearGradient
                        end={{x: 1, y: 0.5}}
                        start={{x: 0, y: .5}}
                        colors={theme.COLORS.BTN_RESTART}
                        style={styles(theme).btn_container}
                    >
                <Ripple
                    style={styles(theme).item_btn_container}
                >
                    
                        <View style={styles(theme).btn_content}>
                            <Text style={{
                                ...styles(theme).btn_text,
                                color: theme.COLORS.WHITE
                            }}>{'Restart'}</Text>
                            <View style={{
                                ...styles(theme).border,
                                backgroundColor: theme.COLORS.WHITE
                            }} />
                            <FontAwesome5Icon
                                name='redo'
                                size={22}
                                color={theme.COLORS.WHITE}
                            />
                        </View>
                    
                </Ripple>
                </LinearGradient>
            </Ripple>
        );
    }

    useEffect(()=>{
        if(!selectedDevice){
            setSelectedDevice(pduList[0]);
        }
    }, []);

    const SelectBox = ({options, value, select}) => {

        const {
            PDUName=''
        } = value || {};

        return (
            <Menu
                renderer={renderers.Popover}
                rendererProps={{anchorStyle: {backgroundColor: 'transparent'}}}>
            <MenuTrigger
                customStyles={{triggerOuterWrapper: styles(theme).menuButtonOuter}}>
                <View style={styles(theme).menuBox}>
                <Text style={styles(theme).menuText}>{PDUName}</Text>
                <EntypoIcon
                    size={20}
                    name="chevron-down"
                    color={theme.COLORS.WHITE}
                />
                </View>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles(theme).menuButtonOuter}>
                {options.map((item, index) => (
                <MenuOption
                    key={index}
                    style={styles(theme).menuOption}
                    onSelect={()=>select(item)}>
                    <View style={styles(theme).menuBox}>
                        <Text style={styles(theme).menuText}>
                            {item.PDUName}
                        </Text>
                        {item.PDUName === PDUName && (
                            <EntypoIcon
                                size={20}
                                name="chevron-up"
                                color={theme.COLORS.WHITE}
                            />
                        )}
                    </View>
                </MenuOption>
                ))}
            </MenuOptions>
            </Menu>
        );
    }

    const navigateToDeviceInfo = (host, port) => {
        console.log(host, port);
        navigation.navigate("DeviceInfo", {
            host: host,
            port: port
        });
    }

    const RenderPDU = ({item, index}) => {
        const isSelected = selectedDevice &&(item.ID === selectedDevice.ID);

        return (
            <Ripple
                style={isSelected ? styles(theme).pdu_container_selected : styles(theme).pdu_container}
                onPress={() => {setSelectedDevice(item)}}
            >
                <View style={styles(theme).pdu_panel}>
                    <View>
                        <Text style={styles(theme).pdu_title}>{item.PDUName}</Text>
                        <Text style={styles(theme).pdu_desc}>{`${item.host}:${item.port}`}</Text>
                    </View>
                    <View style={{marginLeft: 20}}>
                        <OnlineStatus />
                    </View>
                </View>
                {/* <View>
                    <Ripple
                        onPress={() => navigateToDeviceInfo(item.host, item.port)}
                    >
                        <MaterialIcons name='info-outline' size={24} color={theme.COLORS.APPBAR_BLUE} />
                    </Ripple>
                </View> */}
               <Ripple
                    onPress={() => navigateToDeviceInfo(item.host, item.port)}
                    //onPress={() => {setSelectedDevice(item)}}
                    style={styles(theme).btn_select_container}
                >
                    <Text style={styles(theme).btn}>{'Details'}</Text>
                </Ripple>
            </Ripple>
            
        );
    }

    const onScrollEnd = (e) => {
        //let pageNumber = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / Dimensions.get('screen').width), 0), pduList.length);
        //console.log(pageNumber); 
    }

    const HeaderPDUList = (props) => {
        return (
            <>
                <View style={styles(theme).headerList}>
                    <Text style={styles(theme).headerTitle}>PDUs</Text>
                {/*  <Ripple>
                        <RenewIcon width="24" height="24" fill={theme.COLORS.APPBAR_BLUE} />
                    </Ripple> */}
                </View>
            </>
        );
    }


    return (
        <VirtualizedList style={styles(theme).container}>
            
            <View style={styles(theme).main_panel}>
                <HeaderPDUList />
                <View style={styles(theme).border} />
                <FlatList
                    onMomentumScrollEnd={onScrollEnd}
                    horizontal
                    //pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    data={pduList}
                    renderItem={RenderPDU}
                    keyExtractor={(item, index) => `pdu_${index}`}
                    ItemSeparatorComponent={() => <View style={{width: 5}} />}
                    style={{
                        paddingVertical: 20,
                        marginHorizontal: 20,
                        minHeight: 160,
                    }}
                />
            </View>
            
           {/*  <SelectBox
                options={pduList}
                value={selectedDevice}
                select={setSelectedDevice}
            /> */}
            <FlatList
                style={{
                    marginTop: 5,
                    marginBottom: 5,
                }}
                data={pduButtonList}
                keyExtractor={(item, index) => `${index}`}
                renderItem={PduItem}
                ItemSeparatorComponent={() => <View style={{height: 2}} />}
                showsVerticalScrollIndicator={false}
            />
        </VirtualizedList>
    );
}

const styles = theme => StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.COLORS.APP_BG,
    },
    list_container: {
    },
    main_panel: {
        marginTop: 5,
        backgroundColor: theme.COLORS.WHITE,
        //backgroundColor: theme.COLORS.APP_BG_PANEL,

    },
    pdu_container: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: theme.COLORS.BORDER_ITEM,
        borderWidth: 1,
        borderRadius: 8,
        padding: 20,
    },

    pdu_container_selected: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: theme.COLORS.APPBAR_BLUE,
        borderWidth: 1,
        borderRadius: 8,
        padding: 20,
    },

    pdu_panel: {
        //backgroundColor: theme.COLORS.DARK_BLUE_80P,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: theme.COLORS.BORDER_ITEM,
        borderWidth: 0,
        borderRadius: 8,
        minHeight: 160,
        marginHorizontal: 5,
    },
    pdu_place_holder: {
        fontSize: 15,

    },
    pdu_title: {
        fontWeight: '500',
        fontSize: 16,
        fontFamily: fontFamilies.Rogan,
        color: theme.dark? theme.COLORS.WHITE: theme.COLORS.BLACK,
    },
    pdu_desc: {

    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderColor: theme.COLORS.BORDER_ITEM,
        borderWidth: 0,
        paddingVertical: 18,
        paddingHorizontal: 18,
        backgroundColor: theme.COLORS.APP_BG_PANEL,

    },
    item_title: {
        width: '50%',
        textAlign: 'center',
    },
    item_title_text: {
        fontSize: 16,
        color: theme.dark? theme.COLORS.WHITE: theme.COLORS.BLACK,
    },
    item_btn_container: {
        height: '100%',
        padding: 10,
        borderRadius: 20,
    },
    border: {
        height: 1,
        width: '100%',
        backgroundColor: theme.COLORS.APP_BG,
    },
    btn_container: {
        width: 75,
        height: 70,
        borderRadius: 20,
    },
    btn_text: {
        color: theme.COLORS.WHITE,
    },
    btn_content: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    
    menuBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        width: Dimensions.get('window').width - 40
    },
    menuText: {
        fontFamily: fontFamilies.Rogan,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
        color: 'white',
        textTransform: 'none'
    },
    menuButtonOuter: {
        backgroundColor: theme.COLORS.DARK_BLUE,
        width: Dimensions.get('window').width - 40,
        borderRadius: 8,
        marginTop: 4,
    },
    menuOption: {
    //    width: '100%'
    },
    headerList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 18,
        paddingHorizontal: 18,
        backgroundColor: theme.COLORS.APP_BG_PANEL,
    },

    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.COLORS.BLACK,
    },
    btn_select_container: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.COLORS.APPBAR_BLUE,
        width: '60%'

    },
    btn: {
        color: theme.COLORS.APPBAR_BLUE,
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: 5,

    }
});

export default Dashboard;