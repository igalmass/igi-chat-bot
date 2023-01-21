import {Server as HttpServer} from 'http';
import {Socket, Server} from 'socket.io';
import {v4} from 'uuid';
import {ChatUserInfo} from "../models/ChatUserInfo";
import {ROBIN_THE_BOT_SOCKET_ID, ROBIN_THE_BOT_USER_ID, ROBIN_THE_BOT_USER_NAME} from "../consts/RobinTheBotConsts";
import socketMessageEmitterService from "./SocketMessageEmitterService";



const USER_CONNECTED_EVENT = "user_connected";
const HANDSHAKE_EVENT_NAME = "handshake";


export class ServerSocketService {
    public static instance: ServerSocketService;
    // public theServer: Server;

    // public users: { [uid: string]: string }; // map of userId to socketId
    public allUserInfos: ChatUserInfo[]; // = [{userId: 'ROBIN_ID', userName: 'Robin The Bot', socketId: ROBIT_THE_BOT_SOCKET_ID}];

    constructor(server: HttpServer) {
        ServerSocketService.instance = this;
        // this.users = {};
        this.allUserInfos = [ {
            userId: ROBIN_THE_BOT_USER_ID,
            userName: ROBIN_THE_BOT_USER_NAME,
            socketId: ROBIN_THE_BOT_SOCKET_ID
        }];

        const theServer = new Server(server, {
            serveClient: false,
            pingInterval: 10_000,
            pingTimeout: 5_000,
            cookie: false,
            cors: {
                origin: '*'
            }
        })

        theServer.on('connect', this.startListeners);

        socketMessageEmitterService.setTheServer(theServer);

        console.info('Socket IO started ...');
    }

    public startListeners = (socket: Socket) => {
        console.info('Message received from ' + socket.id);

        socket.on('handshake',  (userName, callback: (userId: string, users: ChatUserInfo[]) => void) => {
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
                    callback(userId, this.allUserInfos);
                    return;
                }
            }

            //  create a new user
            const userId = v4();
            // this.users[userId] = socket.id;
            this.allUserInfos.push({socketId: socket.id, userId: userId, userName})
            allSocketIds = this.getAllSocketIds(); // Object.values(this.users);

            console.info(`Sending callback for handshake with uid ${userId} and users`, allSocketIds);
            callback(userId, this.allUserInfos);

            socketMessageEmitterService.EmitMessage(
                'user_connected',
                allSocketIds.filter(id => id !== socket.id),
                this.allUserInfos
            )

        });

        socket.on('disconnect', () => {

            console.log(`disconnect received from ${socket.id}`);

            const userId = this.getUserIdBySocketId(socket.id);

            if (userId) {
                this.allUserInfos = this.allUserInfos.filter(userInfo => userInfo.userId !== userId);
                //delete this.users[userId];
                //const userSocketIds = Object.values(this.users);
                socketMessageEmitterService.EmitMessage('user_disconnected', this.getAllSocketIds(), this.allUserInfos);
            }
        });

    }

    private getAllSocketIds(): string[] {
        return this.allUserInfos.map((cur: ChatUserInfo) => cur.socketId);
    }

    public getUserIdBySocketId = (socketId: string): string | undefined => {
        const result = this.allUserInfos.find((cur: ChatUserInfo) => cur.socketId === socketId);
        return result?.userId;
        //return Object.keys(this.users).find(uid => this.users[uid] === socketId);
    }

    // public EmitMessage = (name: string, socketIds: string[], payload: any): void => {
    //     console.info('Emitting event: ' + name + ' with payload ', payload);
    //     socketIds = socketIds.filter((socketId) => ROBIN_THE_BOT_SOCKET_ID !== socketId);
    //     socketIds.forEach(socketId => payload ? this.theServer.to(socketId).emit(name, payload) : this.theServer.to(socketId).emit(name));
    //
    // }
}


