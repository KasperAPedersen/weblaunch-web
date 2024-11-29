import logger from '../logger/logger.js';
import { Router } from 'express';

const route = new Router();

route.use('/', (req, res, next) => {
    logger.log(req);
    next();
});

route.use('/', (req, res) => {
    res.render('index.ejs');
});

export default route;