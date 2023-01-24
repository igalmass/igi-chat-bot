import React, {ReactElement} from "react";
import Message from "./Message";
import styled from "@emotion/styled";
import MessageSender from "../message-sender/MessageSender";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store";

interface Props {
    // sendMessage: (messageText: string) => void
}

export const MessagesMainDiv = styled('div')`
  background-color: #6d9886;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  
`;

const Messages: React.FC<Props> = (props: Props): ReactElement => {
    const allTheMessages = useSelector((state: RootState) => state.chatInfo.messages);

    return <MessagesMainDiv>
        <div style= {{display: "flex", flexDirection: 'column', flexGrow: 100, maxHeight: '88.5%', overflow: 'auto', marginLeft: 20, marginRight: 10}}>
            {
                allTheMessages.map((curChatMessage, index) =>
                    <Message key={index}
                             chatMessage={curChatMessage}
                    />)
            }

        </div>
        <MessageSender />
    </MessagesMainDiv>

}

export default Messages;
