const PORT = 3000;
const socket = io(`http://localhost:${PORT}`);

const coord = document.querySelector('.coords');
const move = document.querySelector('.move');

socket.on('coords', (data) => {
    coord.textContent = `X: ${data.X} Y: ${data.Y} Z: ${data.Z}`;
});

socket.on('move', (data) => {
    move.textContent = `MOVE: ${data}`;
});

const button = document.querySelector('.button');
