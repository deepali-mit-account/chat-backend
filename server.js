const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const allowedOrigins = [
  "https://chat-app-final-three.vercel.app/", // Replace with your actual frontend URL
];

// Middleware for CORS
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  credentials: true, // Allow cookies if needed
}));

// Socket.IO CORS configuration
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

// Define a default route to handle GET requests to the root
app.get("/", (req, res) => {
  res.send("Backend server is running and ready for connections!");
});

// WebSocket connection setup
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

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

