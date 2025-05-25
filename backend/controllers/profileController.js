import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  // console.log('called', req.body);
  const { email, username, bio } = req.body.user;
  console.log('userData', email, username, bio);
  const userId = req.user.id;
  console.log('userid', userId);

  try {
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log('user', result);
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: { email, bio, username },
    });
    console.log('updated user', updatedUser);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
