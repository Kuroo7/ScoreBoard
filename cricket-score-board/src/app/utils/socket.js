import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || 'http://localhost:4000';

let socket;

export const initializeSocket = () => {
  if (!socket) {
    console.log("initialized");
    
    socket = io(SOCKET_URL);
    console.log('Socket.IO initialized');
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    console.log("Nosockrt");
    
    throw new Error('Socket.IO not initialized. Call initializeSocket first.');
  }
  console.log("got socket");
  
  return socket;
};
