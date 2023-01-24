import {ChatMessage} from "../../../models/ChatMessage";
import messagesHolder from "../../data_holders/MessagesHolder";
import {IRobinAnswerFromPrevService} from "./IRobinAnswerFromPrev";

class RobinAnswerFromPrevOverMemoryService implements IRobinAnswerFromPrevService {
    public getAnswerFromPreviousMessages(chatMessage: ChatMessage) {
        let result = null;

        const messagesToCheck = messagesHolder.allTheMessages.filter((chatMessage) =>
            chatMessage.messageKind === "Question"
            ||
            chatMessage.messageKind === "Answer");

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

        console.log(`The result is ${result}`);
        return result;
    }

}

const robinAnswerFromPrevOverMemoryService = new RobinAnswerFromPrevOverMemoryService();

export default robinAnswerFromPrevOverMemoryService;
