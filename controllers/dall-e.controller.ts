import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY as string,
});

const openai = new OpenAIApi(configuration);

export const createPost = async (request: NextApiRequest, response: NextApiResponse) => {
    const { prompt } = request.body;

    try {
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });
        const image = aiResponse.data.data[0].b64_json;

        return response.status(201).send({ photo: image })
    }
    catch({message, status = 500}: any) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}