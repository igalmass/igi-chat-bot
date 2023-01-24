import {Socket} from "socket.io";
import socketInfosHolder from "../repositories/UserInfosHolder";
import socketMessageEmitterService from "../common/SocketMessageEmitterService";

class DisconnectService {
    public registerToDisconnectEvent(socket: Socket) {
        socket.on('disconnect', () => {

            console.log(`disconnect received from socketId ${socket.id}`);

            const userId = socketInfosHolder.getUserIdBySocketId(socket.id);

            if (userId) {
                socketInfosHolder.allUserInfos = socketInfosHolder.allUserInfos.filter(userInfo => userInfo.userId !== userId);
                socketMessageEmitterService.emitMessage(
                    'user_disconnected',
                    socketInfosHolder.getAllSocketIds(),
                    socketInfosHolder.allUserInfos);
            }
        });
    }

}

const disconnectService = new DisconnectService();

export default disconnectService;
