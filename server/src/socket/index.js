const fs = require("fs");

const SOCKET_EVENT = {
  JOIN_ROOM: "JOIN_ROOM",
  UPDATE_NICKNAME: "UPDATE_NICKNAME",
  SEND_MESSAGE: "SEND_MESSAGE",
  RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
  SEND_FILE: "SEND_FILE"
};

module.exports = function (socketIo) {
  socketIo.on("connection", function (socket) {
    console.log("socket connection succeeded.");
    const roomName = "room 1"; 
    Object.keys(SOCKET_EVENT).forEach(typeKey => {
      const type = SOCKET_EVENT[typeKey];

      socket.on(type, requestData => {
        const firstVisit = type === SOCKET_EVENT.JOIN_ROOM;

        if (firstVisit) {
          socket.join(roomName);
        }

        const responseData = {
          ...requestData,
          type,
        };
        socketIo.to(roomName).emit(SOCKET_EVENT.RECEIVE_MESSAGE, responseData);
        console.log(responseData)
      });
    });
    
    // socket.on("upload", (file) => {
    //   // console.log(file.toString("utf8"));
    //   socketIo.emit(SOCKET_EVENT.RECEIVE_MESSAGE, file)
    // })

    socket.on("disconnect", reason => {
      console.log(`disconnect: ${reason}`);
    });
  });
};
