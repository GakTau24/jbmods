import { PrismaClient, Post } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { q } = req.query;
    if (!q || typeof q !== "string") {
      return res.status(400).json({ error: "Invalid query parameter" });
    }

    try {
      const posts: Post[] = await prisma.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: q,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
      res.json({ posts });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
