import React, {ReactElement} from "react";
import {ChatUserInfo} from "../models/ChatUserInfo";

interface Props {
    // prop1: string
    allUserInfos: ChatUserInfo[],
    socketId: string | undefined
}

const ConnectedUsersComponent: React.FC<Props> = (props: Props): ReactElement => {
    return <div style={{border: '1px solid blue', padding: '10px'}}>
        Hi ! I'm ConnectedUsersComponent Component!
        <div>{
            props.allUserInfos.map((cur: ChatUserInfo) => {
                const isCurrentUserLoggedIn = cur.socketId === props.socketId;
                return <div style={{border: '1px solid green'}} key={cur.userId}>
                    <p>{cur.userId} - {cur.userName} - {cur.socketId}</p>
                    { isCurrentUserLoggedIn ? <p>I'm the logged in</p> : <p>I'm not logged in :)</p> }

                </div>
            })}
        </div>

    </div>
}

export default ConnectedUsersComponent;
