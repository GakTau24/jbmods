import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import slugify from "slugify";
import Nextauth from "../auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, Nextauth);

  if (req.method === "GET") {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.json({ posts });
  } else if (req.method === "POST") {
    if (!session) {
      res.status(401).json("unauthorized");
    }
    try {
      const { title, content, picture, authorId } = req.body;

      const slug = generateUniqueSlug(title);
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          picture,
          author: { connect: { id: authorId } },
          slug,
        },
      });

      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } 
}

function generateUniqueSlug(title: string) {
  const baseSlug = slugify(title, { lower: true });
  return `${baseSlug}-${Date.now()}`;
}
