// Crear un proyecto en Express.js que escuche en el puerto 8080 y configure los endpoints solicitados.

// Instalaremos las dependencias de Express.js y nodemon (para reiniciar automáticamente el servidor cuando cambiemos archivos):
// npm install express nodemon --save-dev

// Creamos un archivo `index.js` en la raíz del directorio, el cual será nuestro punto de entrada para el servidor. 
// Podemos configurarlo de la siguiente manera:

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080; // Lee el puerto desde una variable de ambiente o utiliza el puerto 8080 por defecto

// Manejador para la ruta '/bienvenida'
app.get('/bienvenida', (req, res) => {
  res.send('<div style="color: blue;">¡Bienvenido!</div>'); // Envía una respuesta con un mensaje '¡Bienvenido!' en un div con color azul
});

// Manejador para la ruta '/usuario'
app.get('/usuario', (req, res) => {
  const usuario = {
    nombre: 'Juan',
    apellido: 'Pérez',
    edad: 31,
    correo: 'juanperez@mail.com'
  }
  res.json(usuario); // Envía una respuesta en formato JSON con la información del objeto 'usuario'
});

// Inicia el servidor y lo hace escuchar en el puerto especificado
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));

// Podemos ejecutar el servidor usando el comando `nodemon` (estando en la misma ubicación del archivo index.js):
// npx nodemon

// Podemos acceder a los endpoints:

// - http://localhost:8080/bienvenida: Devuelve un html con las palabras "¡Bienvenido!" en color azul.
// - http://localhost:8080/usuario: Devuelve un objeto JSON con los datos de un usuario falso.