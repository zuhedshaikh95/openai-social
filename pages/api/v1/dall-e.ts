import { NextApiRequest, NextApiResponse } from "next";
import { generateImage } from "@/controllers/dall-e.controller";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  switch (request.method) {
    case "POST":
      return generateImage(request, response);
      

    default:
      return response.status(405).send({
        error: true,
        message: "Method Not Allowed",
      });
  }
}