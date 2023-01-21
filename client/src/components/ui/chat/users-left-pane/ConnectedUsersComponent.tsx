import React, {ReactElement} from "react";
import {ChatUserInfo} from "../../../models/ChatUserInfo";
import styled from "@emotion/styled";
import {Button} from "@mui/material";

interface Props {
    // prop1: string
    allUserInfos: ChatUserInfo[],
    socketId: string | undefined,
    disconnectHandler: () => void
}

const UsersDiv = styled('div')`
  background-color: #00bfbf;
  height: 100%;
  min-width: 200px;
  max-width: 200px;
`

const SingleUserDiv = styled('div')`
  padding: 5px;
`

const ConnectedUsersLabel = styled('h3')`

`


const ConnectedUsersComponent: React.FC<Props> = (props: Props): ReactElement => {
    const getUserDescription = (curUserInfo: ChatUserInfo) => {
        const isCurrentUserLoggedIn = curUserInfo.socketId === props.socketId;

        let result = `${curUserInfo.userName}`;
        if (isCurrentUserLoggedIn) {
            result = result + " (me)";
        }

        return result;
    }

    return <UsersDiv>
        <ConnectedUsersLabel>Connected Users</ConnectedUsersLabel>
        <div>{
            props.allUserInfos.map((curUserInfo: ChatUserInfo) => {

                return <SingleUserDiv style={{border: '1px solid green'}} key={curUserInfo.userId}>
                    { <p>{getUserDescription(curUserInfo)}</p> }
                </SingleUserDiv>
            })}
        </div>
        <Button variant={"outlined"} onClick={props.disconnectHandler}>Disconnect</Button>

    </UsersDiv>
}

export default ConnectedUsersComponent;
