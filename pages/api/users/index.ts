import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession, signOut } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    

    if (req.method === "GET") {
        
        
        try {
            const users = await prisma.user.findMany();
            return res.status(200).json({ users });
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.status(404).json({ error: "Users not found!" });
        }
    } else if (req.method === "PUT") {
        
        
        const { userId, newRole } = req.body;
        console.log({backend: newRole, userId})

        try {
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: { role: newRole },
            });

            return res.status(200).json({ message: "User role updated successfully", user: updatedUser });
        } catch (error) {
            console.error("Error updating user role:", error);
            return res.status(404).json({ error: "Users not found" });
        }
    } else if (req.method === "DELETE") {

        
        const { userId } = req.body;

        try {
            await prisma.user.delete({
                where: { id: userId },
            });
            await signOut({ callbackUrl: "/" });

            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(404).json({ error: "User not found" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
