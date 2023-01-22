import React, {ReactElement} from "react";
import {ChatUserInfo} from "../../../models/ChatUserInfo";
import {UsersMainDiv, DisconnectButton, ConnectedUsersLabel} from './UsersStyled';
import User from "./User";
import {styled} from "@mui/material";
interface Props {
    allUserInfos: ChatUserInfo[],
    disconnectHandler: () => void,
    isLoggedInUserBySocketId: (socketId: string) => boolean
}

const UserListDiv = styled(`div`)`
  margin-top: 20px;
`


const Users: React.FC<Props> = (props: Props): ReactElement => {

    return <UsersMainDiv>
        <ConnectedUsersLabel>Connected Users</ConnectedUsersLabel>
        <hr style={{width: '90%', border: '1px solid green'}}/>
        <UserListDiv>{
            props.allUserInfos.map((curUserInfo: ChatUserInfo) =>
                <User userInfo={curUserInfo} isLoggedInUserBySocketId={props.isLoggedInUserBySocketId}/>
            )}
        </UserListDiv>
        <DisconnectButton variant={"outlined"} onClick={props.disconnectHandler}>Disconnect</DisconnectButton>

    </UsersMainDiv>
}

export default Users;
