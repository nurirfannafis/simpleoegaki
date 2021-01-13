const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const users = {};
// Set static folder
function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }
app.use(express.static(path.join(__dirname, 'HTML')));
// Run when client connects
io.on('connection', socket => {
   console.log('connected');
   socket.on('send-stroke',({x1,y1,x2,y2})=>{
    socket.broadcast.emit('stroke',{x1,y1,x2,y2});
   })
   
})
const PORT = process.env.PORT || 7000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));