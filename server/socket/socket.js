const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:8000"],
        methods: ["GET", "POST"]
    }
});

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
const userSocketMap = {};

io.on('connection', (socket) => {
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log("A user disconnected", socket.id);
        if (userId && userSocketMap[userId]) {
            delete userSocketMap[userId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    // Error handling
    socket.on('error', (err) => {
        console.error("Socket error:", err.message);
    });
});

module.exports = { app, io, server, getReceiverSocketId };
