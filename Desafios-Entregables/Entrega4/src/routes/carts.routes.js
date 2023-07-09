import { Router } from 'express';
import { CartManager } from '../managers/CartManager.js';
import { ProductManager } from '../managers/ProductManager.js';

const router = Router();
const cm = new CartManager(`../json/carts.json`);
const pm = new ProductManager(`../json/products.json`);

router.post('/', async (req, res) => {

    try {

        let cartCreated = await cm.save();
        res.json({ status: 'success', data: cartCreated });

    } catch (error) {

        res.json({ status: 'error', message: error.message });
        throw new Error(error.message);

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

        let cid = req.params.cid;
        let result = await cm.getCartById(cid);
        res.send(result);

    } catch (error) {

        throw new Error(error.message);

    }

});

router.put('/:cid', async (req, res) => {

    try {

        let cid = req.params.cid;
        let cart = req.body;
        let result = await cm.updateCart(cid, cart);
        result.id = cid;
        res.send(result);

    } catch (error) {

        throw new Error(error.message);

    }
    
});

router.post('/:cid/products/:pid', async (req, res) => {
    
    try {

        let cid = req.params.cid;
        let pid = req.params.pid;
        let cart = await cm.getCartById(cid);
        let prod = await pm.getProductById(pid);
        let prods = cart.products;
        let isProdInCart = cart.products.find((p) => p.id == pid)

        if (isProdInCart) {
            
            let index = prods.findIndex((p) => p.id == pid);
            cart.products[ index ].quantity++;
            cm.saveCarts();
            res.json({ status: 'success', data: cart });

        } else {

            const newProd = {
                id: pid,
                quantity: 1
            }

            cart.products.push(newProd);
            cm.saveCarts()
            res.json({ status: 'success', data: cart });

        }

    } catch (error) {

        console.error(error.message);

    }
        
});

export { router as cartsRouter };