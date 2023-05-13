import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@/models";


export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    switch(request.method) {
        case 'GET':


        default:
            return response.status(405).send({
                error: true,
                message: 'Method Not Allowed'
            });
    }
}