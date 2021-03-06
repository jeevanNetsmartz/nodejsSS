var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket)=> {
    console.log("socket connected to http://localhost:8080");
    socket.on("join-message", (roomId) => {
        socket.join(roomId);
        console.log("User joined in a room : " + roomId);
    })

    socket.on("screen-data", function(data) {
        data = JSON.parse(data);
        var room = data.room;
        var imgStr = data.image;
        socket.broadcast.to(room).emit('screen-data', imgStr);
    })

    socket.on("canvas", function(data) {
        console.log(data)
        // data = JSON.parse(data);
        // var room = data.room;
        // var imgStr = data.image;
        io.sockets.emit("canvas", 'nhnnnnnnnnnnnnnnnnnnn')
        // socket.broadcast.emit("canvas", 'nhnnnnnnnnnnnnnnnnnnn');
    })
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Started on : "+ server_port);
})