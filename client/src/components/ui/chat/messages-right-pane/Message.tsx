import React, {ReactElement} from "react";
import {ChatMessage} from "../../../models/ChatMessage";
import JsonContainerDiv from "../../../samples/JsonContainerDiv";

interface Props {
    // prop1: string
    chatMessage: ChatMessage,
    isLoggedInUserByUserId: (userId: string) => boolean
    getUserName: (userId: string) => string
}

const Message: React.FC<Props> = (props: Props): ReactElement => {
    const getChatMessageText = (chatMessage: ChatMessage): string => {
        const userName = props.getUserName(chatMessage.fromUserId);
        let result = `${userName}: ${chatMessage.text}`;
        if (props.isLoggedInUserByUserId(chatMessage.fromUserId)) {
            result = result + " (by me)";
        }
        return result;
    }

    return <JsonContainerDiv theObject={getChatMessageText(props.chatMessage)}
                             style={{marginTop: 20, marginBottom: 20, width: 'auto' }}/>

    // return <div style={{border: '1px solid blue', padding: '10px'}}>
    //     return <p>{getChatMessageText(props.chatMessage)}</p>
    // </div>
}

export default Message;
