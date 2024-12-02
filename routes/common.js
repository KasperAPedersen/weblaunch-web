import logger from '../logger/logger.js';
import { Router } from 'express';

const route = new Router();

route.use((req, res, next) => {
    // 1. Check Sec-Fetch-* headers
    /*const secFetchHeaders = ['sec-fetch-dest', 'sec-fetch-mode', 'sec-fetch-site', 'sec-fetch-user'];
    if (secFetchHeaders.some(header => !req.get(header))) {
        console.log("Blocked fetch header");
        return res.status(403).send('Forbidden');
    }

    // 2. Block empty User-Agent
    if (!req.get('user-agent')) {
        console.log("Blocked user-agent");
        return res.status(403).send('Forbidden');
    }

    // 3. Prevent HEAD requests
    if (req.method === 'HEAD') {
        console.log("Blocked head");
        return res.status(403).send('Forbidden');
    }*/
    logger.log(req);
    next();
});

route.use('/', (req, res) => {
    res.render('index.ejs');
});

export default route;