const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { SerialPort, ReadlineParser } = require('serialport');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));
app.use(express.json());

const PORT = 3000;


//SOCKET *********************************************

io.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado`);

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    })
});

function emitCoords(data) {
    const coords = {
        X: Number(data.split(':')[1].split(',')[0]),
        Y: Number(data.split(':')[1].split(',')[1]),
        Z: Number(data.split(':')[1].split(',')[2])
    }

    io.emit('coords', coords);
}

function emitMove(data) {
    const move = data.split(':')[1];

    io.emit('move', move);
}


//SERIAL PORT *********************************************

const port = new SerialPort({
    path: 'COM5',
    baudRate: 9600,
});

const parser = new ReadlineParser({ delimiter: '\r\n' });
port.pipe(parser);

parser.write("START\n");

parser.on('data', (data) => {
    if (String(data).includes('JOYSTICK')) {
        emitCoords(data);
    } else if (String(data).includes('MOVE')) {
        emitMove(data);
    }
});
port.on('error', (err) => {
    console.log('Error: ', err.message);
});


// SERVER LISTEN *********************************************

server.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto 3000');
})