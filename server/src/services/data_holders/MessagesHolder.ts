import { ChatMessage} from "../../models/ChatMessage";

export const INITIAL_DUMMY_MESSAGES: ChatMessage[] = [
    { userId: '11111', messageKind: "Question", text: 'Q1Sample ?'},
    { userId: '22222', messageKind: "Answer", text: 'Q1ANSWER'}
]

class MessagesHolder {
    public allTheMessages = INITIAL_DUMMY_MESSAGES;

    public addMessage(newChatMessage: ChatMessage): void {
        this.allTheMessages.push(newChatMessage);
    }
}

const messagesHolder = new MessagesHolder();

export default messagesHolder;
