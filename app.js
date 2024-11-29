import mail  from './routes/mail.js';
import cards from './routes/cards.js';
import common from './routes/common.js';
import captcha from './routes/captcha.js';

import Express from 'express';
import cookieParser from 'cookie-parser';

const app = new Express();
app.use(cookieParser());
app.use(Express.static('public'));
app.use(Express.urlencoded({extended: true}));
app.use(Express.json());

app.use([
    common,
    mail,
    cards,
    captcha
]);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});