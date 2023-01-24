import React, {ReactElement, useState} from "react";
import {ChatUserInfo} from "../../../models/ChatUserInfo";
import Users from "../users-left-pane/Users";
import Messages from "../messages-right-pane/message-list/Messages";
import {ChatMessage} from "../../../models/ChatMessage";
import styled from "@emotion/styled";

interface Props {
    disconnectHandler: () => void,
    allUserInfos: ChatUserInfo[],
    allTheMessages: ChatMessage[],
    isLoggenInUserBySocketId: (socketId: string) => boolean,
    isLoggedInUserByUserId: (userId: string) => boolean,
    getUserName: (userId: string) => string,
    sendMessage: (messageText: string) => void
}

export const ChatMainPageMainDiv = styled('div')`
  height: 95vh;
  border: 1px solid blue;
  display: flex;
  margin-top: 20px;
`

export const UsersAndMessagesDiv = styled('div')`
  display: flex;
  width: 100%;
`

const ChatMainPage: React.FC<Props> = (props: Props): ReactElement => {
    const [messageText, setMessageText] = useState("");

    return <ChatMainPageMainDiv>
        <UsersAndMessagesDiv>
            <Users allUserInfos={props.allUserInfos}
                   disconnectHandler={props.disconnectHandler}
                   isLoggedInUserBySocketId={props.isLoggenInUserBySocketId}/>

            <Messages allTheMessages={props.allTheMessages}
                      isLoggedInUserByUserId={props.isLoggedInUserByUserId}
                      getUserName={props.getUserName}
                      sendMessage={props.sendMessage}
            />

        </UsersAndMessagesDiv>
    </ChatMainPageMainDiv>
}

export default ChatMainPage;
