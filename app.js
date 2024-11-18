import Express from 'npm:express';
import https from 'https';
import fs from 'fs';
import path from 'path';

const app = new Express();

// SSL Certificates
const sslOptions = {
    key: fs.readFileSync(path.resolve('path/to/your/private.key')),
    cert: fs.readFileSync(path.resolve('path/to/your/certificate.crt'))
};

app.use(Express.static('public'));

https.createServer(sslOptions, app).listen(3000, () => {
    console.log('Server started on https://localhost:3000');
});