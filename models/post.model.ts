import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    }
}, { versionKey: false, timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", postSchema);