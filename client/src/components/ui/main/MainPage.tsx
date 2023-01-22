import React, {ReactElement, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import LoginPage from "../login/LoginPage";
import ChatMainPage from "../chat/chat-main-page/ChatMainPage";
import {ChatUserInfo} from "../../models/ChatUserInfo";
import {THE_SOCKET_SETTINGS} from "../../_settings/ChatSocketSettings";
import socketConnectionEventHandlers from "../../services/SocketConnectionEventHandlers";
import {ALL_THE_MESSAGES, ChatMessage} from "../../models/ChatMessage";

interface Props {
    // prop1: string
}

const MainPage: React.FC<Props> = (props: Props): ReactElement => {
    const [theSocket, setTheSocket] = useState<Socket | null>(null);
    const [allUserInfos, setAllUserInfos] = useState<ChatUserInfo[]>([]);
    const [allTheMessages, setAllTheMessages] = useState<ChatMessage[]>(ALL_THE_MESSAGES);

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
        newSocket.connect();
        setTheSocket(newSocket);
        startListeners(newSocket);
        sendHandshake(newSocket, userName);
    }

    const sendHandshake = (socket: Socket, userName: string) => {
        console.log('sending handshake ...');
        socket.emit('handshake', userName, (userId: string, allUserInfos: ChatUserInfo[]) => {
            console.log('got handshake response');
            debugger;
            setAllUserInfos(allUserInfos);
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
        })

        socketConnectionEventHandlers.registerToConnectionEvents(socket);
    };


    const disconnectHandler = (): void => {
        if (theSocket) {
            theSocket.disconnect();
        }
        setTheSocket(null);
    }

    const isLoggenInUserBySocketId = (socketId: string): boolean => {
        return theSocket?.id === socketId;
    }

    const isLoggedInUserByUserId = (userId: string): boolean => {
        return false;
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
                />}
        </>
    </div>
}

export default MainPage;
