import React, {ReactElement} from "react";
import {ChatMessage} from "../../../../models/ChatMessage";
import JsonContainerDiv from "../../../_common/JsonContainerDiv";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/Store";
import userInfoService from "../../../../services/utils/UserInfoService";

interface Props {
    chatMessage: ChatMessage,
}

const Message: React.FC<Props> = (props: Props): ReactElement => {
    const allUserInfos = useSelector((state: RootState) => state.chatInfo.users);
    const loggedInSocketId = useSelector((state: RootState) => state.socketInfo.socketId);

    const getChatMessageText = (chatMessage: ChatMessage): string => {
        const userName = userInfoService.getUserNameByUserId(chatMessage.userId, allUserInfos);
        let result = `${userName}: ${chatMessage.text}`;
        if (userInfoService.isLoggedInUserByUserId(chatMessage.userId, loggedInSocketId, allUserInfos)) {
            result = result + " (by me)";
        }
        return result;
    }

    return <JsonContainerDiv theObject={getChatMessageText(props.chatMessage)}
                                  style={{marginTop: 20, marginBottom: 20, width: 'auto' }}/>

}

export default Message;
