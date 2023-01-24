import React, {ReactElement, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import LoginPage from "../login/LoginPage";
import ChatMainPage from "../chat/chat-main-page/ChatMainPage";
import {ChatUserInfo} from "../../models/ChatUserInfo";
import {THE_SOCKET_SETTINGS} from "../../_settings/ChatSocketSettings";
import socketConnectionEventHandlers from "../../services/SocketConnectionEventHandlers";
import {ChatMessage} from "../../models/ChatMessage";

interface Props {
    // prop1: string
}

const MainPage: React.FC<Props> = (props: Props): ReactElement => {
    const [theSocket, setTheSocket] = useState<Socket | null>(null);
    const [theSocketId, setTheSocketId] = useState<String | null>(null);
    const [allUserInfos, setAllUserInfos] = useState<ChatUserInfo[]>([]);
    const [allTheMessages, setAllTheMessages] = useState<ChatMessage[]>([]);

    const disconnectTheSocket = () => {
        console.log('disconnecting the socket [1]', theSocket);
        if (theSocket) {
            console.log(`disconnecting the socket [2] with id ${theSocket.id}`)
            theSocket.disconnect();
        }
    }

    useEffect(() => {
        return () => {
            disconnectTheSocket();
        }
    }, [theSocket])

    const isConnected = (): boolean => {
        return !!theSocket;
    }

    const connectHandler = (userName: string) => {
        const newSocket: Socket = io(THE_SOCKET_SETTINGS.uri, THE_SOCKET_SETTINGS.opts);
        newSocket.on('connect', () => {
            setTheSocketId(newSocket.id)
        })
        newSocket.connect();
        setTheSocket(newSocket);
        startListeners(newSocket);
        sendHandshake(newSocket, userName);
    }

    const sendHandshake = (socket: Socket, userName: string) => {
        console.log('sending handshake ...');
        socket.emit('handshake', userName, (userId: string, allUserInfos: ChatUserInfo[], allChatMessages: ChatMessage[]) => {
            console.log('got handshake response');
            setAllUserInfos(allUserInfos);
            setAllTheMessages(allChatMessages);
        });
    }

    const sendMessage = (messageText: string): void => {
        const userId = getLoggedInUserIdBySocketId() as string;
        const chatMessage: ChatMessage = {text: messageText, userId: userId};
        debugger;
        (theSocket as Socket).emit('new_chat_message', chatMessage, () => {
            debugger;
            console.log('got new_chat_message response ...');
        });
    }


    const startListeners = (socket: Socket) => {
        //  user connected event
        socket.on('user_connected', (allUsers: ChatUserInfo[]) => {
            console.info('User connected, new user list received.', allUsers);
            setAllUserInfos(allUsers);
            // SocketDispatch({type: 'update_users', payload: users});
        })

        socket.on('user_disconnected', (allUsers: ChatUserInfo[]) => {
            console.info('get user_disconnected event with payload ', allUsers);
            // SocketDispatch({type: 'remove_user', payload: uid});
            setAllUserInfos(allUsers);
        });

        socket.on('update_messages', (allTheMessages: ChatMessage[]) => {
            setAllTheMessages(allTheMessages);
        });

        socketConnectionEventHandlers.registerToConnectionEvents(socket);
    };

    const disconnectHandler = (): void => {
        if (theSocket) {
            theSocket.disconnect();
        }
        setTheSocket(null);
    }

    const isLoggenInUserBySocketId = (socketId: string): boolean => {
        return theSocketId === socketId;
    }

    const isLoggedInUserByUserId = (userId: string): boolean => {
        return getLoggedInUserIdBySocketId() === userId;
    }

    const getLoggedInUserIdBySocketId = (): string | undefined => {
        return getLoggedInUserInfo()?.userId;
    }

    const getLoggedInUserInfo = (): ChatUserInfo | undefined => {
        return allUserInfos.find((userInfo: ChatUserInfo) => userInfo.socketId === theSocketId);
    }


    const getUserName = (userId: string): string => {
        const chatUser = allUserInfos.find(curUserInfo => curUserInfo.userId === userId);

        let result = `User #${userId}`;
        if (chatUser) {
            result = chatUser.userName;
        }

        return result;
    }

    return <div style={{height: '100%'}}>
        <>
            {/*Hi ! I'm MainPage Component!*/}
            {!isConnected() && <LoginPage connectHandler={connectHandler}/>}
            {isConnected() &&
                <ChatMainPage disconnectHandler={disconnectHandler}
                              allUserInfos={allUserInfos}
                              allTheMessages={allTheMessages}
                              isLoggenInUserBySocketId={isLoggenInUserBySocketId}
                              isLoggedInUserByUserId={isLoggedInUserByUserId}
                              getUserName={getUserName}
                              sendMessage={sendMessage}
                />}
        </>
    </div>
}

export default MainPage;
