import React, {ReactElement, useState} from "react";
import {Button, TextField} from "@mui/material";
import styled from "@emotion/styled";
import chatMessageSenderService from "../../../../services/socket_events/ChatMessageSenderService";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/Store";
import userInfoService from "../../../../services/utils/UserInfoService";
import {Socket} from "socket.io-client";

interface Props {
    // prop1: string
    // sendMessage: (messageText: string) => void
}

const MessageSenderRootDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
  background-color: #cbd2c1;
  
`

const MyTextFiled = styled(TextField)`
    flex-grow: 2;
    width: 98%;
  margin-top: 9px;
    
`

                               const MessageSender: React.FC<Props> = (props: Props): ReactElement => {
    const [messageText, setMessageText] = useState("");
    const allUserInfos = useSelector((state: RootState) => state.chatInfo.users);
    const connectedSocketId = useSelector((state: RootState) => state.socketInfo.socketId);
    const theSocket = useSelector((state: RootState) => state.socketInfo.socket);


    const onMessageToSendChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMessageText(event.target.value);
    }

    const getLoggedInUserId = (): string | undefined => {
        return userInfoService.getLoggedInUserInfoBySocketId(allUserInfos, connectedSocketId)?.userId;
    }

    const onSendMessageClicked = (): void => {
        // props.sendMessage(messageText);
        chatMessageSenderService.sendMessage(messageText, allUserInfos, getLoggedInUserId(), theSocket as Socket);

    }

    const toDisableTheSendMessageButton = (): boolean => {
        const toEnable = messageText.trim().length > 0;
        return !toEnable;
    }



    return <MessageSenderRootDiv>
        <MyTextFiled variant="outlined" value={messageText}
                   onChange={onMessageToSendChanged} placeholder='Enter a text and press the "Send Message" Button'/>
        <Button style={{margin: 10, alignSelf: 'start', cursor: 'pointer'}} variant="contained"
                onClick={onSendMessageClicked} disabled={toDisableTheSendMessageButton()}>
            Send Message</Button>
    </MessageSenderRootDiv>

}

export default MessageSender;
