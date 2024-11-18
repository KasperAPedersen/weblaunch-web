import Express from 'npm:express';

const app = new Express();

app.use(Express.static('public'));

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});