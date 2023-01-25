import {Socket} from "socket.io-client";
import {ChatUserInfo} from "../../models/ChatUserInfo";
import {ChatMessage} from "../../models/ChatMessage";
import {chatInfoActions} from "../../store/ChatInfoSlice";
import {Dispatch} from "redux";

class HandshakeService {
    public sendHandshake = (socket: Socket, userName: string, dispatch: Dispatch) => {
        console.log('sending handshake ...');
        socket.emit('handshake', userName, (userId: string, allUserInfos: ChatUserInfo[], allChatMessages: ChatMessage[]) => {
            console.log('got handshake response');
            dispatch(chatInfoActions.updateUsers(allUserInfos));
            dispatch(chatInfoActions.updateMessages(allChatMessages));
        });
    }

}

const handshakeService = new HandshakeService();

export default handshakeService;
