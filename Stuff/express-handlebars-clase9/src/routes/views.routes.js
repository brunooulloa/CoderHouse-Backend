import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {

    res.render('home', { style: 'home.css' });

});

router.get('/contacto', (req, res) => {

    res.render('contact');

});

router.get('/perfil', (req, res) => {

    const user = {

        name: 'Pepe',
        lastname: 'Argento',
        age: 25,
        location: {

            city: 'Buenos Aires'

        },

        style: 'profile.css'

    }

    res.render('profile', user);
});

const food = [
    
    {name: 'pizza', price: 100},
    {name: 'hamburguesa', price: 150},
    {name: 'empanadas', price: 50},
    {name: 'milanesa', price: 200},
    {name: 'ravioles', price: 250},

]

router.get('/comida', (req, res) => {

    const testUser = {

        name: 'Pepe',
        role: 'admin',

    }

    res.render('foodView', {

        name: testUser.name,
        isAdmin: testUser.role === 'admin' ? true : false,
        food: food
        
    });


});

router.get('/registro', (req, res) => {
    res.render('register');
});

export { router as viewsRouter };