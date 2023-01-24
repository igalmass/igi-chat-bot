import {Socket} from "socket.io";
import {ChatMessage} from "../../models/ChatMessage";
import socketInfosHolder from "../data_holders/UserInfosHolder";
import socketMessageEmitterService from "../common/SocketMessageEmitterService";
import messagesHolder from "../data_holders/MessagesHolder";
import chatMessageAnalyzer from "../ChatMessageAnalyzer";

class NewMessageService {
    public registerToNewMessage (socket: Socket): void {
        socket.on('new_chat_message', (chatMessage: ChatMessage, callback: () => void) =>{
            console.log(`got chat message: ${JSON.stringify(chatMessage)}`);
            chatMessageAnalyzer.updateMessageKind(chatMessage);
            messagesHolder.addMessage(chatMessage);
            callback();

            socketMessageEmitterService.emitMessage(
                'update_messages',
                socketInfosHolder.getAllSocketIds(),
                messagesHolder.allTheMessages);
        });
    }
}

const newMessageService = new NewMessageService();

export default newMessageService;
