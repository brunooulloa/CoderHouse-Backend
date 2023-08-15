import { Router } from 'express';
import { __dirname } from '../utils.js';
import { ProductsMongo } from '../controllers/managers/prods.js';
const pm = new ProductsMongo()

const router = Router()

router.get('/',async(req,res)=>{
        const prods = await pm.getProducts();
        console.log(prods);
        res.render('home', { prods });
    })

router.get('/realtimeproducts',(req,res)=>{
    res.render('realtimeproducts');
})

router.get('/chat',(req,res)=>{
    res.render('chat');
})


export { router as viewsRouter };