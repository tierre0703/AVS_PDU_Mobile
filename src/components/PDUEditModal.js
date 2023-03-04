import React, {useState, useEffect, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Modal,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';
import { useStateValue } from '../services/State/State';
import { fontFamilies } from '../utils/FontFamilies';
import Ripple from './Ripple';
import { ThemeContext } from './ThemeProvider';

const PDUEditModal = (props) => {
    const {t} = useTranslation();

    const {theme} = useContext(ThemeContext);
    const [{modalSetting}, dispatch] = useStateValue();
    const [host, setHost] = useState('');


    const {
        show=false,
        type='add', //add | edit
        item,
    } = modalSetting || {};

    const InputBox = (props) => {
      
        const {
          title='',
          value='',
          style={},
          titleStyle={},
          keyboardType='default',
          setValue=()=>{},
          saveValue=()=>{}
        } = props;
  
        const [textValue, setTextValue] = useState(value);
  
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
                fontWeight: '700',
                color: theme.dark ? theme.COLORS.WHITE : theme.COLORS.DEFAULT_DARKBLUE,
                fontSize:12,
                lineHeight: 14,
                ...titleStyle}}
            >{title}</Text>
            <TextInput
              keyboardType={keyboardType}
              style={{
                fontSize: 15,
                lineHeight: 18,
                fontFamily: fontFamilies.Rogan,
                fontWeight: '500',
                color: theme.dark ? theme.COLORS.TEXT_GREY: theme.COLORS.TEXT_LIGHTGREY,
           
              }}
              value={textValue}
              onChangeText={(text)=>{
                setTextValue(text);
              }}
              onBlur={()=>saveValue(textValue)}
            />
          </View>
        );
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
                        <Text style={styles(theme).header}>{type === 'add' ? 'Add PDU' : 'Edit PDU'}</Text>
                        <View
                            style={styles(theme).body}
                        >
                            <InputBox
                                title={'Host'}
                                value={host}
                                keyboardType={'email-address'}
                                saveValue={(text)=>{
                                    setHost(text);
                                }}
                                />


                        </View>

                        <Ripple
                            style={styles(theme).btn_container}
                        >
                            <Text style={styles(theme).btn}>{'Save'}</Text>
                        </Ripple>
                        <Ripple
                            style={styles(theme).btn_container_cancel}
                        >
                            <Text style={styles(theme).btn}>{'Cancel'}</Text>
                        </Ripple>

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
        backgroundColor: theme.dark ? theme.COLORS.DARK_BLUE_80P:theme.COLORS.DARK_WHITE_80P,
        paddingHorizontal: 60,
    },
    panel: {
        //flex: 1,
        minHeight: '70%',
        alignItems: 'center',
        width: '100%',
        borderRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
        backgroundColor: theme.COLORS.WHITE, //theme.dark? //theme.COLORS.DEFAULT_LIGHTBLUE: theme.COLORS.WHITE,
    },
    header: {
        color: theme.COLORS.WHITE,
        fontSize: 22,
        fontWeight: '700',
        fontFamily: fontFamilies.Rogan
    },
    body: {
        width: '100%',
        flex: 1,
        paddingVertical: 10,
    },
    btn_container: {
        borderRadius: 12,
        width: '100%',
        backgroundColor: theme.COLORS.GREEN,
        marginBottom: 16,
        paddingVertical: 10,
    },
    btn_container_cancel: {
        borderRadius: 12,
        width: '100%',
        //backgroundColor: theme.COLORS.GREEN,
        marginBottom: 16,
        paddingVertical: 10,
    },
    btn: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
        color: theme.COLORS.WHITE,
    }
});

export default PDUEditModal;