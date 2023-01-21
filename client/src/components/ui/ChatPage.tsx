import React, {ReactElement} from "react";
import {ChatUserInfo} from "../models/ChatUserInfo";
import ConnectedUsersComponent from "./ConnectedUsersComponent";

interface Props {
    disconnectHandler: () => void,
    allUserInfos: ChatUserInfo[],
    socketId: string | undefined
}

const ChatPage: React.FC<Props> = (props: Props): ReactElement => {
    const onDisconnectButtonClicked = () => {
        props.disconnectHandler();
    }

    return <div style={{border: '1px solid blue', padding: '10px'}}>
        Hi ! I'm ChatPage Component!
        <button onClick={onDisconnectButtonClicked}>Disconnect</button>
        <ConnectedUsersComponent allUserInfos={props.allUserInfos} socketId={props.socketId}/>
    </div>
}

export default ChatPage;
