import React, {createContext, useContext, useReducer, useEffect, useState} from 'react';
import TcpSocket from 'react-native-tcp-socket';
import {NativeModules} from 'react-native';
import {NetworkInfo} from 'react-native-network-info';

import dgram from 'react-native-udp';
const REMOTE_PORT = 8000;
const SERVER_PORT = 8001;

const PDUServerContext = createContext();
export const useDiscoveryServerContext = () => useContext(PDUServerContext);

export const PDUServerProvider = ({children}) => {
    const [discoveredPDUs, setDiscoveredPDUs] = useState([]);
    const [localNetworkAddresses, setLocalNetworkAddresses] = useState([]);
    const [udpSocket, setUdpSocket] = useState(null);

    const requestDiscoverPDUs = (ips) => {
        console.log('requestDiscoverPDUs');
        const socket = dgram.createSocket({
            type: 'udp4',
            //reusePort: true,
        }, ()=>{
            console.log('socket created');
            
        }
        );
        socket.on('listening', ()=>{
            console.log('listening');
           /*  const message = '{\n"GUID" : "8481fba0-f387-11ea-adc1-0242ac120002",\n"Ver" : "1.3.0",\n"Port" : "8001"\n}';
            const messageBuffer = Buffer.from(message);
            socket.send(messageBuffer, 0, messageBuffer.length,REMOTE_PORT, '192.168.1.204', 
            //socket.send(message, REMOTE_PORT, ip, 
                (err) => {
                if(err){
                    console.error(`Error sending message: ${err}`);
                }else{
                   console.log(`Sent message to ${'192.168.1.204'}:${REMOTE_PORT}`);
                }
            });
            socket.close(); */
           
           const message = '{\n"GUID" : "8481fba0-f387-11ea-adc1-0242ac120002",\n"Ver" : "1.3.0",\n"Port" : "8001"\n}';
       
            ips.forEach(async (ip)=>{
                const messageBuffer = Buffer.from(message);
                await socket.send(messageBuffer, 0, messageBuffer.length,REMOTE_PORT, ip, 
                //socket.send(message, REMOTE_PORT, ip, 
                    (err) => {
                    if(err){
                        console.log(`Error sending message: ${err}`);
                    }else{
                       console.log(`Sent message to ${ip}:${REMOTE_PORT}`);
                    }
                });


            })

            socket.close();
        })

        socket.on('error', error => {
            // error
            console.log(error);
        });
      
        socket.on('close', () => {
            // close
            console.log('socket closed');
        
        })

        console.log(socket);
        socket.bind(8002, '0.0.0.0', (err) => {
            console.log(`UDP socket bound to ${socket.address().address}:${socket.address().port} ${err}`);
          });
        
    
        /* if(socket){
            const message = '{\n"GUID" : "8481fba0-f387-11ea-adc1-0242ac120002",\n"Ver" : "1.3.0",\n"Port" : "8001"\n}';
       
            ips.forEach(async (ip)=>{
                const messageBuffer = Buffer.from(message);
                await socket.send(messageBuffer, 0, messageBuffer.length,REMOTE_PORT, '192.168.1.204', 
                //socket.send(message, REMOTE_PORT, ip, 
                    (err) => {
                    if(err){
                        console.error(`Error sending message: ${err}`);
                    }else{
                       console.log(`Sent message to ${ip}:${REMOTE_PORT}`);
                    }
                });

            })
        } */
    }

    const getLocalNetworkAddresses = async () => {
        var ipAddress = await NetworkInfo.getIPV4Address();
        //ipAddress = '10.100.100.81';
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
        setLocalNetworkAddresses(prev => [..._localNetworkAddresses]);
        return _localNetworkAddresses;
    }

    const extractData = (token, key) => {
        return token.replace(key, '');
      }

    const runServer = () => {
        const server = TcpSocket.createServer((socket) => {
            console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

            // Send a welcome message to the client
            socket.write('Welcome to the server!\r\n');

            // Handle incoming data from the client
            //GUID:24d9b67e-f38d-11ea-adc1-0242ac120002\nVER:1.6\nPORT:5005\nSN:02c0018115a3a72d\nNAME:Soleux PDU\n
            socket.on('data', (data) => {
                console.log(`data received ${data.toString()} ${socket.remoteAddress}` );
                const host = socket.remoteAddress;
                
                var Version, GUID, port, PDUName, SN, Verified = '';



                const tokens = data.toString().split('\n');
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

                console.log(tokens);
                console.log(GUID, Version, port, PDUName, SN);

                setDiscoveredPDUs(prev => {
                    const foundIndex = prev.findIndex(ele=>ele.host === host);
                    console.log(foundIndex);

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

        server.listen({port:8001}, () => {
            console.log(`Server listening on ${server.address().address}:${server.address().port}`);
        });
        return server;
    }
    
    
    useEffect(()=>{
        console.log('PDUServer Initialization');
        getLocalNetworkAddresses().then(ips =>{
            requestDiscoverPDUs(ips);
        });
        //requestDiscoverPDUs([]);
        const server = runServer();
       
        return () => {
            if(server){
                server.close();
            }
        }

    }, []);

    const contextValue = {
        discoveredPDUs,
        requestDiscoverPDUs,
        localNetworkAddresses
    };

    return (
        <PDUServerContext.Provider value={contextValue}>
            {children}
        </PDUServerContext.Provider>
    );
};