import {ChatUserInfo} from "../../models/ChatUserInfo";

class UserInfoService {
    public isLoggedInUserBySocketId = (socketId: string, loggedInUserSocketId: string | undefined): boolean => {
        return loggedInUserSocketId === socketId;
    }

    public isLoggedInUserByUserId = (userId: string, loggedInSocketId: string | undefined, allUserInfos: ChatUserInfo[]): boolean => {
        return this.getLoggedInUserIdBySocketId(allUserInfos, loggedInSocketId) === userId;
    }

    public getLoggedInUserIdBySocketId = (allUserInfos: ChatUserInfo[], loggedInSocketId: string | undefined): string | undefined => {
        return this.getLoggedInUserInfoBySocketId(allUserInfos, loggedInSocketId)?.userId;
    }

    public getLoggedInUserInfoBySocketId = (allUserInfos: ChatUserInfo[], theSocketId: string | undefined): ChatUserInfo | undefined => {
        return allUserInfos.find((userInfo: ChatUserInfo) => userInfo.socketId === theSocketId);
    }

    public getUserNameByUserId = (userId: string, allUserInfos: ChatUserInfo[]): string => {
        const chatUser = allUserInfos.find(curUserInfo => curUserInfo.userId === userId);

        let result = `User #${userId}`;
        if (chatUser) {
            result = chatUser.userName;
        }

        return result;
    }

}

const userInfoService = new UserInfoService();

export default userInfoService;
