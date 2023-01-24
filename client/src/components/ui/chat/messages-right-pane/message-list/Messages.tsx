import React, {ReactElement, useState} from "react";
import {ChatMessage} from "../../../../models/ChatMessage";
import Message from "./Message";
import styled from "@emotion/styled";
import MessageSender from "../message-sender/MessageSender";

interface Props {
    allTheMessages: ChatMessage[],
    isLoggedInUserByUserId: (userId: string) => boolean,
    getUserName: (userId: string) => string,
    sendMessage: (messageText: string) => void

}

export const MessagesMainDiv = styled('div')`
  background-color: #6d9886;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  
`;

const Messages: React.FC<Props> = (props: Props): ReactElement => {

    return <MessagesMainDiv>
        <div style= {{display: "flex", flexDirection: 'column', flexGrow: 100}}>
            {
                props.allTheMessages.map(curChatMessage =>
                    <Message key={curChatMessage.fromUserId}
                             chatMessage={curChatMessage}
                             isLoggedInUserByUserId={props.isLoggedInUserByUserId}
                             getUserName={props.getUserName}
                    />)
            }

        </div>
        <MessageSender sendMessage={props.sendMessage}/>
    </MessagesMainDiv>

}

export default Messages;
