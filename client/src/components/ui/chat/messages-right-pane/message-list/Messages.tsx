import React, {ReactElement} from "react";
import Message from "./Message";
import styled from "@emotion/styled";
import MessageSender from "../message-sender/MessageSender";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/Store";
import {MessagesDiv, MessagesMainDiv } from "./MessagesStyled";

interface Props {
    // sendMessage: (messageText: string) => void
}


const Messages: React.FC<Props> = (props: Props): ReactElement => {
    const allTheMessages = useSelector((state: RootState) => state.chatInfo.messages);

    return <MessagesMainDiv>
        <MessagesDiv>
            {
                allTheMessages.map((curChatMessage, index) =>
                    <Message key={index}
                             chatMessage={curChatMessage}
                    />)
            }

        </MessagesDiv>
        <MessageSender />
    </MessagesMainDiv>

}

export default Messages;
