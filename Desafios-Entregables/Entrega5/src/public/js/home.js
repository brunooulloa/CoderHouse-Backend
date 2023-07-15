const socketCl = io();

socketCl.emit('individualEvent', 'Hello from client!')

socketCl.on('messageEveryoneExceptClient', (data) => {
    console.log(`Data received from server for everyone: ${data}`);
});

socketCl.on('messageEveryone', (data) => {
    console.log(`Data received from server for everyone: ${data}`);
});

socketCl.on('individualEvent', (data) => {
    console.log(`Data received from server: ${data}`);
});

const chatbox = document.getElementById('chatbox');
chatbox.addEventListener('keydown', (e) => {
    console.log(e.key);
    socketCl.emit('messageKey', e.key);
});

const send = document.getElementById('send');
send.addEventListener('click', () => {
    socketCl.emit('messageKey', chatbox.value);
    chatbox.value = '';
});

socketCl.on('msgHistory', (data) => {
    console.log(data)
});