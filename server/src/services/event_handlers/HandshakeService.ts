import {Socket} from "socket.io";
import {ChatUserInfo} from "../../models/ChatUserInfo";
import socketInfosHolder from "../data_holders/SocketInfosHolder";
import {v4} from "uuid";
import socketMessageEmitterService from "../common/SocketMessageEmitterService";

class HandshakeService {
    public registerToHandshakeEvent(socket: Socket) {
        socket.on('handshake',  (userName, callback: (userId: string, users: ChatUserInfo[]) => void) => {
            console.log('Handshake received from ' + socket.id);
            console.log(`The new userName is ${userName}`);

            let allSocketIds = socketInfosHolder.getAllSocketIds();

            const reconnected = allSocketIds.includes(socket.id);
            if (reconnected) {
                console.info('This user has reconnected.');
                const userId = socketInfosHolder.getUserIdBySocketId(socket.id);

                if (userId) {
                    console.info('Sending callback for reconnect ...');
                    callback(userId, socketInfosHolder.allUserInfos);
                    return;
                }
            }

            //  create a new user
            const userId = v4();
            socketInfosHolder.allUserInfos.push({socketId: socket.id, userId: userId, userName})
            allSocketIds = socketInfosHolder.getAllSocketIds(); // Object.values(this.users);

            console.info(`Sending callback for handshake with uid ${userId} and users`, allSocketIds);
            callback(userId, socketInfosHolder.allUserInfos);

            socketMessageEmitterService.emitMessage(
                'user_connected',
                allSocketIds.filter(id => id !== socket.id),
                socketInfosHolder.allUserInfos
            )

        });
    }

}

const handshakeService = new HandshakeService();

export default handshakeService;
