import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { CustomException } from "@/utils";

export default (handler: NextApiHandler) => async (request: NextApiRequest, response: NextApiResponse) => {
    const token = request.headers['authorization'];

    try {
        if(!token) {
            throw new CustomException('Unauthorized', 401);
        }
    
        return handler(request, response);
    }
    catch({ message, status = 500 }: any) {
        return response.status(status).json({
            error: true,
            message
        });
    }
}