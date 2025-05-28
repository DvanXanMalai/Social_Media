import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const likePost = async (req, res) => {
  const { postId, userId } = req.params;
  const parsedPostId = parseInt(postId);
  const parsedUserId = parseInt(userId);

  try {
    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: {
        id: parsedPostId, // Use 'id' from the Post model and convert postId to an integer
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: parsedUserId,
          postId: parsedPostId,
        },
      },
    });

    if (existingLike) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    // Create a new like
    await prisma.like.create({
      data: {
        userId: parsedUserId,
        postId: parsedPostId,
      },
    });
    const likes = await prisma.like.findMany({
      where: { postId: parsedPostId },
    });

    res.status(200).json({
      message: 'Post liked successfully',
      postId: parsedPostId,
      likes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const unlikePost = async (req, res) => {
  const { postId, userId } = req.params;
  const parsedPostId = parseInt(postId);
  const parsedUserId = parseInt(userId);

  try {
    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: {
        id: parsedPostId, // Use 'id' from the Post model and convert postId to an integer
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: parsedUserId,
          postId: parsedPostId,
        },
      },
    });

    if (!existingLike) {
      console.log('here');
      return res.status(400).json({ message: 'Post not liked yet' });
    }

    // Delete the like
    await prisma.like.delete({
      where: {
        userId_postId: {
          userId: parsedUserId,
          postId: parsedPostId,
        },
      },
    });
    const likes = await prisma.like.findMany({
      where: { postId: parsedPostId },
    });

    res.status(200).json({
      message: 'Post unliked successfully',
      postId: parsedPostId,
      likes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
