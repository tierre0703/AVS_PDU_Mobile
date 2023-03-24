import socket

# Create a UDP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Specify the IP address and port number of the server to send messages to
server_address = ('0.0.0.0', 8000)
#client_address = ('10.100.100.87', 8000)
sock.bind(server_address)

while True:
    print('Waiting for a message...')
    data, client_address = sock.recvfrom(4096)

    print(f'Received {len(data)} bytes from {client_address}: {data.decode()}')


    # Create a connection to the server application on port 81
    host,port = client_address
    tcp_socket = socket.create_connection((host, 8001))
    data = b'GUID:24d9b67e-f38d-11ea-adc1-0242ac120002\nVER:1.6\nPORT:5005\nSN:02c0018115a3a72d\nNAME:Soleux PDU\n'
    tcp_socket.sendall(data)
    tcp_socket.close()
    

# Send a message to the server
message = b'{\n"GUID" : "8481fba0-f387-11ea-adc1-0242ac120002",\n"Ver" : "1.3.0",\n"Port" : "8001"\n}'
sent = sock.sendto(message, client_address)

# GUID:24d9b67e-f38d-11ea-adc1-0242ac120002\nVER:1.6\nPORT:5005\nSN:02c0018115a3a72d\nNAME:Soleux PDU\n

# Wait for incoming messages and respond to them
#while True:
#    print('Waiting for a message...')
#    data, client_address = sock.recvfrom(4096)
#    print(f'Received {len(data)} bytes from {client_address}: {data.decode()}')
    
    # Send a response back to the client
    #response = b'Hello, client!'
    #sent = sock.sendto(response, client_address)
# Receive a response from the server
#data, server = sock.recvfrom(4096)
#print(f'Received {len(data)} bytes from {server}: {data.decode()}')

# Close the socket
#sock.close()
