import {Socket} from "socket.io-client";

class SocketConnectionEventHandlers {
    public registerToConnectionEvents(socket: Socket) {


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
        });

    }
}

const socketConnectionEventHandlers = new SocketConnectionEventHandlers();

export default socketConnectionEventHandlers;
