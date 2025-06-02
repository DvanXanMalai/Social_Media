import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  const currentUserId = req.user.id; // assuming user ID is stored in req.user
  try {
    const result = await prisma.user.findMany({
      where: {
        id: {
          not: currentUserId, // exclude this user
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        bio: true,
        following: true,
        followers: true,
        // any other safe fields...
      },
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
