import React, {ReactElement} from "react";
import {ChatUserInfo} from "../../models/ChatUserInfo";
import styled from "@emotion/styled";
import ConnectedUsersComponent from "./users-left-pane/ConnectedUsersComponent";
import MessagesComponent from "./messages-right-pane/MessagesComponent";

interface Props {
    disconnectHandler: () => void,
    allUserInfos: ChatUserInfo[],
    isLoggenInUserBySocketId: (socketId: string) => boolean
}

const MessagesDiv = styled('div')`
  background-color: #6d9886;
  height: 100%;
  flex-grow: 1;
`;

const MainDiv = styled('div')`
  height: 95vh;
  border: 1px solid blue;
  display: flex;
  margin-top: 20px;
  //margin: 10px 300px;

`

const ChatPage: React.FC<Props> = (props: Props): ReactElement => {

    return <MainDiv>
        <ConnectedUsersComponent allUserInfos={props.allUserInfos}
                                 disconnectHandler={props.disconnectHandler}
                                 isLoggedInUserBySocketId={props.isLoggenInUserBySocketId}/>
        <MessagesComponent/>
    </MainDiv>
}

export default ChatPage;
