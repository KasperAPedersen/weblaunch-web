import nodemailer from 'nodemailer';
import { Router } from 'express';

const route = new Router();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'mathiasholstseeger@gmail.com',
        pass: 'lpaf txrn tpkw vxyp'
    }
});

route.post('/contact', async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let subject = req.body.subject;
    let message = req.body.message;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log('blocked');
        return;
    }

    const phoneRegex = /^(?:\+45)?\s?(?:\d{2}\s?){4}$/;
    if (!phoneRegex.test(phone)) {
        console.log('blocked');
        return;
    }

    if(name === '' || name === null || name === undefined || (name.split(' ').length < 2)) {
        console.log('blocked');
        return;
    }

    if(phone.length >= 10 || phone.length <= 7) {
        console.log('blocked');
        return;
    }

    if(subject === '' || subject === null || subject === undefined) {
        console.log('blocked');
        return;
    }

    if(message === '' || message === null || message === undefined) {
        console.log('blocked');
        return;
    }

    const mailOptions = {
        from: email,
        to: 'mail@weblaunch.dk',
        subject: subject,
        text: `Navn: ${name}\nEmail: ${email}\nTelefon: ${phone}\n\nEmne: ${subject}\nBesked: ${message}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
        console.log('Error:', error);
        } else {
        console.log('Email sent:', info.response);
        }
    });

    res.redirect("/#contact");
});

export default route;