import {Server as HttpServer} from 'http';
import {Socket, Server} from 'socket.io';
import socketMessageEmitterService from "../common/SocketMessageEmitterService";
import handshakeService from "../socket_event_handlers/HandshakeService";
import disconnectService from "../socket_event_handlers/DisconnectService";
import newMessageService from "../socket_event_handlers/NewMessageService";

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
        newMessageService.registerToNewMessageEvent(socket);
    }
}


