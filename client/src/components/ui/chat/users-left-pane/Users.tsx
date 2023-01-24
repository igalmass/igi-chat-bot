import React, {ReactElement} from "react";
import {ChatUserInfo} from "../../../models/ChatUserInfo";
import {UsersMainDiv, DisconnectButton, ConnectedUsersLabel} from './UsersStyled';
import User from "./User";
import {styled} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/Store";
import disconnectHandlerService from "../../../services/socket_events/DisconnectHandlerService";
import {Socket} from "socket.io-client";


interface Props {
    // disconnectHandler: () => void,
}

const UserListDiv = styled(`div`)`
  margin-top: 20px;
`

const Users: React.FC<Props> = (props: Props): ReactElement => {
    const allUserInfos = useSelector((state: RootState) => state.chatInfo.users);
    const theSocket = useSelector((state: RootState) => state.socketInfo.socket);
    const dispatch = useDispatch();

    const onDisconnectButtonClicked = () => {
        disconnectHandlerService.disconnectHandler(theSocket as Socket, dispatch);
    }
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
        <DisconnectButton variant={"outlined"} onClick={onDisconnectButtonClicked}>Disconnect</DisconnectButton>

    </UsersMainDiv>
}

export default Users;
