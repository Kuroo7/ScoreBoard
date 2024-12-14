let io = null;



// Function to initialize the WebSocket server
const initializeWebSocket = (server) => {
  if (io) {
    return io; // If already initialized, return the existing instance
  }
  const { Server } = require('socket.io');
  io = new Server(server);
  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io; // Return the initialized io object
};

// Export the functions using module.exports
module.exports = {
  initializeWebSocket,
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized. Call initializeWebSocket first.');
    }
    return io;
  }
};
