const socketio=require("socket.io");
const express =require("express");
const http=require("http");
const app=express();
const PORT=process.env.PORT || 2001
const server=http.createServer(app);

const io=socketio(server,{
    cors:{
        origin:"*",
        methods:["GET", "POST", "OPTIONS"],
    },
});

server.listen(PORT,()=>{
    console.log(`Sunucu ${PORT} üzerinden sunulmaktadır.`);
//io üzerinden event gelirse ve bunun adı connection olursa gelen bir clienttir ve adı socket olsun 
    io.on("connection",(socket)=>{
        console.log("AAAAAA")
        console.log(socket.id); //şuan bağlanan arkadaş socket tüm bağlı olanlar için io 
        
        //socket.join("") bir oda oluşturmak için falan 
        //io.in(roomId).emit() ilgili odaya mesaj gönderimi
        
        //!Karşılama Mesajı Gönder .... 
        
        socket.emit("WELCOME_MESSAGE",`OOOOOoo, Sayın ${socket.id} hoşgeldin`);
        socket.on("NEW_BOOKMARK_EVENT",bookmark=>{
            console.log("Mesaj Geldi",bookmark);
            //io.emit("NEW_BOOKMARK_ADDED",bookmark)
            socket.broadcast.emit("NEW_BOOKMARK_ADDED",bookmark) //GÖNDEREN HARİÇ HERKESE GÖNDERİR
        })
    });
});