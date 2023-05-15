import { NextApiRequest, NextApiResponse } from "next";
import { cloudinary } from "@/configs";
import { Post } from "@/models";
import axios from "axios";

export async function getAllPosts(request: NextApiRequest, response: NextApiResponse) {
    try {
        const posts = await Post.find({});
        return response.send({
            error: false,
            posts
        })
    }
    catch({ message, status = 500 }: any) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

export async function createPost(request: NextApiRequest, response: NextApiResponse) {
    const { name, prompt, photo } = request.body;

    try {
        const photoUrl = await cloudinary.uploader.upload(photo, {
            folder: 'SocialAI',
            upload_preset: 'SocialAI'
        });
        const post = new Post({ name, prompt, photo: photoUrl.url });
        await post.save();

        return response.status(201).send({
            error: false,
            post,
            message: 'New post created!'
        })
    }
    catch({ message, status = 500 }: any) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}