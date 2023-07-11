import { Router } from 'express';

const router = new Router();

const users = [];

router.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.send('User created');
});

router.get('/', (req, res) => {
    res.send(users);
})

export { router as usersRouter}