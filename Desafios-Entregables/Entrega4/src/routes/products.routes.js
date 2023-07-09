import { Router } from 'express';
import { ProductManager } from '../managers/ProductManager.js';
import { __dirname } from '../utils.js';

const router = Router();

const pm = new ProductManager(`../json/products.json`);

const fieldsCheck = (req, res, next) => {
    let prod = req.body;
    if (!prod.title || !prod.description || !prod.code || !prod.price || !prod.stock || !prod.category) {
        return res.json({ status: 'error', message: 'Debe ingresar todos los parametros' });
    } else {
        next();
    }
};

router.post('/', fieldsCheck, async (req, res) => {

    try {

        let prod = req.body;
        let newProd = {
            title: prod.title,
            description: prod.description,
            code: prod.code,
            price: prod.price,
            status: prod.status || true,
            stock: prod.stock,
            category: prod.category,
            thumbnail: prod.thumbnail
        }
        let productCreated = await pm.addProduct(newProd);
        res.json({ status: 'success', data: productCreated });

    } catch (error) {

        res.json({ status: 'error', message: error.message });
        throw new Error(error.message);

    }

});

router.get('/', async (req, res) => {

    try {

        let limit = Number(req.query.limit);

        if (!limit) {

            let result = await pm.getProducts();
            res.json({ status: 'success', data: result })

        } else {

            let result = await pm.getProducts();
            res.json({ status: 'success', data: result.slice(0, limit) });

        }

    } catch (error) {

        res.json({ status: 'error', message: error.message });
        throw new Error(error.message);

    }

});

router.get('/:pid', async (req, res) => {

    try {

        let pid = req.params.pid;
        let result = await pm.getProductById(pid);
        res.json({ status: 'success', data: result });

    } catch (error) {

        res.json({ status: 'error', message: error.message });
        throw new Error(error.message);

    }

});

router.put('/:pid', fieldsCheck, async (req, res) => {

    try {

        let pid = req.params.pid;
        let product = req.body;
        let result = await pm.updateProduct(pid, product);
        await pm.saveProducts();
        res.json({ status: 'success', data: result });

    } catch (error) {
        
        res.json({ status: 'error', message: error.message });
        throw new Error(error.message);

    }
    
});

router.delete('/:pid', async (req, res) => {
    
    try {

        let pid = req.params.pid;
        let result = await pm.deleteProduct(pid);
        res.json({ status: 'success', data: result });

    } catch (error) {

        res.json({ status: 'error', message: error.message });
        throw new Error(error.message);

    }
});

export { router as productsRouter };