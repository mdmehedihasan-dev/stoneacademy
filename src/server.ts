import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

//=============== Create server for socket.io ===============
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("join_chat", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send_message", (data) => {
    io.to(data.roomId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

//=============== Start Server===============
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
