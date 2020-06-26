import app from '../app';
import config from '../config/config'
import socket from 'socket.io';

const expressServer = app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})

const io = socket(expressServer);

io.on('connection', socket => {
  socket.on('join', ({ login }, callback) => {
    socket.broadcast.emit('join', login);
  });

  socket.on('joinRoom', ({ login, roomId }) => {
    socket.join(roomId);
  });

  socket.on('sendMessage', ({ login, message, date, roomId }) => {
    io.to(roomId).emit('message', { sender: login, content: message, date: date, roomId: roomId })
  });

  socket.on('typing', ({ login, roomId }) => {
    io.to(roomId).emit('typing', {login, roomId} );
  });

  socket.on('stopTyping', ({ login, roomId }) => {
    io.to(roomId).emit('stopTyping', login);
  });

  socket.on('disconnect', () => {
    
  });
})