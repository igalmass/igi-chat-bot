import {Socket} from "socket.io-client";
import {ChatUserInfo} from "../../models/ChatUserInfo";
import {chatInfoActions} from "../../store/ChatInfoSlice";
import {ChatMessage} from "../../models/ChatMessage";
import socketConnectionEventHandlers from "./SocketConnectionEventHandlers";
import {Dispatch} from "redux";

class SocketEventListenersService {

    public startListeners = (socket: Socket, dispatch: Dispatch): void => {
        //  user connected event
        socket.on('user_connected', (allUsers: ChatUserInfo[]) => {
            console.info('User connected, new user list received.', allUsers);
            dispatch(chatInfoActions.updateUsers(allUsers));
        })

        socket.on('user_disconnected', (allUsers: ChatUserInfo[]) => {
            console.info('get user_disconnected event with payload ', allUsers);
            dispatch(chatInfoActions.updateUsers(allUsers));
        });

        socket.on('update_messages', (allTheMessages: ChatMessage[]) => {
            dispatch(chatInfoActions.updateMessages(allTheMessages));
        });

        socketConnectionEventHandlers.registerToConnectionEvents(socket);
    };

}

const socketEventListenersService = new SocketEventListenersService();

export default socketEventListenersService;
