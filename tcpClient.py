import socket
 
# Create a connection to the server application on port 81
tcp_socket = socket.create_connection(('10.100.100.87', 5005))
 
try:

    #data = str.encode('Hi. I am a TCP client sending data to the server')
    #tcp_socket.sendall(data)
    buf = tcp_socket.recv(1024)
    print(buf)

    data = str.encode('AT+CHNAMES\r')
    tcp_socket.sendall(data)
    data = str.encode('AT+OUTSTAT\r')
    tcp_socket.sendall(data)

    buf = tcp_socket.recv(1024)
    print(buf)

    while True:
        buf = tcp_socket.recv(1024)
        print(buf)
        if not buf:
            break


finally:
    print("Closing socket")
    tcp_socket.close()