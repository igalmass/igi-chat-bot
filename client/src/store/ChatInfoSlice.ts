import {ChatMessage} from "../components/models/ChatMessage";
import {ChatUserInfo} from "../components/models/ChatUserInfo";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IChatState {
    messages: ChatMessage[];
    users: ChatUserInfo[]
}

const initialChatState: IChatState = { messages: [], users: [] };
const chatInfoSlice = createSlice ({
    name: 'chatInfo',
    initialState: initialChatState,
    reducers: {
        updateMessages (state, action: PayloadAction<ChatMessage[]>) {
            state.messages = action.payload
        },
        updateUsers (state, action: PayloadAction<ChatUserInfo[]>) {
            state.users = action.payload
        }
    }
})

export const chatInfoActions = chatInfoSlice.actions;
export const chatInfoReducer = chatInfoSlice.reducer;