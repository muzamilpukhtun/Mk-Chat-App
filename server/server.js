const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "server/config/config.env" });
}

const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const connectToMongoDB = require('./config/database');
const { app, server } = require('./socket/socket');

// PORT should be assigned after calling dotenv.config() because we need to access the env variables.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", authRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1", userRoutes);

const staticPath = path.join(__dirname, '../client/dist');
console.log(`Serving static files from: ${staticPath}`);
app.use(express.static(staticPath));

app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, "../client/dist/index.html");
    console.log(`Sending file: ${indexPath}`);
    res.sendFile(indexPath);
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});
