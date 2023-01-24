import React, {ReactElement, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import LoginPage from "../login/LoginPage";
import ChatMainPage from "../chat/chat-main-page/ChatMainPage";
import {ChatUserInfo} from "../../models/ChatUserInfo";
import {THE_SOCKET_SETTINGS} from "../../_settings/ChatSocketSettings";
import socketConnectionEventHandlers from "../../services/SocketConnectionEventHandlers";
import {ChatMessage} from "../../models/ChatMessage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {chatInfoActions} from "../../../store/ChatInfoSlice";
import {socketInfoActions} from "../../../store/SocketInfoSlice";


interface Props {
    // prop1: string
}

const MainPage: React.FC<Props> = (props: Props): ReactElement => {
    const allTheMessages = useSelector((state: RootState) => state.chatInfo.messages);
    const allUserInfos = useSelector((state: RootState) => state.chatInfo.users);
    const theSocket = useSelector((state: RootState) => state.socketInfo.socket);
    const theSocketId: string | undefined = useSelector((state: RootState) => state.socketInfo.socketId);

    const dispatch = useDispatch();

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
            dispatch(socketInfoActions.setSocketId(newSocket.id))
        })
        newSocket.connect();
        dispatch(socketInfoActions.setSocket(newSocket));
        startListeners(newSocket);
        sendHandshake(newSocket, userName);
    }

    const sendHandshake = (socket: Socket, userName: string) => {
        console.log('sending handshake ...');
        socket.emit('handshake', userName, (userId: string, allUserInfos: ChatUserInfo[], allChatMessages: ChatMessage[]) => {
            console.log('got handshake response');
            dispatch(chatInfoActions.updateUsers(allUserInfos));
            dispatch(chatInfoActions.updateMessages(allChatMessages));
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
            dispatch(chatInfoActions.updateUsers(allUsers));
            // SocketDispatch({type: 'update_users', payload: users});
        })

        socket.on('user_disconnected', (allUsers: ChatUserInfo[]) => {
            console.info('get user_disconnected event with payload ', allUsers);
            // SocketDispatch({type: 'remove_user', payload: uid});
            dispatch(chatInfoActions.updateUsers(allUsers));
        });

        socket.on('update_messages', (allTheMessages: ChatMessage[]) => {
            dispatch(chatInfoActions.updateMessages(allTheMessages));
        });

        socketConnectionEventHandlers.registerToConnectionEvents(socket);
    };

    const disconnectHandler = (): void => {
        if (theSocket) {
            theSocket.disconnect();
        }
        dispatch(socketInfoActions.setSocket(undefined));
        dispatch(socketInfoActions.setSocketId(undefined));
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


    const getUserNameByUserId = (userId: string): string => {
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
                              getUserName={getUserNameByUserId}
                              sendMessage={sendMessage}
                />}
        </>
    </div>
}

export default MainPage;
