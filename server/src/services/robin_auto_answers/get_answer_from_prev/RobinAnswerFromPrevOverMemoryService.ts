import {ChatMessage} from "../../../models/ChatMessage";
import messagesHolder from "../../repositories/messages/MessageRepositoryOverMemory";
import {IRobinAnswerFromPrevAnswersService} from "./IRobinAnswerFromPrevAnswersService";

class RobinAnswerFromPrevOverMemoryService implements IRobinAnswerFromPrevAnswersService {

    public getAnswerFromPreviousMessages(chatMessage: ChatMessage): string | null {
        const messagesToCheck = this.getAllQuestionAndAnswerMessages();

        const result = this.getAutoAnswer(messagesToCheck, chatMessage);

        console.log(`The result is ${result}`);
        return result;
    }

    private getAutoAnswer(messagesToCheck: ChatMessage[], chatMessage: ChatMessage): null | string {
        let result = null;

        for (let i = 0; i < messagesToCheck.length - 1 && result === null; i++) {
            const currentMessage = messagesToCheck[i];

            console.log(`Comparing ${currentMessage.text} with ${chatMessage.text}`);

            if (currentMessage.text === chatMessage.text) {
                console.log('found a match');

                const nextMessage = messagesToCheck[i + 1];
                result = nextMessage.text;

            } else {
                console.log('no match!')
            }

        }
        return result;
    }

    private getAllQuestionAndAnswerMessages(): ChatMessage[] {
        const messagesToCheck = messagesHolder.getAllMessages().filter((chatMessage) =>
            chatMessage.messageKind === "Question"
            ||
            chatMessage.messageKind === "Answer");
        return messagesToCheck;
    }
}

const robinAnswerFromPrevOverMemoryService = new RobinAnswerFromPrevOverMemoryService();

export default robinAnswerFromPrevOverMemoryService;
