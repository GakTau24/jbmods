import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (typeof slug === "string") {
    if (req.method === "PUT") {
      try {
        const updatedPost = await prisma.post.update({
          where: { slug: slug },
          data: {
            views: {
              increment: 1,
            },
          },
        });
      
        return res.status(200).json(updatedPost);
      } catch (error) {
        console.error("Error updating post views:", error);
        return res.status(404).json({ error: "Posts not Found" });
      }
      
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } else {
    return res.status(400).json({ error: "Invalid slug parameter" });
  }
}
