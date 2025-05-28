import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const createPost = async (req, res) => {
  const userId = req.user.id;
  const { content } = req.body;

  const imagePath = req.file
    ? `${process.env.BASE_URL || 'http://192.168.18.254:5000'}/uploads/${req.file.filename}`
    : null;
  try {
    const post = await prisma.post.create({
      data: {
        content,
        image: imagePath,
        authorId: userId,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post' });
  }
};

export const getFeed = async (req, res) => {
  try {
    const following = await prisma.follow.findMany({
      where: {
        followerId: req.user.id,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following.map((follow) => follow.followingId);
    const feed = await prisma.post.findMany({
      where: {
        authorId: {
          in: followingIds,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: { id: true, username: true },
        },
        likes: true,
      },
    });
    res.status(200).json(feed);
  } catch (error) {
    res.status(500).json({ message: 'Error getting feed' });
  }
};

//Get posts from a specific user
export const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: parseInt(userId),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: { select: { id: true, username: true } },
        likes: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error getting user posts' });
  }
};

//Delete a post
export const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
    });
    if (!post || post.authorId !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this post' });
    }
    await prisma.post.delete({
      where: {
        id: parseInt(postId),
      },
    });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};
