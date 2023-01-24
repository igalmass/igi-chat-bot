import {ChatMessage} from "../../../models/ChatMessage";

export interface IMessageRepository {
    getAllMessages(): ChatMessage[]
}