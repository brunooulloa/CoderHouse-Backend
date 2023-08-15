import express from 'express';
import { config } from './config/config.js';
import { cartsRouter } from './routes/carts.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { viewsRouter } from './routes/views.routes.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import './config/dbConnection.js'
import { __dirname } from './utils.js';
import { ProductsMongo } from './controllers/managers/prods.js';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/products', ProductsMongo);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const eSv = app.listen(config.server.port, () => console.log(`Express server listening on port ${config.server.port}`));

const socketSv = new Server(eSv);

const pm = new ProductsMongo();

socketSv.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');
    socket.emit('products', await pm.getProducts());
    socket.on('addProduct', async (data) => {
        await pm.addProduct(data);
        socket.emit('products', await pm.getProducts());
    });

    socket.on('deleteProduct', async (id) => {
        await pm.deleteProduct(id);
        socket.emit('products', await pm.getProducts());
    })

    socket.on('newUser', (data) => {
        console.log('User: ', data);
        socket.broadcast.emit('newUser', data);
    })

    socket.on('disconnect', () => {
        console.log(`Cliente con ID ${ socket.id } desconectado`);
    });

    socket.on('message', async (data) => {
        await mm.createMessage(data);
        socketSv.emit('chat', await mm.getMessages());
    })
});