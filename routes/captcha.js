import axios from 'axios';
import { Router } from 'express';

const route = new Router();

route.post('/verify-recaptcha', async (req, res) => {
    try {
        const {token} = req.body;

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

export default route;