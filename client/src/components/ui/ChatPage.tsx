import React, {ReactElement} from "react";
import {ChatUserInfo} from "../models/ChatUserInfo";
import ConnectedUsersComponent from "./ConnectedUsersComponent";

interface Props {
    // prop1: string
    disconnectHandler: () => void,
    allUserInfos: ChatUserInfo[]
}

const ChatPage: React.FC<Props> = (props: Props): ReactElement => {
    const onDisconnectButtonClicked = () => {
        props.disconnectHandler();
    }

    return <div style={{border: '1px solid blue', padding: '10px'}}>
        Hi ! I'm ChatPage Component!
        <button onClick={onDisconnectButtonClicked}>Disconnect</button>
        <ConnectedUsersComponent allUserInfos={props.allUserInfos}/>
    </div>
}

export default ChatPage;
