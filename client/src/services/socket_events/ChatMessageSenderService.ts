import userInfoService from "../utils/UserInfoService";
import {ChatMessage} from "../../models/ChatMessage";
import {Socket} from "socket.io-client";
import {ChatUserInfo} from "../../models/ChatUserInfo";

class ChatMessageSenderService {
    public sendMessage = (messageText: string, allUserInfos: ChatUserInfo[], loggedInUserId: string | undefined, theSocket: Socket): void => {
        const userId = userInfoService.getLoggedInUserIdBySocketId(allUserInfos, theSocket?.id) as string;
        const chatMessage: ChatMessage = {text: messageText, userId: userId};
        (theSocket as Socket).emit('new_chat_message', chatMessage, () => {
            console.log('got new_chat_message response ...');
        });
    }

}

const chatMessageSenderService = new ChatMessageSenderService();

export default chatMessageSenderService;
