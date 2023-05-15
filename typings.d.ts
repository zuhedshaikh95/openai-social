import { Document } from "mongoose";

export interface IPost extends Document {
    name: string;
    prompt: string;
    photo: string;
}