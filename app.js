import mail  from './routes/mail.js';
import cards from './routes/cards.js';
import logger from './logger/logger.js';

import Express from 'express';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import requestIp from 'request-ip';

const app = new Express();
app.use(requestIp.mw());
app.use('/', (req, res, next) => {
    logger.log(req);
    next();
});

app.use(cookieParser());
app.use(Express.static('public'));
app.use(Express.urlencoded({extended: true}));
app.use(Express.json());

app.use([
    mail,
    cards
]);

app.post('/verify-recaptcha', async (req, res) => {
    try {
        // Get the reCAPTCHA token from the request body
        const {token} = req.body;

        // Make a POST request to the reCAPTCHA verify API
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        );

        const {success, score} = response.data;

        if (success) {
            if (score > 0.5) {
                res.json({success: true, message: 'reCAPTCHA verification passed'});
            } else {
                res.json({success: false, message: 'reCAPTCHA verification failed: possible bot activity'});
            }
        } else {
            res.json({success: false, message: 'reCAPTCHA verification failed'});
        }
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        res.status(500).json({success: false, message: 'Internal server error'});
    }
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});