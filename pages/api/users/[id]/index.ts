import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import Nextauth from "../../auth/[...nextauth]";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const session = await getServerSession(req, res, Nextauth);
  if (req.method === 'GET') {
    if(!session){
      res.status(401).json("unauthorized")
    }
    const id = req.query.id;

    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'An error occurred while fetching the user.' });
    }
  } else if (req.method === 'PUT') {
    if(!session){
      res.status(401).json("unauthorized")
    }
    const userId = req.query.id;
    const { name, email, image, password } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, email, image, password },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
