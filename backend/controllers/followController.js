import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const followUser = async (req, res) => {
  const { userId } = req.params;
  const parsedUserId = parseInt(userId);
  if (parsedUserId === req.user.id) {
    return res.status(400).json({ message: 'You cannot follow yourself' });
  }

  try {
    const alreadyFollowing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: req.user.id,
          followingId: parsedUserId,
        },
      },
    });
    if (alreadyFollowing) {
      return res
        .status(400)
        .json({ message: 'You are already following this user' });
    }
    const response = await prisma.follow.create({
      data: {
        followerId: req.user.id,
        followingId: parsedUserId,
      },
    });
    console.log('response', response);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const unFollowUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: req.user.id,
          followingId: parseInt(userId),
        },
      },
    });
    res.status(200).json({ message: 'Unfollowed user successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error unfoloowing user' });
  }
};

export const getFollowers = async (req, res) => {
  const { userId } = req.params;
  try {
    const followers = await prisma.follow.findMany({
      where: {
        followingId: parseInt(userId),
      },
      include: {
        follower: true,
      },
    });
    res.status(200).json(followers.map((f) => f.follower));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error getting followers' });
  }
};

export const getFollowing = async (req, res) => {
  const { userId } = req.params;
  try {
    const following = await prisma.follow.findMany({
      where: {
        followerId: parseInt(userId),
      },
      include: {
        following: true,
      },
    });
    res.status(200).json(following.map((f) => f.following));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error getting following' });
  }
};
