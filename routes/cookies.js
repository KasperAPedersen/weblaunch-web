import { Router } from 'express';

const route = new Router();

route.get('/setcookie', (req, res) => {
    res.cookie('myCookie', 'cookieValue', {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    });
    res.send('Cookie set successfully');
});

export default route;