import {Server as HttpServer} from 'http';
import {Socket, Server} from 'socket.io';
import socketMessageEmitterService from "../common/SocketMessageEmitterService";
import handshakeService from "../event_handlers/HandshakeService";
import disconnectService from "../event_handlers/DisconnectService";

export class SocketServerInitializerService {

    constructor(server: HttpServer) {

        const theServer = new Server(server, {
            serveClient: false,
            pingInterval: 10_000,
            pingTimeout: 5_000,
            cookie: false,
            cors: {
                origin: '*'
            }
        })

        theServer.on('connect', this.startListeners);

        socketMessageEmitterService.setTheServer(theServer);

        console.info('Socket IO started ...');
    }

    public startListeners = (socket: Socket) => {
        console.info('Message received from ' + socket.id);

        handshakeService.registerToHandshakeEvent(socket);
        disconnectService.registerToDisconnectEvent(socket);
    }
}

