import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const result = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        bio: true,
        // any other safe fields...
      },
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
