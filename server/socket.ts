import { Server } from "socket.io";
import { Server as httpServer } from "http";
import * as crypto from "crypto";
import { Rooms } from "./types/Rooms";
import { Room } from "./types/Room";
import { User } from "./types/User";
import { emit } from "process";

const getIo = (server: httpServer) => {
  const io = new Server(server, {});

  io.on("connection", (socket) => {
    socket.on("create_room", (username: string) => {
      if (!username) return;
      const rooms = Rooms.getInstanse();
      const user = new User(username, socket.id);
      const room = new Room(user);
      rooms.add(room);
      console.log(room.id);
      socket.join(room.id);
      socket.emit("joined_room", room.id);
    });
    socket.on("join_room", (data: { username: string; roomId: string }) => {
      if (!(data.username && data.roomId)) return;
      const rooms = Rooms.getInstanse();
      const user = new User(data.username, socket.id);
      const room = rooms.get(data.roomId);
      console.info(room);
      if (!room) {
        socket.emit("error", { message: "Room Does Not Exists!" });
        return;
      } else {
        socket.join(data.roomId);
        room.join(user);
        socket.emit("joined_room", room.id);
        io.to(data.roomId).emit("user_joined", User);
      }
    });
  });
};

export default getIo;
