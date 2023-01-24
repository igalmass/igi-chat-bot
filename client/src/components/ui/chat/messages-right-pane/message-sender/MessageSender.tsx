import React, {ReactElement, useState} from "react";
import {Button, TextField} from "@mui/material";

interface Props {
    // prop1: string
    sendMessage: (messageText: string) => void
}

const MessageSender: React.FC<Props> = (props: Props): ReactElement => {
    const [messageText, setMessageText] = useState("");

    const onMessageToSendChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageText(event.target.value);
    }

    const onSendMessageClicked = () => {
        props.sendMessage(messageText);

    }

    return <div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: 30}}>
        <TextField style={{flexGrow: 2, width: '100%'}} variant="outlined" value={messageText}
                   onChange={onMessageToSendChanged} placeholder='Enter a text and press the "Send Message" Button'/>
        <Button style={{margin: 10, alignSelf: 'start', cursor: 'pointer'}} variant="contained" onClick={onSendMessageClicked}>Send Message</Button>
    </div>

}

export default MessageSender;
