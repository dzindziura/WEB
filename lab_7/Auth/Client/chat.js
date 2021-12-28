function createAndPostMessage (author, messageText, isMine = false) {
  const messageBlock = ChatService.CreateMessageBlock(author, messageText, isMine);

  const chatWrapper = document.querySelector('#chat-wrapper');
  chatWrapper.appendChild(messageBlock);
}

function updateActiveUsersList(activeUsers) {
  const usersList = ChatService.CreateActiveUsersBlock(activeUsers);

  const chatHeader = document.querySelector('#chat-header');
  if (chatHeader.lastChild) {
    console.log(chatHeader.lastChild)
    chatHeader.removeChild(chatHeader.lastChild);
  }

  chatHeader.appendChild(usersList);
}

window.onload = async () => {
  const form = document.getElementById('messageForm');
  form.addEventListener('submit', onFormSubmit);

  // під'єднуємось до сервера - створюєм новий сокет
  const socket = io.connect('http://localhost:8080');

  socket.emit('firstJoin', '');

  socket.on('welcome', data => {
    createAndPostMessage(data.author, data.messageText);
  });

  socket.on('userJoined', data => {
    createAndPostMessage(data.author, data.messageText);
  });

  socket.on('messageFromAnotherUser', data => {
    createAndPostMessage(data.author, data.messageText);
  });

  socket.on('userLeaves', data => {
    createAndPostMessage(data.author, data.messageText);
  });

  socket.on('userCountChanged', data => {
    updateActiveUsersList(data);
  });

  function onFormSubmit (ev) {
    ev.preventDefault();
    const messageText = form.message.value;
    form.reset();

    socket.emit('newMessage', messageText);
    createAndPostMessage('You', messageText, true);
  }
}
