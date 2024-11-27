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

route.post('/sendmail', async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let subject = req.body.subject;
    let message = req.body.message;

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