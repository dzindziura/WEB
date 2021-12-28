const config = require('../../config');
const ChatUser = require('./chatuser');

const createChatServer = (app) => require('http').createServer(app);
const createIO = (chatServer) => require('socket.io')(chatServer);

const activeUsers = [];

module.exports = (expressApp, cookieParser, session) => {
  const chatServer = createChatServer(expressApp);
  const io = createIO(chatServer);

  chatServer.listen(config.PORT);
  console.log(`App listen ${config.PORT}`);

  //Прив'язуєм соккет до сесії
  io.use(function(socket, next) {
    const req = socket.handshake;
    const res = {};

    cookieParser(req, res, function(err) {
      if (err) return next(err);
      session(req, res, next);
    });
  });

  io.on('connection', async function (socket) {
    if (!socket.handshake.session.passport) { return; }

    const {user: {username, id}} = socket.handshake.session.passport;

    console.log('IO connection: ', username, id)
    // const allUsers = await ChatUser.find();

    socket.on('firstJoin', function (data) {
      console.log('User joins: ', username);
      activeUsers.push(username);
      console.log(activeUsers);

      socket.emit('welcome', {author: 'Server', messageText: `Welcome to the chat, ${username}!`});
      socket.broadcast.emit('userJoined', {author: 'Server', messageText: `${username} has connected to the chat`});

      io.sockets.emit('userCountChanged', activeUsers);
    });

    socket.on('newMessage', message => {
      console.log('message received from', username, message);
      socket.broadcast.emit('messageFromAnotherUser', {author: username, messageText: message});
    })

    socket.on('disconnect', function (data) {
      console.log('User leaves: ', username);

      const userIndex = activeUsers.findIndex(user => user === username);
      activeUsers.splice(userIndex, 1);

      console.log(activeUsers);
      socket.broadcast.emit('userCountChanged', activeUsers);
      socket.broadcast.emit('userLeaves', {author: 'Server', messageText: `${username} has disconnected from the chat`});
    })
  });
}

