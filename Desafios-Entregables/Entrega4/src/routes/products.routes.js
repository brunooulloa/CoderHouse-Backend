import { Router } from 'express';
import { ProductManager } from '../controllers/ProductManager.js';
import { __dirname } from '../utils.js';

const router = Router();

const pm = new ProductManager('../../data/products.json');

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

            title: typeof prod.title === 'string' ? prod.title : toString(prod.title),
            description: typeof prod.description === 'string' ? prod.description : toString(prod.description),
            code: typeof prod.code === 'string' ? prod.code : toString(prod.code),
            price: typeof prod.price === 'number' ? prod.price : Number(prod.price),
            status: typeof prod.status === 'boolean' ? prod.status : true,
            stock: typeof prod.stock === 'number' ? prod.stock : Number(prod.stock),
            category: typeof prod.category === 'string' ? prod.category : toString(prod.category),
            thumbnail: [ prod.thumbnail ] || [ 'Sin imagen' ]

        };

        let productCreated = await pm.addProduct(newProd);
        res.json({ status: 'success', data: productCreated });

    } catch (error) {

        res.json({ status: 'error', message: error.message });
        throw error(error.message);

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
        throw error(error.message);

    }

});

router.get('/:pid', async (req, res) => {

    try {

        let pid = req.params.pid;
        let result = await pm.getProductById(pid);
        res.json({ status: 'success', data: result });

    } catch (error) {

        res.json({ status: 'error', message: error.message });
        throw error(error.message);

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
        throw error(error.message);

    }
    
});

router.delete('/:pid', async (req, res) => {
    
    try {

        let pid = req.params.pid;
        let result = await pm.deleteProduct(pid);
        res.json({ status: 'success', data: result });
        

    } catch (error) {

        res.json({ status: 'error', message: error.message });
        throw error(error.message);

    }
});

export { router as productsRouter };