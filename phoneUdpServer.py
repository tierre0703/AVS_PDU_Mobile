import socket

# Set up a TCP/IP server
tcp_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
 
# Bind the socket to server address and port 81
server_address = ('0.0.0.0', 8001)
tcp_socket.bind(server_address)
 
# Listen on port 81
tcp_socket.listen(1)
 
while True:
    print("Waiting for connection")
    connection, client = tcp_socket.accept()
 
    try:
        print("Connected to client IP: {}".format(client))
         
        # Receive and print data 32 bytes at a time, as long as the client is sending something
        while True:
            data = connection.recv(1024)
            print("Received data: {}".format(data))
            connection.send(data)
            connection.close()
            break
 
    finally:
        connection.close()