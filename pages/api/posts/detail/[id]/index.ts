import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';
import { getServerSession } from 'next-auth';
import Nextauth from '@/pages/api/auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, Nextauth)
  if (req.method === 'GET') {
    if(!session){
      res.status(401).json("unauthorized")
    }
    const postId = req.query.id as string;
    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json({ post });
    } catch (error) {
      console.error('Error fetching post:', error);
      return res.status(404).json({ error: error });
    }
  } else if (req.method === "DELETE") {
    if(!session){
      res.status(401).json("unauthorized")
    }
    const postId = req.query.id as string;
    try {
      const deletedPost = await prisma.post.delete({
        where: { id: postId },
      });

      res.status(204).end();
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(404).json({ error: error });
    }
  } else if (req.method === 'PUT') {
    if(!session){
      res.status(401).json("unauthorized")
    }
    const id = req.query.id as string;
    const { title, content, picture, authorId } = req.body;
    const slug = generateUniqueSlug(title);
    
    try {
      const updatedPost = await prisma.post.update({
        where: { id },
        data: {
          title,
          picture,
          content,
          author: { connect: { id: authorId } },
          slug
        },
      });

      return res.status(200).json({ post: updatedPost });
    } catch (error) {
      console.error('Error updating post:', error);
      return res.status(404).json({ error: error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

function generateUniqueSlug(title: string) {
  const baseSlug = slugify(title, { lower: true });
  return `${baseSlug}-${Date.now()}`;
}
