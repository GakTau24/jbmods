import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Nextauth from "../../auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, Nextauth);

  if (req.method === "GET") {
    const postId = req.query.postId as string;
    try {
      const comments = await prisma.comment.findMany({
        where: {
          postId,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
      res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Error fetching comments" });
    }
  } else if (req.method === "POST") {
    if (!session) {
      res.status(401).json("unauthorized");
      return;
    }
    const { postId, content, authorId, authorPic } = req.body;
    try {
      const createdComment = await prisma.comment.create({
        data: {
          content,
          authorPic,
          post: { connect: { id: postId } },
          author: {
            connect: {
              id: authorId,
            },
          },
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
      res.status(201).json(createdComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(400).json({ error: "Error creating comment" });
    }
  } else if (req.method === "PUT") {
    if (!session) {
      res.status(401).json("unauthorized");
      return;
    }
    const { commentId, content } = req.body;
    try {
      const updatedComment = await prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          content,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
      res.status(200).json(updatedComment);
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(400).json({ error: "Error updating comment" });
    }
  } else if (req.method === "DELETE") {
    if (!session) {
      res.status(401).json("unauthorized");
      return;
    }
    const { commentId } = req.body;
    try {
      await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(400).json({ error: "Error deleting comment" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end("Method Not Allowed");
  }
}
