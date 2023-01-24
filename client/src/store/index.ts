import {ChatMessage} from "../components/models/ChatMessage";
import {ChatUserInfo} from "../components/models/ChatUserInfo";
import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Socket} from "socket.io-client";
import {chatInfoReducer} from "./ChatInfoSlice";
import {socketInfoReducer} from "./SocketInfoSlice";

// export interface IChatState {
//     messages: ChatMessage[];
//     users: ChatUserInfo[]
// }
//
// const initialChatState: IChatState = { messages: [], users: [] };
// const chatInfoSlice = createSlice ({
//     name: 'chatInfo',
//     initialState: initialChatState,
//     reducers: {
//         updateMessages (state, action: PayloadAction<ChatMessage[]>) {
//             state.messages = action.payload
//         },
//         updateUsers (state, action: PayloadAction<ChatUserInfo[]>) {
//             state.users = action.payload
//         }
//     }
// })


const store = configureStore({
    reducer: {
        chatInfo: chatInfoReducer,
        socketInfo: socketInfoReducer
    }
})

// export const chatInfoActions = chatInfoSlice.actions;
// export const socketConnectionActions = s.actions;

export type RootState = ReturnType<typeof store.getState>;

export default store;