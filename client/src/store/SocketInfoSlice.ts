import {Socket} from "socket.io-client";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ISocketState {
    socket?: Socket,
    socketId?: string
}
const initialSocketState: ISocketState = {
    socket: undefined,
    socketId: undefined
}

const socketConnectionSlice = createSlice({
    name: 'socketInfoSlice',
    initialState: initialSocketState,
    reducers: {
        setSocket(state, action: PayloadAction<Socket | undefined>) {
            state.socket = action.payload;
        },
        setSocketId(state, action: PayloadAction<string | undefined>) {
            state.socketId = action.payload;
        }
    }
})

export const socketInfoReducer = socketConnectionSlice.reducer;
export const socketInfoActions = socketConnectionSlice.actions;