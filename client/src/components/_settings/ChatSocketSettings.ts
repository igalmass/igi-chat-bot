import {ManagerOptions} from "socket.io-client";
import {SocketOptions} from "socket.io-client";

export type SocketSettingsType = {
    uri: string,
    opts?: Partial<ManagerOptions & SocketOptions>
}

export const THE_SOCKET_SETTINGS: SocketSettingsType = {
    uri: 'ws://localhost:1337',
    opts: {
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
        autoConnect: false
    }
}
