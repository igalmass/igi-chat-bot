import React, {ReactElement} from "react";
import {UserDiv} from "./UsersStyled";
import {ChatUserInfo} from "../../../models/ChatUserInfo";
import userInfoService from "../../../services/utils/UserInfoService";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/Store";
import { BottomHr } from "./UserStyled";

interface Props {
    userInfo: ChatUserInfo,
}

const User: React.FC<Props> = (props: Props): ReactElement => {
    const loggedInSocketId = useSelector((state: RootState) => state.socketInfo.socketId);

    const getUserDescription = (curUserInfo: ChatUserInfo) => {

        let result = `${curUserInfo.userName}`;
        if (userInfoService.isLoggedInUserBySocketId(curUserInfo.socketId, loggedInSocketId)) {
            result = result + " (me)";
        }

        return result;
    }


    return <UserDiv key={props.userInfo.userId}>
        { <label>{getUserDescription(props.userInfo)}</label> }
        <div style={{marginTop: '20px'}}></div>
        <BottomHr />
    </UserDiv>
}

export default User;
