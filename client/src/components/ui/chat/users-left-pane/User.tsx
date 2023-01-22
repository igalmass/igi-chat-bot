import React, {ReactElement} from "react";
import {UserDiv} from "./UsersStyled";
import {ChatUserInfo} from "../../../models/ChatUserInfo";
import styled from "@emotion/styled";

interface Props {
    userInfo: ChatUserInfo,
    isLoggedInUserBySocketId: (socketId: string) => boolean
}

const BottomHr = styled(`hr`)`

  border: 1px solid #a7b6a7;
`

const User: React.FC<Props> = (props: Props): ReactElement => {
    const getUserDescription = (curUserInfo: ChatUserInfo) => {

        let result = `${curUserInfo.userName}`;
        if (props.isLoggedInUserBySocketId(curUserInfo.socketId)) {
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
