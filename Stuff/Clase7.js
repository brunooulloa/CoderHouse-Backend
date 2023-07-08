import express from "express";

//definir el puerto
const port = 8080;

//definir la app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ejecutamos y levantamos el servidor
app.listen(port, () => console.log(`Server listening on port ${port}`));

let users = []

//creamos las rutas
app.get('/usuarios', (req, res) => {
    res.send(users);
});

//post:crear un recurso
app.post('/usuarios', (req, res) => {
    const user = req.body;
    // console.log('user', user);
    users.push(user);
    res.send(`Usuario ${user.nombre} agregado correctamente`);
});