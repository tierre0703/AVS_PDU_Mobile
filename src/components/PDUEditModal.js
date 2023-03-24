import React, {useState, useEffect, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Modal,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    ScrollView,
} from 'react-native';
import { useStateValue } from '../services/State/State';
import { fontFamilies } from '../utils/FontFamilies';
import Ripple from './Ripple';
import { ThemeContext } from './ThemeProvider';
import { actions } from '../services/State/Reducer';
import { savePDUSettings } from '../services/DataManager';

const PDUEditModal = (props) => {


    const {t} = useTranslation();

    const {theme} = useContext(ThemeContext);
    const [{pduListSettings}, dispatch] = useStateValue();
    
    const {
        show=false,
        type='add', //add | edit
        item={},
        index = 0,
        closeModal = ()=>{},
        onSave = () => {}
    } = props || {};


    const {
        pduList = [],
        nextId = 0,
    } = pduListSettings;

    const [host, setHost] = useState('');
    const [port, setPort] = useState('');
    const [PDUName, setPDUName] = useState('');
    const [autoload, setAutoload] = useState(false);


    useEffect(()=>{
        if(type === 'edit'){
            setHost(item.host || '');
            setPort(item.port || '');
            setPDUName(item.PDUName || '');
            setAutoload(item.autoload || false);
        }

    }, [type, item]);

    const addItem = async () => {
        // validation
        if(host === ''){
            Alert.alert('Error', 'PDU Host field cannot be empty!');
            return;
        }

        if(port === ''){
            Alert.alert('Error', 'PDU Port field cannot be empty!');
            return;
        }

        if(PDUName === '') {
            Alert.alert('Error', 'PDU Name field cannot be empty!');
            return;
        }

        if(pduList.findIndex(item=>item.PDUName === PDUName && item.host === host) > -1){
            Alert.alert(
                'Notice',
                'Same PDU is already registered.',
                [{
                    type: 'cancel',
                    title: 'Cancel',
                    onPress: ()=>{}
                }]
            );
        }else{
            const saveData = {
                nextId: nextId + 1,
                pduList: [...pduList, {
                    ID: nextId + 1,
                    PDUName: PDUName,
                    port: port,
                    host: host,
                    autoload: autoload
                }]
            };

           //onSave(saveData);

            await savePDUSettings(saveData);

            dispatch({
                type: actions.SET_PDULIST,
                pduListSettings: saveData
            });

            closeModal();

        }
    }

    const editItem = async () => {
        // validation
        if(host === ''){
            Alert.alert('Error', 'PDU Host field cannot be empty!');
            return;
        }

        if(port === ''){
            Alert.alert('Error', 'PDU Port field cannot be empty!');
            return;
        }

        if(PDUName === '') {
            Alert.alert('Error', 'PDU Name field cannot be empty!');
            return;
        }

        const savePduList = pduListSettings.pduList.filter(ele=>ele.PDUName).map((ele, idx) => {
            if(ele.ID === item.ID) {
                return {
                    ...ele,
                    host: host,
                    port: port,
                    PDUName: PDUName,
                    autoload: autoload
                };
            }
            return ele;
        })

        const saveData = {
            nextId: pduListSettings.nextId,
            pduList: savePduList,
        };

        await savePDUSettings(saveData);

        dispatch({
            type: actions.SET_PDULIST,
            pduListSettings: saveData,
        });

        closeModal();

    }


    const InputBox = (props) => {
      
        const {
          title='',
          value='',
          style={},
          titleStyle={},
          keyboardType='default',
          placeholder='',
          placeholderTextColor=theme.COLORS.WHITE_OPACITY_40P,
          setValue=()=>{},
          saveValue=()=>{}
        } = props;
  
        const [textValue, setTextValue] = useState(value);
        const handleKeyDown = (e) => {
            if (e.nativeEvent.key === 'Enter') {
                saveValue(textValue);
            }
        }
    
    
        return (
          <View style={{
            borderRadius: 8,
            paddingHorizontal: 14,
            paddingTop: 11,
            paddingBottom: 5,
            marginVertical: 5,
            backgroundColor: theme.dark? theme.COLORS.DEFAULT_DARKBLUE : theme.COLORS.QUESTIONCARD_BG
            ,...style}}>
            <Text
              style={{
                fontFamily: fontFamilies.Rogan,
                fontWeight: '500',
                color: theme.dark ? theme.COLORS.WHITE : theme.COLORS.APP_GREY,
                fontSize:14,
                lineHeight: 16,
                ...titleStyle}}
            >{title}</Text>
            <TextInput
              keyboardType={keyboardType}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              style={{
                fontSize: 15,
                lineHeight: 18,
                fontFamily: fontFamilies.Rogan,
                fontWeight: '500',
                color: theme.dark ? theme.COLORS.TEXT_GREY: theme.COLORS.BLACK,
           
              }}
              value={textValue}
              onChangeText={(text)=>{
                setTextValue(text);
              }}
              onKeyPress={handleKeyDown}
              onBlur={()=>saveValue(textValue)}
            />
          </View>
        );
    }

    const RadioButton = ({checked, onCheckChange}) => {
        return (
            <Ripple style={checked? styles(theme).radioButtonChecked: styles(theme).radioButton} onPress={() => onCheckChange(!checked)}>
            </Ripple>
        );
    };

    const saveProc = () => {
        if(type === 'add') {
            addItem();
        }else if (type === 'edit') {
            editItem();
        }

        
    }


    return (
        <Modal
            transparent
            animationType='slide'
            statusBarTranslucent
            visible={show}
        >
            <View style={styles(theme).container}>
                <View style={styles(theme).overlay}>
                    <View style={styles(theme).panel}>
                        <ScrollView>
                            <Text style={styles(theme).header}>{type === 'add' ? 'Add PDU' : 'Edit PDU'}</Text>
                            <View
                                style={styles(theme).body}
                            >
                                <InputBox
                                    title={'Host'}
                                    value={host}
                                    placeholder={'Enter PDU IP'}
                                    keyboardType={'email-address'}
                                    saveValue={(text)=>{
                                        setHost(text);
                                    }}
                                />
                                <InputBox
                                    title={'Port'}
                                    value={port}
                                    placeholder={'Enter PDU Port'}
                                    keyboardType={'default'}
                                    saveValue={(text)=>{
                                        setPort(text);
                                    }}
                                />
                                <InputBox
                                    title={'PDU Name'}
                                    value={PDUName}
                                    placeholder={'Enter PDU Name'}
                                    keyboardType={'default'}
                                    saveValue={(text)=>{
                                        setPDUName(text);
                                    }}
                                />

                                <View style={styles(theme).radioButtonContainer}>
                                    <RadioButton checked={autoload} onCheckChange={
                                        ()=>{
                                            console.log(autoload);
                                            setAutoload(!autoload)
                                        }
                                    } />
                                    <Text
                                        style={styles(theme).radioButtonText}
                                    >
                                    {'Auto Connect to PDU when application start'}
                                    </Text>
                                </View>

                            <Ripple
                                style={styles(theme).btn_container}
                                onPress={saveProc}
                            >
                                <Text style={styles(theme).btn}>{'Save'}</Text>
                            </Ripple>
                            <Ripple
                                style={styles(theme).btn_container_cancel}
                                onPress={closeModal}
                            >
                                <Text style={styles(theme).btn_cancel}>{'Cancel'}</Text>
                            </Ripple>

                            </View>
                        </ScrollView>
                        

                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = theme => StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'flex-end',
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.dark ? theme.COLORS.DARK_BLUE_80P: '#000000D0',


        paddingHorizontal: 30,
    },
    panel: {
        //flex: 1,
        minHeight: '70%',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        paddingVertical: 50,
        paddingHorizontal: 0,
        backgroundColor: theme.dark? theme.COLORS.DEFAULT_LIGHTBLUE: theme.COLORS.WHITE,
    },
    header: {
        color: theme.COLORS.BLACK,
        fontSize: 16,
        fontWeight: '700',
        fontFamily: fontFamilies.Rogan
    },
    body: {
        width: '100%',
        flex: 1,
        paddingVertical: 10,
    },
    btn_container: {
        borderRadius: 8,
        width: '100%',
        backgroundColor: theme.COLORS.APPBAR_BLUE,
        borderWidth: 1,
        borderColor: theme.COLORS.APPBAR_BLUE,
        marginBottom: 16,
        paddingVertical: 15,
    },
    btn_container_cancel: {
        borderRadius: 8,
        width: '100%',
        borderWidth: 1,
        borderColor: theme.COLORS.APP_GREY,
        // backgroundColor: theme.COLORS.GREEN,
        marginBottom: 16,
        paddingVertical: 15,
    },
    btn: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
        color: theme.COLORS.WHITE,
    },

    btn_cancel: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
        color: theme.COLORS.BLACK,
    },

    radioButtonContainer: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioButtonText: {
        marginLeft: 17,
        fontFamily: fontFamilies.Rogan,
        fontSize: 16,
        lineHeight: 19,
        color: theme.dark? theme.COLORS.WHITE : theme.COLORS.APP_GREY
    },
    radioButton: {
        width: 16,
        height: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.COLORS.BLACK,
        opacity: .3,
    },
    radioButtonChecked: {
        width: 16,
        height: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.COLORS.APPBAR_BLUE,
    },
    radioButtonDot: {
        width: 16,
        height: 16,
        borderRadius: 12,
        backgroundColor: theme.COLORS.DOT_GREEN,
    },
    tipText: {
        fontFamily: fontFamilies.OutfitMedium,
        fontSize: 12,
        lineHeight: 16,
        color: theme.dark?theme.COLORS.WHITE:theme.COLORS.DEFAULT_DARKBLUE
    }
});

export default PDUEditModal;