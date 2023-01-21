import React, {ReactElement, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import LoginPage from "./LoginPage";
import ChatPage from "./ChatPage";
import {ManagerOptions} from "socket.io-client/build/esm/manager";
import {SocketOptions} from "socket.io-client/build/esm/socket";
import {ChatUserInfo} from "../models/ChatUserInfo";

interface Props {
    // prop1: string
}

// interface LoggedInUserInfo {
//     userId: string,
//     userName: string,
//     socket: Socket
// }


//
// interface ChatUserInfo {
//     userId: string,
//     userName: string,
//     socketId: string
// }

type SocketSettingsType = {
    uri: string,
    opts?: Partial<ManagerOptions & SocketOptions>
}

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void,
    handshake: (userName: string) => void
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

const THE_SOCKET_SETTINGS: SocketSettingsType = {
    uri: 'ws://localhost:1337',
    opts: {
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
        autoConnect: false
    }
}

const MainPage: React.FC<Props> = (props: Props): ReactElement => {
    // const [userId, setUserId] = useState<string | null>(null);
    // const [userName, setUserName] = useState<string | null>(null);
    const [theSocket, setTheSocket] = useState<Socket | null>(null);
    const [allUserInfos, setAllUserInfos] = useState<ChatUserInfo[]>([]);

    function disconnectTheSocket() {
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
        // setUserName(userName);
        const newSocket: Socket = io(THE_SOCKET_SETTINGS.uri, THE_SOCKET_SETTINGS.opts);
        newSocket.connect(); // todo: what happens in case of an error?
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

        // socket.emit('handshake', {callback: (userId: string, allUserInfos: ChatUserInfo[]) => {
        //     console.log('got handshake response');
        //     }})
        // ;
    }


    const startListeners = (socket: Socket) => {
        //  user connected event
        socket.on('user_connected', (allUsers: ChatUserInfo[]) => {
            console.info('User connected, new user list received.', allUsers);
            setAllUserInfos(allUsers);
            // SocketDispatch({type: 'update_users', payload: users});
        })

        socket.on('user_disconnected', (allUsers: ChatUserInfo[]) => {
            // console.info('User Disconnected: '+ uid);
            // SocketDispatch({type: 'remove_user', payload: uid});
            setAllUserInfos(allUsers);
        })


        socket.io.on('reconnect', (attempt) => {
            console.info('Reconnected on attempt: ' + attempt);
        })

        socket.io.on('reconnect_attempt', (attempt: number) => {
            console.info('Reconnection attempt:' + attempt);
        })

        socket.io.on('reconnect_error', (error: Error) => {
            console.info('Reconnect Error ', error);
        })

        socket.io.on('reconnect_failed', () => {
            console.info('Reconnection failure');
            alert('Unable to connect to the web socket.')
        })
    };


    const disconnectHandler = (): void => {
        // setUserId(null);
        if (theSocket) {
            theSocket.disconnect();
        }
        setTheSocket(null);
    }

    return <div style={{height: '100%', background: 'pink'}}>
        <>
            Hi ! I'm MainPage Component!
            {!isConnected() && <LoginPage connectHandler={connectHandler}/>}
            {isConnected() && <ChatPage disconnectHandler={disconnectHandler} allUserInfos={allUserInfos}/> }
        </>
    </div>
}

export default MainPage;
