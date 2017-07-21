/**
 * Created by zivlevy on 18/07/2017.
 */

const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path')
let lampData = 0;

app.use(express.static( 'public'))

io.on('connection', (socket)=>{

    console.log('a user connected');
    socket.emit('lamp', lampData);

    socket.on('lamp',  (data) =>{
        console.log(data);
        socket.broadcast.emit('lamp',data);
        lampData=data;
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});