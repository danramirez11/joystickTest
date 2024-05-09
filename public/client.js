const PORT = 3000;
// eslint-disable-next-line no-undef
const socket = io(`http://localhost:${PORT}`);

// eslint-disable-next-line no-undef
const coord = document.querySelector('.coords');
// eslint-disable-next-line no-undef
const move = document.querySelector('.move');

socket.on('coords', (data) => {
    coord.textContent = `X: ${data.X} Y: ${data.Y} Z: ${data.Z}`;
});

socket.on('move', (data) => {
    move.textContent = `MOVE: ${data}`;
});
