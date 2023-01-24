import {io, Socket} from "socket.io-client";
import {THE_SOCKET_SETTINGS} from "../../_settings/ChatSocketSettings";
import {socketInfoActions} from "../../../store/SocketInfoSlice";
import socketEventListenersService from "./SocketEventListenersService";
import handshakeService from "./HandshakeService";
import {Dispatch} from "redux";

class ConnectHandlerService {
    public connect = (userName: string, dispatch: Dispatch) => {
        const newSocket: Socket = io(THE_SOCKET_SETTINGS.uri, THE_SOCKET_SETTINGS.opts);
        newSocket.on('connect', () => {
            dispatch(socketInfoActions.setSocketId(newSocket.id))
        })
        newSocket.connect();
        dispatch(socketInfoActions.setSocket(newSocket));
        socketEventListenersService.startListeners(newSocket, dispatch);
        handshakeService.sendHandshake(newSocket, userName, dispatch);
    }

}

const connectHandlerService = new ConnectHandlerService();

export default connectHandlerService;
