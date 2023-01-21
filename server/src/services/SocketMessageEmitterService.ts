import {ROBIN_THE_BOT_SOCKET_ID} from "../consts/RobinTheBotConsts";
import {Server} from "socket.io";

class SocketMessageEmitterService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function

    public constructor(private theServer: null | Server) {

    }

    public setTheServer(server: Server) {
        this.theServer = server;
    }

    public EmitMessage = (name: string, socketIds: string[], payload: any): void => {
        console.info('Emitting event: ' + name + ' with payload ', payload);
        socketIds = socketIds.filter((socketId) => ROBIN_THE_BOT_SOCKET_ID !== socketId);
        socketIds.forEach(socketId => payload ? this.theServer?.to(socketId).emit(name, payload) : this.theServer?.to(socketId).emit(name));
    }

}

const socketMessageEmitterService = new SocketMessageEmitterService(null);

export default socketMessageEmitterService;
