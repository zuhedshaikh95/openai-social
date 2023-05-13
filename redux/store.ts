import { configureStore } from "@reduxjs/toolkit";
import { generatorReducer } from './features';
import { type } from "os";

const store = configureStore({
    reducer: {
        generatorReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;