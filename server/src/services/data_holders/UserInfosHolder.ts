import {ChatUserInfo} from "../../models/ChatUserInfo";
import {ROBIN_THE_BOT_SOCKET_ID, ROBIN_THE_BOT_USER_ID, ROBIN_THE_BOT_USER_NAME} from "../../consts/RobinTheBotConsts";

class UserInfosHolder {
    public allUserInfos: ChatUserInfo[] = [ {
        userId: ROBIN_THE_BOT_USER_ID,
        userName: ROBIN_THE_BOT_USER_NAME,
        socketId: ROBIN_THE_BOT_SOCKET_ID
    }];

    public getAllSocketIds(): string[] {
        return socketInfosHolder.allUserInfos.map((cur: ChatUserInfo) => cur.socketId);
    }

    public getUserIdBySocketId = (socketId: string): string | undefined => {
        const result = socketInfosHolder.allUserInfos.find((cur: ChatUserInfo) => cur.socketId === socketId);
        return result?.userId;
        //return Object.keys(this.users).find(uid => this.users[uid] === socketId);
    }

}

const socketInfosHolder = new UserInfosHolder();

export default socketInfosHolder;
