import { ChatMessage} from "../../../models/ChatMessage";
import {IMessageRepository} from "./IMessageRepository";

export const INITIAL_DUMMY_MESSAGES: ChatMessage[] = [
    { userId: '11111', messageKind: "Question", text: 'Q1Sample ?'},
    { userId: '22222', messageKind: "Answer", text: 'Q1ANSWER'}
]

class MessageRepositoryOverMemory implements IMessageRepository {
    private allTheMessages = INITIAL_DUMMY_MESSAGES;

    public getAllMessages(): ChatMessage[] {
        return this.allTheMessages.slice();
    }

    public addMessage(newChatMessage: ChatMessage): void {
        this.allTheMessages.push(newChatMessage);
    }
}

const messagesHolder = new MessageRepositoryOverMemory();

export default messagesHolder;
