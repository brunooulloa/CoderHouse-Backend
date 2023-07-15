import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { engine } from "express-handlebars";
import path from 'path';
import { __dirname } from './utils.js';
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const eSv = app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './views'));

const socketSv = new Server(eSv);

let messages = [];

socketSv.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('messageKey', (data) => {
        console.log(`Data received from client: ${data}`);
        messages.push({userId: socket.id, message: data});

        socketSv.emit('msgHistory', messages);
    });

    // socket.on('messageEvent', (data) => {
    //     console.log(`Data received from client: ${data}`);
    // });

    // setTimeout(() => {
    //     socket.emit('individualEvent', `Welcome ${socket.id}!`);
    // }, 4000);

    // socket.broadcast.emit('messageEveryoneExceptClient', 'Message for everyone except actual client');

    // socketSv.emit('messageEveryone', 'Message for everyone');
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(viewsRouter)