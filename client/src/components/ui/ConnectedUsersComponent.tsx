import React, {ReactElement} from "react";
import {ChatUserInfo} from "../models/ChatUserInfo";

interface Props {
    // prop1: string
    allUserInfos: ChatUserInfo[]
}

const ConnectedUsersComponent: React.FC<Props> = (props: Props): ReactElement => {
    return <div style={{border: '1px solid blue', padding: '10px'}}>
        Hi ! I'm ConnectedUsersComponent Component!
        <div>{props.allUserInfos.map((cur: ChatUserInfo) => <p>{cur.userId} - {cur.userName} - {cur.socketId}</p>)}</div>
    </div>
}

export default ConnectedUsersComponent;
