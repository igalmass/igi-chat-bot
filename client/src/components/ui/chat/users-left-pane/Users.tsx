import React, {ReactElement} from "react";
import {ChatUserInfo} from "../../../models/ChatUserInfo";
import {UsersMainDiv, DisconnectButton, ConnectedUsersLabel} from './UsersStyled';
import User from "./User";
import {styled} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
interface Props {
    disconnectHandler: () => void,
}

const UserListDiv = styled(`div`)`
  margin-top: 20px;
`

const Users: React.FC<Props> = (props: Props): ReactElement => {
    const allUserInfos = useSelector((state: RootState) => state.chatInfo.users);
    return <UsersMainDiv>
        <ConnectedUsersLabel>Connected Users</ConnectedUsersLabel>
        <hr style={{width: '90%', border: '1px solid green'}}/>
        <UserListDiv>{
            allUserInfos.map((curUserInfo: ChatUserInfo) =>
                <User key={curUserInfo.userId}
                      userInfo={curUserInfo}
                      />
            )}
        </UserListDiv>
        <DisconnectButton variant={"outlined"} onClick={props.disconnectHandler}>Disconnect</DisconnectButton>

    </UsersMainDiv>
}

export default Users;
