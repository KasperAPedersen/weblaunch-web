import mail  from './routes/mail.js';
import cards from './routes/cards.js';
import Models from './orm/Models.js';

import Express from 'express';

const app = new Express();

app.use(Express.static('public'));
app.use(Express.urlencoded({extended: true}));

app.use([
    mail,
    cards
]);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});