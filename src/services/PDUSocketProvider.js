import PropTypes from 'prop-types';
import React, {createContext, useContext, useReducer, useEffect, useState} from 'react';
import TcpSocket from 'react-native-tcp-socket';
import { useStateValue } from './State/State';

const initialinfo = {
  HOST: '',
  PORT: '',
  SN: '',
  LANMAC: '',
  WIFIMAC: '',
  APP_NAME: '',
  VER: '',
  RELEASE_DATE: '',
  TEMP: '',
  CPUTEMP: '',
  SYSTIME: '',
  UPTIME: '',
  FAN_STATUS: '',
  FAN_MODE: '',
  FAN_HIGH_TEMP: '',
  FAN_LOW_TEMP: '',
  LANIP: '',
  WIFIIP: '',
  WIFISSID: '',
  RELAY_COUNT: '',
  CHNAME_OUT: '',
  CHNAME_IN: '',
  SCHEDULE_START: '',
  SCHEDULE_END: '',
  SCHEDULE_RUNONES: '',
  Verified: false,
};

const PDUSocketContext = createContext();

export const usePDUSocketContext = () => useContext(PDUSocketContext);

export const PDUSocketProvider = ({children}) => {
  const [pduClients, setPduClients] = useState([]);
  const [PDUInfo, setPDUInfo] = useState([]);
  const [{pduListSettings}, dispatch] = useStateValue();

  const {pduList=[]} = pduListSettings;

  const findPDU = (host, port) => {
    return pduClients.findIndex(client => client.host === host) > -1 ? 
    pduClients.find(client => client.host === host) : null
    ;
  }

  const sendCommand = (client, data) => {
    if(client) {
      client.write(data);
    }
  }

  const extractData = (token, key) => {
    //return token.replace(key, '');
    return token.substring(token.indexOf(key) + key.length);
  }

  const connectPDU = (host, port) => {
    console.log(connectPDU);
    const options = {
      host: host,
      port: port,
    };
    if(findPDU(host, port)) {
      return;
    }

    console.log(host, port);

    const client = TcpSocket.createConnection(
      options,
      ()=>{
        console.log('client created');
        updateStatPDU(client);
      }
    );
    // Read line data
    client.setEncoding('utf8'); // Set encoding to utf8
    client.on('data', data => {
      // received data
      // console.log(data.toString());

      var KEY = '';
      var VALUE = '';

      var relay_info = [];


      var responseData = {};


      if(data){
        const tokens = data.toString().split('\r\n');
        tokens.forEach(token => {
          KEY = '';
          if(token.indexOf('DEVICE:') > -1) {
            responseData['DEVICE'] =  extractData(token, 'DEVICE:');
          }else if(token.indexOf('SN:') > -1){
            responseData['SN'] = extractData(token, 'SN:');
          }else if(token.indexOf('LANMAC:') > -1) {
            responseData['LANMAC'] = extractData(token, 'LANMAC:');
          }else if(token.indexOf('WIFIMAC:') > -1){
            responseData['WIFIMAC'] = extractData(token, 'WIFIMAC:');
          }else if(token.indexOf('APP_NAME:') > -1){
            responseData['APP_NAME'] = extractData(token, 'APP_NAME:');
          }else if(token.indexOf('VER:') > -1){
            responseData['VER'] = extractData(token, 'VER:');
          }else if(token.indexOf('RELEASE_DATE:') > -1){
            responseData['RELEASE_DATE'] = extractData(token, 'RELEASE_DATE:');
          }else if(token.indexOf('TEMP:') > -1){
            responseData['TEMP'] = extractData(token, 'TEMP:');
          }else if(token.indexOf('CPUTEMP:') > -1){
            responseData['CPUTEMP'] = extractData(token, 'CPUTEMP:');
          }else if(token.indexOf('SYSTIME:') > -1){
            responseData['SYSTIME'] = extractData(token, 'SYSTIME:');
          }else if(token.indexOf('UPTIME:') > -1){
            responseData['UPTIME'] = extractData(token, 'UPTIME:');
          }else if(token.indexOf('FAN_STATUS:') > -1){
            responseData['FAN_STATUS'] = extractData(token, 'FAN_STATUS:');
          }else if(token.indexOf('FAN_MODE:') > -1){
            responseData['FAN_MODE'] = extractData(token, 'FAN_MODE:');
          }else if(token.indexOf('FAN_HIGH_TEMP:') > -1){
            responseData['FAN_HIGH_TEMP'] = extractData(token, 'FAN_HIGH_TEMP:');
          }else if(token.indexOf('FAN_LOW_TEMP:') > -1){
            responseData['FAN_LOW_TEMP'] = extractData(token, 'FAN_LOW_TEMP:');
          }else if(token.indexOf('LANIP:') > -1){
            responseData['LANIP'] = extractData(token, 'LANIP:');
          }else if(token.indexOf('WIFIIP:') > -1){
            responseData['WIFIIP'] = extractData(token, 'WIFIIP:');
          }else if(token.indexOf('WIFISSID:') > -1){
            responseData['WIFISSID'] = extractData(token, 'WIFISSID:');
          }else if(token.indexOf('RELAY_COUNT:') > -1){
            const relay_count_str =  extractData(token, 'RELAY_COUNT:');
            const relay_count = Number(relay_count_str);
            responseData['RELAY_COUNT'] = relay_count;
            responseData['RELAY_IN'] = Array(relay_count).fill('OFF');
            responseData['RELAY_OUT'] = Array(relay_count).fill('ON');
          }else if(token.indexOf('IN:') === 0){
            const relayTokens = token.split(':');
            if(relayTokens.length == 3){
              const relayIndex = Number(relayTokens[1]);
              const relayStatus = relayTokens[2];
              responseData['RELAY_IN'][relayIndex] = relayStatus;
            }
          }else if(token.indexOf('OUT:') === 0){
            const relayTokens = token.split(':');
            if(relayTokens.length == 3){
              const relayIndex = Number(relayTokens[1]);
              const relayStatus = relayTokens[2];
              responseData['RELAY_OUT'][relayIndex] = relayStatus;
            }
          }else if(token.indexOf('CHNAME_OUT:') > -1){
            const chnameOutTokens = token.split(':');
            if(chnameOutTokens.length == 3){
              const chnameIndex = Number(chnameOutTokens[1]);
              const chname = chnameOutTokens[2];
              responseData['CHNAME_OUT'][chnameIndex] = chname;
            }
          }else if(token.indexOf('CHNAME_IN:') > -1){
            const chnameInTokens = token.split(':');
            if(chnameInTokens.length == 3){
              const chnameIndex = Number(chnameInTokens[1]);
              const chname = chnameInTokens[2];
              responseData['CHNAME_IN'][chnameIndex] = chname;
            }
          }else if(token.indexOf('SCHEDULE_START:') > -1){
            const schedule_tokens = token.split('\n');
            let schedule_relay_index = 0;
            let schedule_begin = false;

            schedule_tokens.forEach(schedule_token=>{
              if(schedule_token.indexOf('SCHEDULE_START:') > -1){
                //schedule start
                const schedule_relay_index_str = extractData(schedule_token, 'SHCEDULE_START:');
                schedule_relay_index = Number(schedule_relay_index_str);
                schedule_begin = true;
              }else if(schedule_token.indexOf('SCHEDULE_RUNONES') > -1){
                const str = extractData(schedule_token, 'SCHEDULE_RUNONES:');
                const runones_tokens = str.split(',');
                const runones = {};
                runones_tokens.forEach(runones_token => {
                  if(runones_token.indexOf('ID:') > -1){
                    runones['ID'] = extractData(runones_token, 'ID:');
                  }else if(runones_token.indexOf('RELAY:') > -1){
                    runones['RELAY'] = extractData(runones_token, 'RELAY:');
                  }else if(runones_token.indexOf('DATETIME:') > -1){
                    runones['DATETIME'] = extractData(runones_token, 'DATETIME:');
                  }else if(runones_token.indexOf('ACTION:') > -1){
                    runones['ACTION'] = extractData(runones_token, 'ACTION:');
                  }else if(runones_token.indexOf('PROCESSED:') > -1){
                    runones['PROCESSED'] = extractData(runones_token, 'PROCESSED:');
                  }
                });
              }else if(schedule_token.indexOf('SCHEDULE_WEEKLY:') > -1){
                const str = extractData(schedule_token, 'SCHEDULE_WEEKLY:');
                const runones_tokens = str.split(',');
                const runweekly = {};
                runones_tokens.forEach(runones_token => {
                  if(runones_token.indexOf('ID:') > -1){
                    runweekly['ID'] = extractData(runones_token, 'ID:');
                  }else if(runones_token.indexOf('RELAY:') > -1){
                    runweekly['RELAY'] = extractData(runones_token, 'RELAY:');
                  }else if(runones_token.indexOf('DATETIME:') > -1){
                    runweekly['DATETIME'] = extractData(runones_token, 'DATETIME:');
                  }else if(runones_token.indexOf('ACTION:') > -1){
                    runweekly['ACTION'] = extractData(runones_token, 'ACTION:');
                  }else if(runones_token.indexOf('MON:') > -1){
                    runweekly['MON'] = extractData(runones_token, 'MON:');
                  }else if(runones_token.indexOf('TUE:') > -1){
                    runweekly['TUE'] = extractData(runones_token, 'TUE:');
                  }else if(runones_token.indexOf('WED:') > -1){
                    runweekly['WED'] = extractData(runones_token, 'WED:');
                  }else if(runones_token.indexOf('THU:') > -1){
                    runweekly['THU'] = extractData(runones_token, 'THU:');
                  }else if(runones_token.indexOf('FRI:') > -1){
                    runweekly['FRI'] = extractData(runones_token, 'FRI:');
                  }else if(runones_token.indexOf('SAT:') > -1){
                    runweekly['SAT'] = extractData(runones_token, 'SAT:');
                  }else if(runones_token.indexOf('SUN:') > -1){
                    runweekly['SUN'] = extractData(runones_token, 'SUN:');
                  }
                });

              }else if(schedule_token.indexOf('SCHEDULE_END:') > -1){
                schedule_begin = false;
              }

            });
          }
          /*


          if(KEY){
            setPDUInfo(prevPDUInfo=>{
              const updatedData = {...prevPDUInfo};
              const pdu = updatedData[host] || {
                ...initialinfo,
                HOST: host,
                PORT: port,
              }
              pdu[KEY] = VALUE;
              updatedData[host] = pdu;
              return updatedData;
            });
          } */

          console.log('response: ', responseData);

        });
      }
    });

    client.on('error', error => {
      // error

    });

    client.on('close', () => {
      // close

    })

    setPduClients(prevClients => [...prevClients, {host: host, client: client}]);
  }

  const disconnectPDU = clientObj => {
    if (clientObj){
      clientObj.client.destroy();
      setPduClients(prevClients => prevClients.filter(socketClient => socketClient.host != clientObj.host));
    }
  }

  const rebootPDU = clientObj => {
    if(clientObj){
      sendCommand(clientObj.client, 'AT+REBOOT\r');
    }
  }

  const updateStatPDU = client => {
    if(client){
      sendCommand(client, 'AT+CHNAMES\r');
      sendCommand(client, 'AT+OUTSTAT\r');
    }
  }

  const toggleRelay = (clientObj, relayIndex) => {
    if(clientObj){
      sendCommand(clientObj.client, `AT+TOGGLE:${relayIndex}\r`)
    }
  }

  const restartRelay = (clientObj, relayIndex) => {
    if(clientObj){
      sendCommand(clientObj.client, `AT+RESTART:${relayIndex}\r`);
    }
  }





  const contextValue = {
    connectPDU,
    disconnectPDU,
    sendCommand,
    findPDU, 
    pduClients,
    PDUInfo,
    updateStatPDU,
  };

  useEffect(()=>{
    return () => {
      pduClients.forEach(clientObj => {
        clientObj.client.destroy();
      });
    }
  }, [pduClients]);

  const initSockets = () => {
    pduList.forEach(pdu=>{
      if(pdu.host && pdu.port){
        connectPDU(pdu.host, pdu.port);
      }
    });
  }

  useEffect(()=>{
    initSockets();

  }, [pduList]);

  return (
    <PDUSocketContext.Provider value={contextValue}>
      {children}
    </PDUSocketContext.Provider>
  );
};