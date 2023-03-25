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
    return token.replace(key, '');
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
    console.log(client);

    client.on('data', data => {
      // received data
      // console.log(data.toString());

      var KEY = '';
      var VALUE = '';

      var relay_info = [];


      if(data){
        const tokens = data.toString().split('\r\n');
        tokens.forEach(token => {
          KEY = '';
          if(token.indexOf('SN:') > -1){
            KEY = 'SN';
            VALUE = extractData(token, 'SN:');
          }else if(token.indexOf('LANMAC:') > -1) {
            KEY = 'LANMAC';
            VALUE = extractData(token, 'LANMAC:');
          }else if(token.indexOf('WIFIMAC:') > -1){
            KEY = 'WIFIMAC';
            VALUE = extractData(token, 'WIFIMAC:');
          }else if(token.indexOf('APP_NAME:') > -1){
            KEY = 'APP_NAME';
            VALUE = extractData(token, 'APP_NAME:');
          }else if(token.indexOf('VER:') > -1){
            KEY = 'VER';
            VALUE = extractData(token, 'VER:');
          }else if(token.indexOf('RELEASE_DATE:') > -1){
            KEY = 'RELEASE_DATE';
            VALUE = extractData(token, 'RELEASE_DATE:');
          }else if(token.indexOf('TEMP:') > -1){
            KEY = 'TEMP';
            VALUE = extractData(token, 'TEMP:');
          }else if(token.indexOf('CPUTEMP:') > -1){
            KEY = 'CPUTEMP';
            VALUE = extractData(token, 'CPUTEMP:');
          }else if(token.indexOf('SYSTIME:') > -1){
            KEY = 'SYSTIME';
            VALUE = extractData(token, 'SYSTIME:');
          }else if(token.indexOf('UPTIME:') > -1){
            KEY = 'UPTIME';
            VALUE = extractData(token, 'UPTIME:');
          }else if(token.indexOf('FAN_STATUS:') > -1){
            KEY = 'FAN_STATUS';
            VALUE = extractData(token, 'FAN_STATUS:');
          }else if(token.indexOf('FAN_MODE:') > -1){
            KEY = 'FAN_MODE';
            VALUE = extractData(token, 'FAN_MODE:');
          }else if(token.indexOf('FAN_HIGH_TEMP:') > -1){
            KEY = 'FAN_HIGH_TEMP';
            VALUE = extractData(token, 'FAN_HIGH_TEMP:');
          }else if(token.indexOf('FAN_LOW_TEMP:') > -1){
            KEY = 'FAN_LOW_TEMP';
            VALUE = extractData(token, 'FAN_LOW_TEMP:');
          }else if(token.indexOf('LANIP:') > -1){
            KEY = 'LANIP';
            VALUE = extractData(token, 'LANIP:');
          }else if(token.indexOf('WIFIIP:') > -1){
            KEY = 'WIFIIP';
            VALUE = extractData(token, 'WIFIIP:');
          }else if(token.indexOf('WIFISSID:') > -1){
            KEY = 'WIFISSID';
            VALUE = extractData(token, 'WIFISSID:');
          }else if(token.indexOf('RELAY_COUNT:') > -1){
            KEY = 'RELAY_COUNT';
            VALUE = extractData(token, 'RELAY_COUNT:');
            console.log(data.toString());
            console.log('-----');
          }else if(token.indexOf('CHNAME_OUT:') > -1){
            console.log(data.toString());
            console.log('-----');
            KEY = 'CHNAME_OUT';
            VALUE = extractData(token, 'CHNAME_OUT:');
          }else if(token.indexOf('CHNAME_IN:') > -1){
            console.log(data.toString());
            console.log('-----');
            KEY = 'CHNAME_IN';
            VALUE = extractData(token, 'CHNAME_IN:');
          }else if(token.indexOf('SCHEDULE_START:') > -1){
            console.log(data.toString());
            console.log('-----');
            KEY = 'SCHEDULE_START';
            VALUE = extractData(token, 'SCHEDULE_START:');
          }else if(token.indexOf('SCHEDULE_END:') > -1){
            KEY = 'SCHEDULE_END';
            console.log('-----');
            console.log(data.toString());
            VALUE = extractData(token, 'SCHEDULE_END:');
          }else if(token.indexOf('SCHEDULE_RUNONES:') > -1){
            console.log(data.toString());
            console.log('-----');
            KEY = 'SCHEDULE_RUNONES';
            VALUE = extractData(token, 'SCHEDULE_RUNONES:');
          }


          if(KEY){
            /* setPDUInfo(prevPDUInfo=>{
              const updatedData = {...prevPDUInfo};
              const pdu = updatedData[host] || {
                ...initialinfo,
                HOST: host,
                PORT: port,
              }
              pdu[KEY] = VALUE;
              updatedData[host] = pdu;
              return updatedData;
            }); */
          }

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