import { NextApiRequest, NextApiResponse } from "next";
import { createPost, getAllPosts } from "@/controllers/posts.controller";
import { connect } from "@/configs";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    await connect();

    switch(request.method) {
        case 'GET':
            return getAllPosts(request, response);

        case 'POST':
            return createPost(request, response);

        default:
            return response.status(405).send({
                error: true,
                message: 'Method Not Allowed'
            });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb'
        },
    },
}