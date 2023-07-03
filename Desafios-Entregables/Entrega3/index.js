import { ProductManager } from './ProductManager.js';
import express from 'express';

const app = express();
const PORT = 8080;
const pm = new ProductManager(`./products.json`);

app.listen(PORT, () => {
    console.log(`Servidor express corriendo en el puerto ${PORT}`);
});

app.get('/products', async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        if (!limit) {
            let result = await pm.getProducts();
            res.send(result);
        } else {
            let result = await pm.getProducts();
            res.send(result.slice(0, limit));
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        let pid = parseInt(req.params.pid);
        let result = await pm.getProductById(pid);
        res.send(result);
    } catch (error) {
        throw new Error(error.message);
    }
});