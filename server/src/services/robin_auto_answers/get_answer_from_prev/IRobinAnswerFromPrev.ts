import {ChatMessage} from "../../../models/ChatMessage";

export interface IRobinAnswerFromPrevService {
    getAnswerFromPreviousMessages(chatMessage: ChatMessage): string | null;

}
