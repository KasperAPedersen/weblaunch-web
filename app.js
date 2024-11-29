import mail  from './routes/mail.js';
import cards from './routes/cards.js';

import Express from 'express';
import axios from 'axios';
import cookieParser from 'cookie-parser';

const app = new Express();

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
            // reCAPTCHA verification successful
            console.log(`reCAPTCHA score: ${score}`);

            // Decide action based on score
            if (score > 0.5) {
                // Likely a human
                res.json({success: true, message: 'reCAPTCHA verification passed'});
            } else {
                // Likely a bot
                res.json({success: false, message: 'reCAPTCHA verification failed: possible bot activity'});
            }
        } else {
            // reCAPTCHA verification failed
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