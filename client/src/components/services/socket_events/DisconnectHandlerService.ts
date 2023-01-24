import {socketInfoActions} from "../../../store/SocketInfoSlice";
import {Socket} from "socket.io-client";
import {Dispatch} from "redux";

class DisconnectHandlerService {
    public disconnectHandler = (theSocket: Socket, dispatch: Dispatch): void => {
        if (theSocket) {
            theSocket.disconnect();
        }
        dispatch(socketInfoActions.setSocket(undefined));
        dispatch(socketInfoActions.setSocketId(undefined));
    }


}

const disconnectHandlerService = new DisconnectHandlerService();

export default disconnectHandlerService;
