import {ChatMessage} from "../../models/ChatMessage";
import messagesHolder from "../data_holders/MessagesHolder";
import userInfosHolder from "../data_holders/UserInfosHolder";
import {ROBIN_THE_BOT_USER_ID} from "../../consts/RobinTheBotConsts";
import robinAnswerFromPrevOverMemoryService from "./get_answer_from_prev/RobinAnswerFromPrevOverMemoryService";
import robinEncouragementMessageCreatorService from "./RobinEncouragementService";

class RobinAutoAnswerService {


    public tryToAutoAnswer(chatMessage: ChatMessage): void {

        if (chatMessage.messageKind === "Question") {
            const userName = userInfosHolder.getUserNameByUserId(chatMessage.userId);

            const answerFromPreviousMessages = robinAnswerFromPrevOverMemoryService.getAnswerFromPreviousMessages(chatMessage);

            let robinMessageText = null;
            if (answerFromPreviousMessages) {
                robinMessageText = answerFromPreviousMessages;
            } else {
                robinMessageText = robinEncouragementMessageCreatorService.getRobinEncouragementMessage(userName);
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
