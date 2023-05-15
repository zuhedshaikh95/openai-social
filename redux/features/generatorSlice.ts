import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FieldValues } from 'react-hook-form';

interface GeneratorState {
    photo: string;
    generatorError: boolean;
    generatorMessage: string;
    generatorLoading: boolean;
}

const initialState: GeneratorState = {
    photo: '',
    generatorError: false,
    generatorMessage: '',
    generatorLoading: false,
};

const generatorSlice = createSlice({
    name: 'generator',
    initialState,
    reducers: {
         setGneratorIdle: (state) => {
             state.generatorLoading = false;
             state.generatorMessage = '';
         },
         setGneratorLoading: (state) => {
            state.generatorLoading = true;
         },
         resetGenertaorState: (state) => {
            return initialState;
         }
    },
    extraReducers: (builder) => {
        builder.addCase(generatePhoto.pending, (state) => {
            state.generatorLoading = true;
        })
        .addCase(generatePhoto.fulfilled, (state, action) => {
            state.photo = 'data:image/png;base64,' + action.payload;
        })
        .addCase(generatePhoto.rejected, (state) => {
            state.generatorLoading = false;
        })
    }
});


export const generatePhoto = createAsyncThunk("generator/generatePhoto", async (form: FieldValues, thunkAPI) => {
    try {
        const { data } = await axios.post('/api/v1/dall-e', form);
        return data.photo;
    }
    catch({ message }: any) {
        thunkAPI.rejectWithValue(message);
        return message;
    }
    finally {
        thunkAPI.dispatch(setGneratorIdle());
    }
});

export const { setGneratorIdle, setGneratorLoading, resetGenertaorState } = generatorSlice.actions;

export default generatorSlice.reducer;