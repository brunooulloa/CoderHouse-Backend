const socketClient = io()
const username = document.getElementById('username')
const form = document.getElementById('form')
const input = document.getElementById('mensaje')
const chat = document.getElementById('chat')

if (!usuario) {
    Swal.fire({
        title: 'Bienvenido a la tienda',
        text: 'Ingresa tu usuario',
        input: 'text',
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitas ingresar tu Nombre'
            }
        }
    }).then(username => {
        user = username.value
        username.innerHTML = user
        socketClient.emit('newUser', user)
    })
}

form.onsubmit = (e) => {
    e.preventDefault()
    const info = {
        user: usuario,
        message: input.value
    }
    console.log(info)
    socketClient.emit('message', info)
    input.value = ' '

}

socketClient.on('chat', mensaje => {
    const chatrender = mensaje.map(e => {
        return `<p><strong>${e.user}</strong>${e.message}`
    }).join(' ')
    chat.innerHTML = chatrender
})

socketClient.on('broadcast', usuario => {
    Toastify({
        text: `Ingreso ${usuario} al chat`,
        duration: 5000,
        position: 'right',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
        }
    }).showToast()
})