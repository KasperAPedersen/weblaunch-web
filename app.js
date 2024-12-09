import mail  from './routes/mail.js';
import cards from './routes/cards.js';
import common from './routes/common.js';
import captcha from './routes/captcha.js';

import Express from 'express';

const app = new Express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(Express.static('public'));
app.use(Express.urlencoded({extended: true}));
app.use(Express.json());

app.use([
    mail,
    cards,
    captcha,
    common
]);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});