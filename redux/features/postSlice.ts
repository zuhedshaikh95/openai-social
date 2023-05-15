import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPost } from "@/typings";
import axios from 'axios';
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

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
        }
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

export const getPosts = createAsyncThunk('posts/getPosts', async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('/api/v1/posts');
        return data.posts.reverse();
    }
    catch({ message }: any) {
        return thunkAPI.rejectWithValue(message);
    }
    finally {
        thunkAPI.dispatch(setPostsIdle());
    }
});

export const createPost = createAsyncThunk('posts/createPost', async (post: FieldValues, thunkAPI) => {
    try {
        await axios.post('/api/v1/posts', post);
        toast.success('Post Created!');
    }
    catch({ message }: any) {
        toast.error(message);
    }
})

export default postSlice.reducer;

export const { setPostsIdle } = postSlice.actions;