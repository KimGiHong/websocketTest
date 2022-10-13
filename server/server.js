const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const socketIo = require("socket.io")(server, {
    cors: {
        origin: process.env.FRONT_URL,
        credentials: true,
    },
});
const socket = require("./src/socket");
const port = process.env.PORT;

app.use(cors({ origin: process.env.FRONT_URL, credentials: true }));

socket(socketIo);
server.listen(port, () => {
    console.log(`server open ${process.env.BACK_URL} ${new Date().toLocaleString()}`)
})