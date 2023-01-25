// https://github.com/joeythelantern/Socket-IO-Basics/blob/master/server/src/server.ts
// https://www.youtube.com/watch?v=-aTWWl4klYE&t=543s

import http from 'http';
import express from 'express';
import { SocketServerInitializerService } from './services/socket_server_init/SocketServerInitializerService';
import socketInfosHolder from "./services/repositories/users/UserInfosHolder";

const application = express();

/** Server Handling */
const httpServer = http.createServer(application);

/** Start Socket */
new SocketServerInitializerService(httpServer);

/** Log the request */
application.use((req, res, next) => {
    console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
application.use(express.urlencoded({ extended: true }));
application.use(express.json());

/** Rules of our API */
application.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Healthcheck */
application.get('/ping', (req, res, next) => {
    return res.status(200).json({ hello: 'world!' });
});

/** Socket Information */
application.get('/status', (req, res, next) => {
    return res.status(200).json({ users: socketInfosHolder.allUserInfos });
});

/** Error handling */
application.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const PORT = 1337;
/** Listen */
httpServer.listen(PORT, () => console.info(`Server is running`));