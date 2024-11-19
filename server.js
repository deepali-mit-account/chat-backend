const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "https://chat-app-final-deepalik-mitedu-deepali-kishnanis-projects.vercel.app/", // Frontend URL
];

// Configure Express CORS middleware
app.use(
  cors({
    origin: allowedOrigins, // Allow only your frontend domain
    methods: ["GET", "POST"],
    credentials: true, // Allow cookies or credentials if needed
  })
);

// Configure Socket.IO CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins, // Allow only your frontend domain
    methods: ["GET", "POST"],
    credentials: true, // Allow cookies or credentials if needed
  },
});

// Default route
app.get("/", (req, res) => {
  res.send("Backend server is running and ready for connections!");
});

// WebSocket setup
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

