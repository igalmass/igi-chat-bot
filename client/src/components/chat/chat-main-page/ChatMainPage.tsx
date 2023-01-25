import React, {ReactElement, useState} from "react";
import Users from "../users-left-pane/Users";
import Messages from "../messages-right-pane/message-list/Messages";
import { ChatMainPageMainDiv, UsersAndMessagesDiv } from "./ChatMainPageStyled";

interface Props {
    // disconnectHandler: () => void,
}

const ChatMainPage: React.FC<Props> = (props: Props): ReactElement => {

    return <ChatMainPageMainDiv>
        <UsersAndMessagesDiv>
            <Users/>
            <Messages/>
        </UsersAndMessagesDiv>
    </ChatMainPageMainDiv>
}

export default ChatMainPage;
