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
  const {
    page = 1,
    pageSize = 25,
    search,
  }: { page?: number; pageSize?: number; search?: string } = req.query;

  if (req.method === "GET") {
    try {
      let posts: any;
      let totalPosts: number;

      if (search) {
        posts = await prisma.post.findMany({
          skip: (Number(page) - 1) * Number(pageSize),
          take: Number(pageSize),
          where: {
            OR: [
              { title: { contains: search as string, lt: "insensitive" } },
              { content: { contains: search as string, lt: "insensitive" } },
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

        totalPosts = await prisma.post.count({
          where: {
            OR: [
              { title: { contains: search as string, lt: "insensitive" } },
              { content: { contains: search as string, lt: "insensitive" } },
            ],
          },
        });
      } else {
        posts = await prisma.post.findMany({
          skip: (Number(page) - 1) * Number(pageSize),
          take: Number(pageSize),
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
        });

        totalPosts = await prisma.post.count();
      }

      res.json({ posts, totalPosts });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(404).json({ error: "Posts not found" });
    }
  } else if (req.method === "POST") {
    if (!session) {
      res.status(401).json("unauthorized");
    }
    try {
      const { title, content, authorId, authorPic, picture } = req.body;

      const slug = generateUniqueSlug(title);
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          picture,
          author: { connect: { id: authorId } },
          authorPic,
          slug,
        },
      });

      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(400).json({ error: "Error creating post" });
    }
  }
}

function generateUniqueSlug(title: string) {
  const baseSlug = slugify(title, { lower: true });
  return `${baseSlug}-${Date.now()}`;
}
