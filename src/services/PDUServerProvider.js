import React, {createContext, useContext, useReducer, useEffect, useState} from 'react';
import { createServer } from 'react-native-tcp-socket';
import {NativeModules} from 'react-native';
import {NetworkInfo} from 'react-native-network-info';

import dgram from 'react-native-udp';
const REMOTE_PORT = 8000;
const SERVER_PORT = 8001;

const PDUServerContext = createContext();
export const usePDUServer = () => useContext();

export const PDUServerProvider = ({children}) => {
    const [discoveredPDUs, setDiscoveredPDUs] = useState([]);
    const [localNetworkAddresses, setLocalNetworkAddresses] = useState([]);

    const requestDiscoverPDUs = async (ips) => {
        console.log(NativeModules);
        const socket = dgram.createSocket({
            type: 'udp4',
            reusePort: true
        });

        if(socket){
            const message = '{\n"GUID" : "8481fba0-f387-11ea-adc1-0242ac120002",\n"Ver" : "1.3.0",\n"Port" : "8001"\n}';
       
            ips.map((ip)=>{
                const messageBuffer = Buffer.from(message);
                socket.send(messageBuffer, 0, messageBuffer.length,REMOTE_PORT, ip, 
                //socket.send(message, REMOTE_PORT, ip, 
                    (err) => {
                    if(err){
                       // console.error(`Error sending message: ${err}`);
                    }else{
                        console.log(`Sent message to ${ip}:${REMOTE_PORT}: ${message}`);
                    }
                });

            })
        }
    }

    const getLocalNetworkAddresses = async () => {
        var ipAddress = await NetworkInfo.getIPAddress();
        ipAddress = '10.100.100.81';
        const subnetMask = await NetworkInfo.getSubnet();
        const subnetMaskArray = subnetMask.split('.');
        const ipAddressArray = ipAddress.split('.');

        const _localNetworkAddresses = [];
        for (let i = 1; i < 255; i++) {
            const networkAddress = `${ipAddressArray[0]}.${ipAddressArray[1]}.${ipAddressArray[2]}.${i}`;
            const networkAddressArray = networkAddress.split('.');
            let isLocalNetworkAddress = true;
            for (let j = 0; j < 4; j++) {
            const networkAddressByte = parseInt(networkAddressArray[j]);
            const subnetMaskByte = parseInt(subnetMaskArray[j]);
            if ((networkAddressByte & subnetMaskByte) !== (ipAddressArray[j] & subnetMaskByte)) {
                isLocalNetworkAddress = false;
                break;
            }
            }
            if (isLocalNetworkAddress) {
            _localNetworkAddresses.push(networkAddress);
            }
        }
        console.log(_localNetworkAddresses);
        setLocalNetworkAddresses(prev => [..._localNetworkAddresses]);
        return _localNetworkAddresses;
    }

    const extractData = (token, key) => {
        return token.replace(key, '');
      }

    const runServer = () => {
        const server = createServer((socket) => {
            console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

            // Send a welcome message to the client
            socket.write('Welcome to the server!\r\n');

            // Handle incoming data from the client
            //GUID:24d9b67e-f38d-11ea-adc1-0242ac120002\nVER:1.6\nPORT:5005\nSN:02c0018115a3a72d\nNAME:Soleux PDU\n
            socket.on('data', (data) => {
                console.log(data);
                const host = socket.remoteAddress;
                
                var Version, GUID, port, PDUName, SN, Verified = '';



                const tokens = data.split('\n');
                tokens.forEach(token => {
                    if (token.indexOf('GUID:') > -1){
                        GUID = extractData(token, 'GUID:');
                        if (GUID === '24d9b67e-f38d-11ea-adc1-0242ac120002') {
                            Verified = true;
                        }else{
                            Verified = false;
                        }
                    }else if(token.indexOf('VER:') > -1){
                        Version = extractData(token, 'VER:');
                    }else if(token.indexOf('PORT:') > -1){
                        port = extractData(token, 'PORT:');
                    }else if(token.indexOf('NAME:') > -1){
                        PDUName = extractData(token, 'NAME:');
                    }else if(token.indexOf('SN:') > -1){
                        SN = extractData(token, 'SN:');
                    }
                });

                setDiscoveredPDUs(prev => {
                    const foundIndex = prev.findIndex(ele=>ele.host === host);

                    if(foundIndex > -1){
                        prev[foundIndex] = {
                            ...prev[foundIndex],
                            SN,
                            PDUName,
                            port,
                            Version,
                            Verified,
                            GUID,
                            host,
                        };
                        return prev;
                    }else{
                        return [
                            ...prev, 
                            {
                                SN,
                                PDUName,
                                port,
                                Version,
                                Verified,
                                GUID,
                                host,
                            }
                        ];
                    }
                });


                console.log(`Received ${data.length} bytes of data from client: ${data.toString()}`);
            });

            // Handle socket errors
            socket.on('error', (error) => {
                console.log('Socket error:', error);
            });

            // Handle socket closing
            socket.on('close', () => {
                console.log('Socket closed.');
            });

        });

        server.listen(8001, '0.0.0.0', () => {
            console.log(`Server listening on ${server.address().address}:${server.address().port}`);
        });
        return server;
    }
    
    
    useEffect(()=>{
        console.log('PDUServer Initialization');
        const server = runServer();
        console.log(server);
        getLocalNetworkAddresses().then(ips =>{
            requestDiscoverPDUs(ips);
        });

        return () => {
            if(server){
                //server.close();
            }
        }

    }, []);

    const contextValue = {
        discoveredPDUs,
        requestDiscoverPDUs
    };

    return (
        <PDUServerContext.Provider value={contextValue}>
            {children}
        </PDUServerContext.Provider>
    );
};