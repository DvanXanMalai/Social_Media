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
  const { email, username, bio } = req.body;

  const imagePath = req.file
    ? `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/${req.file.filename}`
    : null;

  // Only update image if a new one was uploaded
  // if (req.file) {
  //   user.image = `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/${req.file.filename}`;
  // }

  // const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  // console.log('imagepath', imagePath);
  // console.log('imagefile from react', req.file);

  const userId = req.user.id;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedData = { email, bio, username }; // Start with common fields

    if (imagePath !== null) {
      updatedData.image = imagePath; // Add image only if it exists
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updatedData,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
