import {Socket} from "socket.io";
import {ChatMessage} from "../../models/ChatMessage";
import socketInfosHolder from "../data_holders/UserInfosHolder";
import socketMessageEmitterService from "../common/SocketMessageEmitterService";
import messagesHolder from "../data_holders/MessagesHolder";
import chatMessageAnalyzer from "../ChatMessageAnalyzer";
import robinAutoAnswerService from "../robin_auto_answers/RobinAutoAnswerService";

class NewMessageService {
    public registerToNewMessageEvent (socket: Socket): void {
        socket.on('new_chat_message', (chatMessage: ChatMessage, callback: () => void) =>{
            console.log(`got chat message: ${JSON.stringify(chatMessage)}`);
            chatMessageAnalyzer.updateMessageKind(chatMessage);
            messagesHolder.addMessage(chatMessage);
            callback();

            //  todo: for efficiency, we can send only the new message.
            //        however, what happens if a user is disconnected and then reconnected ? he would not see some messages.
            //        (we would probably need to solve that with checksums of messages, see the last sent message when user connects etc.
            //        so, for simplicity and for saving the reconciliation process, we will pass all the messages.

            robinAutoAnswerService.tryToAutoAnswer(chatMessage);

            socketMessageEmitterService.emitMessage(
                'update_messages',
                socketInfosHolder.getAllSocketIds(),
                messagesHolder.allTheMessages);



        });
    }
}

const newMessageService = new NewMessageService();

export default newMessageService;
