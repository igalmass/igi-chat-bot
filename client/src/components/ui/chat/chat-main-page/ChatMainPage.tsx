import React, {ReactElement, useState} from "react";
import Users from "../users-left-pane/Users";
import Messages from "../messages-right-pane/message-list/Messages";
import styled from "@emotion/styled";

interface Props {
    disconnectHandler: () => void,
    // sendMessage: (messageText: string) => void
}

export const ChatMainPageMainDiv = styled('div')`
  height: 96vh;
  border: 1px solid blue;
  display: flex;
  margin-top: 20px;
`

export const UsersAndMessagesDiv = styled('div')`
  display: flex;
  width: 100%;
`

const ChatMainPage: React.FC<Props> = (props: Props): ReactElement => {

    return <ChatMainPageMainDiv>
        <UsersAndMessagesDiv>
            <Users disconnectHandler={props.disconnectHandler}/>
            <Messages/>
        </UsersAndMessagesDiv>
    </ChatMainPageMainDiv>
}

export default ChatMainPage;
