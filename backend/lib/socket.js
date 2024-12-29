import { Server } from "socket.io";
import http from "node:http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*"
    }
})

const socketMap = {}

export const getSocketIdByUserId = (userId)=>{
    return socketMap[userId];
}

io.on("connection",(s)=>{
    console.log("A user connected",s.id);
    const userId = s.handshake.query.userId;
    if(userId){
        socketMap[userId] = s.id;
    }
    io.emit("onlineUsers",Object.keys(socketMap));
    s.on("disconnect",()=>{
        console.log("A user disconnected",s.id);
        delete socketMap[userId];
        io.emit("onlineUsers",Object.keys(socketMap));
    })
    console.log("socketMap",socketMap);
})

export {io,server,app}