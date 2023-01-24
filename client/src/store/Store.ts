import {configureStore} from "@reduxjs/toolkit";
import {chatInfoReducer} from "./ChatInfoSlice";
import {socketInfoReducer} from "./SocketInfoSlice";


const store = configureStore({
    reducer: {
        chatInfo: chatInfoReducer,
        socketInfo: socketInfoReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;