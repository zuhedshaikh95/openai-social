import { authMiddleware } from "@/middlewares";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    switch(request.method) {
        case 'POST':
            const { email, password } = request.body;
            response.send({ email, password });
            break;

        default:
            return response.status(405).send({ message: 'Method Not Allowed!' })
    }
}

export default authMiddleware(handler);