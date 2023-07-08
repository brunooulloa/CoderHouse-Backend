import { Router } from 'express';
import { CartManager } from '../managers/CartManager.js';

const router = Router();
const cm = new CartManager(`../json/carts.json`);

const fieldsCheck = (req, res, next) => {
    let cart = req.body;
    if (!cart.title || !cart.description || !cart.code || !cart.price || !cart.stats || !cart.stock || !cart.category) {
        return res.json({ status: 'error', message: 'Debe ingresar todos los parametros' });
    } else {
        next();
    }
};

router.post('/', fieldsCheck, async (req, res) => {
    try {
        let cartCreated = await cm.addCart(req.body);
    } catch {

    }
});

router.get('/', async (req, res) => {

    try {

        let limit = Number(req.query.limit);

        if (!limit) {

            let result = await cm.getCarts();
            res.send(result);

        } else {

            let result = await cm.getCarts();
            res.send(result.slice(0, limit));

        }

    } catch (error) {

        throw new Error(error.message);

    }

});

router.get('/:cid', async (req, res) => {

    try {

        let cid = Number(req.params.cid);
        let result = await cm.getCartById(cid);
        res.send(result);

    } catch (error) {

        throw new Error(error.message);

    }

});

router.put('/:cid', fieldsCheck, async (req, res) => {

    try {

        let cid = Number(req.params.cid);
        let cart = req.body;
        let result = await cm.updateCart(cid, cart);
        result.id = cid;
        res.send(result);

    } catch (error) {

        throw new Error(error.message);

    }
    
});

router.post('/:cid/products/:pid', fieldsCheck, async (req, res) => {

});

export { router as cartsRouter };