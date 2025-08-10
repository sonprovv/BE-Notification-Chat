import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // cho phép mọi nguồn (có thể thay bằng domain cụ thể)
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Route test API
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("sendMessage", (msg) => {
    console.log("Received:", msg);
    io.emit("receiveMessage", msg); // gửi tới tất cả client
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Chạy server local (port Vercel sẽ tự set)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
