import {ChatMessage} from "../../models/ChatMessage";
import messagesHolder from "../repositories/messages/MessageRepositoryOverMemory";
import {ROBIN_THE_BOT_USER_ID} from "../../consts/RobinTheBotConsts";
import robinAnswerFromPrevOverMemoryService from "./get_answer_from_prev/RobinAnswerFromPrevOverMemoryService";
import robinEncouragementMessageCreatorService from "./RobinEncouragementService";

class RobinAutoAnswerService {

    public tryToAutoAnswer(chatMessage: ChatMessage): void {

        if (chatMessage.messageKind === "Question") {


            const answerFromPreviousMessages = robinAnswerFromPrevOverMemoryService.getAnswerFromPreviousMessages(chatMessage);

            let robinMessageText = null;
            if (answerFromPreviousMessages) {
                robinMessageText = answerFromPreviousMessages;
            } else {
                robinMessageText = robinEncouragementMessageCreatorService.getRobinEncouragementMessage(chatMessage.userId);
            }

            messagesHolder.addMessage({
                userId: ROBIN_THE_BOT_USER_ID,
                messageKind: "Robin Encouragement",
                text: robinMessageText
            });
        }

    }


}

const robinAutoAnswerService = new RobinAutoAnswerService();

export default robinAutoAnswerService;
