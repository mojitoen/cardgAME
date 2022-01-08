const { SSL_OP_COOKIE_EXCHANGE } = require('constants');
const express = require('express');

const app = express();

const http = require('http');

const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server);



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket) => {

    socket.on('usrname', (usrname) => {
        console.log(usrname, "connected");
        socket.emit('userconnected', usrname);
    })


    //Listens for users attempting to reserve a slot and sends results back to clients so the innerHTML can change.
    socket.on('slot1reserved', (usrname) => {
        console.log(usrname, "reserved slot 1");
        io.emit("slot1reserved", usrname);
        
    })

    socket.on('slot2reserved', (usrname) => {
        console.log(usrname, "reserved slot 2");
        io.emit("slot2reserved", usrname);
        
    })



    socket.on('pressedready', (usrname) => {
        console.log(usrname, "pressed ready")
        socket.emit('usrpressedready', "user pressed ready")
        
    })



   
   

   


});




server.listen(3000, () => {
    console.log("listening on *:3000");
});