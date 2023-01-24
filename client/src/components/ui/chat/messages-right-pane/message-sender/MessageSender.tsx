import React, {ReactElement, useState} from "react";
import {Button, TextField} from "@mui/material";
import styled from "@emotion/styled";

interface Props {
    // prop1: string
    sendMessage: (messageText: string) => void
}

const MessageSenderRootDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
  background-color: #cbd2c1;
`

const MessageSender: React.FC<Props> = (props: Props): ReactElement => {
    const [messageText, setMessageText] = useState("");

    const onMessageToSendChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMessageText(event.target.value);
    }

    const onSendMessageClicked = (): void => {
        props.sendMessage(messageText);

    }

    const toDisableTheSendMessageButton = (): boolean => {
        const toEnable = messageText.trim().length > 0;
        return !toEnable;
    }

    return <MessageSenderRootDiv>
        <TextField style={{flexGrow: 2, width: '100%'}} variant="outlined" value={messageText}
                   onChange={onMessageToSendChanged} placeholder='Enter a text and press the "Send Message" Button'/>
        <Button style={{margin: 10, alignSelf: 'start', cursor: 'pointer'}} variant="contained"
                onClick={onSendMessageClicked} disabled={toDisableTheSendMessageButton()}>
            Send Message</Button>
    </MessageSenderRootDiv>

}

export default MessageSender;
