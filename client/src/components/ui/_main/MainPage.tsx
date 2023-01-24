import React, {ReactElement, useEffect, useState} from "react";
import LoginPage from "../login/LoginPage";
import ChatMainPage from "../chat/chat-main-page/ChatMainPage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";

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

    return <div style={{height: '100%'}}>
        <>
            {!isConnected() && <LoginPage/>}
            {isConnected() &&  <ChatMainPage />}
        </>
    </div>
}

export default MainPage;
