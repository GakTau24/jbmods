import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === "GET") {
        if (session.user.role !== "ADMIN") {
            return res.status(401).json({ message: "You are not admin!" });
        }
        
        try {
            const users = await prisma.user.findMany();
            return res.status(200).json({ users });
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    } else if (req.method === "PUT") {
        
        
        const { userId, newRole } = req.body;

        try {
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: { role: newRole },
            });

            return res.status(200).json({ message: "User role updated successfully", user: updatedUser });
        } catch (error) {
            console.error("Error updating user role:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
