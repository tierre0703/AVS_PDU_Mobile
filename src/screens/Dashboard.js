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
    const [pduList, setPduList] = useState(test_pdu_data);
    const [pduButtonList, setPduButtonList] = useState(test_pdu_button_data);

    const [selectedDevice, setSelectedDevice] = useState(null);


    const PduItem = ({index, item}) => {
        const {
            ID = 0, 
            status= 'active', // active, disable
        } = item;
        const isActive = status === 'active';
        const itemName = `Output_${index}`;
        return (
            <View
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
            </View>
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



    return (
        <View style={styles(theme).container}>
            {/* <View style={styles(theme).pdu_panel}>
                <Text style={styles(theme).pdu_title}>{'PDU_UNIT_1'}</Text>
                <Text style={styles(theme).pdu_title}>{'PDU STATS'}</Text>
            </View> */}
            <SelectBox
                options={pduList}
                value={selectedDevice}
                select={setSelectedDevice}
            />
            <FlatList
                style={{
                    marginTop: 20,
                }}
                data={pduButtonList}
                keyExtractor={(item, index) => `${index}`}
                renderItem={PduItem}
                ItemSeparatorComponent={() => <View style={{height: 20}} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = theme => StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: theme.App_COLOR_3
    },
    pdu_panel: {
        backgroundColor: theme.COLORS.DARK_BLUE_80P,
        borderRadius: 12,
        padding: 20,
        height: 180,
        marginBottom: 30,
    },
    pdu_place_holder: {
        fontSize: 15,

    },
    pdu_title: {
        fontWeight: '700',
        fontSize: 16,
        fontFamily: fontFamilies.Rogan,
        color: theme.COLORS.WHITE,
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
    item_btn_container: {
        padding: 10,
    },
    border: {
        height: 1,
        width: '100%',
        marginBottom: 3,
        backgroundColor: theme.COLORS.WHITE,
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
});

export default Dashboard;