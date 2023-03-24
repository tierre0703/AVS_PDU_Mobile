import socket

# Create a UDP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Specify the IP address and port number of the server to send messages to
#server_address = ('0.0.0.0', 8001)
client_address = ('localhost', 8000)
#sock.bind(server_address)

# Send a message to the server
message = b'{\n"GUID" : "8481fba0-f387-11ea-adc1-0242ac120002",\n"Ver" : "1.3.0",\n"Port" : "8001"\n}'
sent = sock.sendto(message, client_address)
