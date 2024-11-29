import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, {recursive: true});
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const filename = path.join(logsDir, `app-${timestamp}.log`);

const logStream = fs.createWriteStream(filename, {flags: 'a'});

let getIP = (req) => {
    return req.headers['x-forwarded-for']?.split(',').shift()
      || req.socket?.remoteAddress
      || null;
}

const logger = {
    log: (req) => {
        let date = new Date();
        const logEntry = JSON.stringify({
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
            ip: getIP(req),
            method: req.method,
            request: req.originalUrl
        }) + '\n';

        logStream.write(logEntry);
    },
    info: (message) => logger.log(message, 'INFO'),
    error: (message) => logger.log(message, 'ERROR'),
    warn: (message) => logger.log(message, 'WARN'),
    debug: (message) => logger.log(message, 'DEBUG')
};

export default logger;