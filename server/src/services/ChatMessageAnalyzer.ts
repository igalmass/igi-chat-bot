import {ChatMessage} from "../models/ChatMessage";

class ChatMessageAnalyzer {
    public updateMessageKind(chatMessage: ChatMessage): void {
        if (!chatMessage) {
            return;
        }

        if (chatMessage.text.trim().endsWith('?')) {
            chatMessage.messageKind = "Question";
        } else {
            chatMessage.messageKind = "Answer";
        }
    }

}

const chatMessageAnalyzer = new ChatMessageAnalyzer();

export default chatMessageAnalyzer;
