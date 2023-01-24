import {ChatMessage} from "../../../models/ChatMessage";

export interface IRobinAnswerFromPrevAnswersService {

    getAnswerFromPreviousMessages(chatMessage: ChatMessage): string | null;

}
