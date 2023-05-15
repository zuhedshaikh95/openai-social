import axios from 'axios';
import toast from "react-hot-toast";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPost } from "@/typings";
import { FieldValues } from "react-hook-form";
import { NextRouter } from "next/router";
import { resetGenertaorState } from "./generatorSlice";

interface PostState {
    posts: IPost[];
    postsError: boolean;
    postsMessage: string;
    postsLoading: boolean;
}

const initialState: PostState ={
    posts: [],
    postsError: false,
    postsMessage: "",
    postsLoading: false,
}


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPostsIdle: (state) => {
            state.postsError = false;
            state.postsLoading = false;
            state.postsMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
        // Get Posts
        .addCase(getPosts.pending, (state) => {
            state.postsLoading = true;
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        })
        .addCase(getPosts.rejected, (state, action: PayloadAction<any>) => {
            state.postsError = true;
            state.postsMessage = action.payload;
        })

        // Create Post
        .addCase(createPost.pending, (state) => {
            state.postsLoading = true;
        })
        .addCase(createPost.fulfilled, (state) => {
            state.postsLoading = false;
        })
        .addCase(createPost.rejected, (state) => {
            state.postsLoading = false;
        })
    }
});

export const getPosts = createAsyncThunk('posts/getPosts', async (value: string, thunkAPI) => {
    try {
        const { data } = await axios.get('/api/v1/posts');
        if(value) {
            return data.posts.filter((post: IPost) => post.prompt.toLowerCase().includes(value.toLowerCase()));
        }
        return data.posts.reverse();
    }
    catch({ message }: any) {
        return thunkAPI.rejectWithValue(message);
    }
    finally {
        thunkAPI.dispatch(setPostsIdle());
    }
});

export const createPost = createAsyncThunk('posts/createPost', async ({ form, router }: { form: FieldValues, router: NextRouter }, thunkAPI) => {
    try {
        await axios.post('/api/v1/posts', form);
        toast.success('Post Created!');
        setTimeout(() => {
            router.push('/');
            thunkAPI.dispatch(resetGenertaorState());
        }, 1000);
    }
    catch({ message }: any) {
        toast.error(message);
    }
})

export default postSlice.reducer;

export const { setPostsIdle } = postSlice.actions;