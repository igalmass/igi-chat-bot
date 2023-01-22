import React, {ReactElement} from "react";
import {ChatMessage} from "../../../models/ChatMessage";
import {MessagesMainDiv} from "./MessagesStyled";
import Message from "./Message";

interface Props {
    allTheMessages: ChatMessage[],
    isLoggedInUserByUserId: (userId: string) => boolean,
    getUserName: (userId: string) => string
}


const Messages: React.FC<Props> = (props: Props): ReactElement => {

    return <MessagesMainDiv>
        {
            props.allTheMessages.map(curChatMessage =>
                <Message chatMessage={curChatMessage}
                         isLoggedInUserByUserId={props.isLoggedInUserByUserId}
                         getUserName={props.getUserName}
                />)
        }
    </MessagesMainDiv>

}

export default Messages;
