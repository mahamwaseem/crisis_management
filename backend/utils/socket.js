let io;

const initSocket = (server) => {
  const socketIo = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  socketIo.on("connection", (socket) => {
    console.log(" User connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId); 
      console.log(`User ${userId} joined notifications room`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  io = socketIo;
};


const sendNotification = (userId, notification) => {
  if (io) {
    io.to(userId.toString()).emit("newNotification", notification);
  }
};

module.exports = { initSocket, sendNotification };
