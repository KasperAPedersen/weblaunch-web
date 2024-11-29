import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, 'logs');
fs.mkdirSync(logsDir, {recursive: true});

const logStream = fs.createWriteStream(path.join(logsDir, `app-${new Date().toISOString().replace(/[:.]/g, '-')}.log`), {flags: 'a'});

const getIP = (req) => req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress || null;

const logger = {
    log: (req) => {
        const date = new Date();
        const logEntry = JSON.stringify({
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
            ip: getIP(req),
            method: req.method,
            request: req.originalUrl
        }) + '\n';
        logStream.write(logEntry);
    }
};

export default logger;