import {ALL_THE_MESSAGES, ChatMessage} from "../../models/ChatMessage";


class MessagesHolder {
    public allTheMessages = ALL_THE_MESSAGES;

    public addMessage(newChatMessage: ChatMessage): void {
        this.allTheMessages.push(newChatMessage);
    }
}

const messagesHolder = new MessagesHolder();

export default messagesHolder;
