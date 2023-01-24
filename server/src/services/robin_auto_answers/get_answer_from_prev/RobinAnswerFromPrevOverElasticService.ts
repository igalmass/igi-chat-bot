import {IRobinAnswerFromPrevAnswersService} from "./IRobinAnswerFromPrevAnswersService";
import {ChatMessage} from "../../../models/ChatMessage";

class RobinAnswerFromPrevOverElasticService implements IRobinAnswerFromPrevAnswersService {
    public getAnswerFromPreviousMessages(chatMessage: ChatMessage): string | null {
        return null; // todo: implement from elastic
    }
}

const robinAnswerFromPrevOverElasticService = new RobinAnswerFromPrevOverElasticService();

export default robinAnswerFromPrevOverElasticService;
