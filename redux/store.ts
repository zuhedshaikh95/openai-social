import { configureStore } from "@reduxjs/toolkit";
import { generatorReducer, postReducer } from './features';

const store = configureStore({
    reducer: {
        generatorReducer,
        postReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;