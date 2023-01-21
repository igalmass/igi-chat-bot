import {Server as HttpServer} from 'http';
import {Socket, Server} from 'socket.io';
import {v4} from 'uuid';

type UserInfoType = {
    userId: string,
    socketId: string,
    userName: string
}

const USER_CONNECTED_EVENT = "user_connected";
const HANDSHAKE_EVENT_NAME = "handshake";


export class ServerSocket {
    public static instance: ServerSocket;
    public io: Server;

    // public users: { [uid: string]: string }; // map of userId to socketId
    public allUserInfos: UserInfoType[] = [];

    constructor(server: HttpServer) {
        ServerSocket.instance = this;
        // this.users = {};
        this.allUserInfos = [];
        this.io = new Server(server, {
            serveClient: false,
            pingInterval: 10_000,
            pingTimeout: 5_000,
            cookie: false,
            cors: {
                origin: '*'
            }
        })

        this.io.on('connect', this.startListeners);

        console.info('Socket IO started ...');
    }

    public startListeners = (socket: Socket) => {
        console.info('Message received from ' + socket.id);

        socket.on('handshake',  (userName, callback: (userId: string, users: string[]) => void) => {
            debugger;
            console.log('Handshake received from ' + socket.id);
            console.log(`The new userName is ${userName}`);

            let allSocketIds = this.getAllSocketIds();

            const reconnected = allSocketIds.includes(socket.id);
            if (reconnected) {
                console.info('This user has reconnected.');
                const userId = this.getUserIdBySocketId(socket.id);
                // const userSocketIds = allSocketIds; // Object.values(this.users);

                if (userId) {
                    console.info('Sending callback for reconnect ...');
                    callback(userId, allSocketIds);
                    return;
                }
            }

            //  create a new user
            const userId = v4();
            // this.users[userId] = socket.id;
            this.allUserInfos.push({socketId: socket.id, userId: userId, userName: "bilbo"})
            allSocketIds = this.getAllSocketIds(); // Object.values(this.users);

            console.info(`Sending callback for handshake with uid ${userId} and users`, allSocketIds);
            callback(userId, allSocketIds);

            this.SendMessage(
                'user_connected',
                allSocketIds.filter(id => id !== socket.id),
                allSocketIds
            )

        });

        socket.on('disconnect', () => {

            console.log(`disconnect received from ${socket.id}`);

            const userId = this.getUserIdBySocketId(socket.id);

            if (userId) {
                this.allUserInfos = this.allUserInfos.filter(userInfo => userInfo.userId !== userId);
                //delete this.users[userId];
                //const userSocketIds = Object.values(this.users);
                this.SendMessage('user_disconnected', this.getAllSocketIds(), socket.id);
            }
        });

    }

    private getAllSocketIds(): string[] {
        return this.allUserInfos.map((cur: UserInfoType) => cur.socketId);
    }

    public getUserIdBySocketId = (socketId: string): string | undefined => {
        const result = this.allUserInfos.find((cur: UserInfoType) => cur.socketId === socketId);
        return result?.userId;
        //return Object.keys(this.users).find(uid => this.users[uid] === socketId);
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    public SendMessage = (name: string, socketIds: string[], payload?: Object): void => {
        console.info('Emitting event: ' + name + ' with payload ', payload);
        socketIds.forEach(socketId => payload ? this.io.to(socketId).emit(name, payload) : this.io.to(socketId).emit(name));

    }
}


