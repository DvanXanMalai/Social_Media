import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const getAllPosts = async (req, res) => {
  const currentUserId = req.user.id; // assuming user ID is stored in req.user
  try {
    const result = await prisma.post.findMany({
      where: {
        id: {
          not: currentUserId, // exclude this user
        },
      },
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
