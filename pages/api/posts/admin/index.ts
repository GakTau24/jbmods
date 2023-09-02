import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    if (session.user.role !== "ADMIN") {
      return res.status(401).json({ message: "You are not admin!" });
    }
    try {
      const posts = await prisma.post.findMany();
      return res.status(200).json({ posts });
    } catch (error) {
      console.error("Error fetching posts:", error);
      return res.status(404).json({ error: "Posts not found" });
    }
  }

  if (req.method === "DELETE") {
    if (session.user.role !== "ADMIN") {
      return res.status(401).json({ message: "You are not admin!" });
    }

    const postId = req.query.id as string;

    try {
      const deletedPost = await prisma.post.delete({
        where: { id: postId },
      });

      if (deletedPost) {
        return res.status(200).json({ message: "Post deleted successfully" });
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
