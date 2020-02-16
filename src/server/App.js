const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const request = require('request');

const port_num = process.env.PORT || 80;
let server_timer = 0;

app.set('view engine', 'pug');
app.set('views', 'routes');

//server time counter
setInterval(() => {
    server_timer++;
}, 1000);

app.get('/', (req, res) => {
    res.render('index');
});
server.listen(port_num, () => {
    console.log('server running on ' + port_num +' port');
});

io.on('connection', socket => {

    socket.on('connect_', data => {
        console.log('Client connected : ' + socket.id);
    });

    socket.on('test_emit', data=>{
        this.socket = setInterval(() => {
            socket.emit('test_emit_res', server_timer);
        }, 1000);
    });

    socket.on('forcedisconnect', () => {
        socket.disconnect();
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected : ' + socket.id);
        clearInterval(this.socket);
    });
});