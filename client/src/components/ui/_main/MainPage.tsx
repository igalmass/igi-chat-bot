import React, {ReactElement, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import LoginPage from "../login/LoginPage";
import ChatMainPage from "../chat/chat-main-page/ChatMainPage";
import {THE_SOCKET_SETTINGS} from "../../_settings/ChatSocketSettings";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {socketInfoActions} from "../../../store/SocketInfoSlice";

import socketEventListenersService from "../../services/socket_events/SocketEventListenersService";
import handshakeService from "../../services/socket_events/HandshakeService";


interface Props {
    // prop1: string
}

const MainPage: React.FC<Props> = (props: Props): ReactElement => {
    const allUserInfos = useSelector((state: RootState) => state.chatInfo.users);
    const theSocket = useSelector((state: RootState) => state.socketInfo.socket);

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
        socketEventListenersService.startListeners(newSocket, dispatch);
        handshakeService.sendHandshake(newSocket, userName, dispatch);
    }

    const disconnectHandler = (): void => {
        if (theSocket) {
            theSocket.disconnect();
        }
        dispatch(socketInfoActions.setSocket(undefined));
        dispatch(socketInfoActions.setSocketId(undefined));
    }

    return <div style={{height: '100%'}}>
        <>
            {!isConnected() && <LoginPage connectHandler={connectHandler}/>}
            {isConnected() &&
                <ChatMainPage disconnectHandler={disconnectHandler} />}
        </>
    </div>
}

export default MainPage;
