import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export const likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        // Check if the post exists
        const post = await prisma.post.findUnique({
            where: { userId_postId: { userId: req.user.id, postId: parseInt(postId) } },
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user has already liked the post
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        if (existingLike) {
            return res.status(400).json({ message: 'Post already liked' });
        }

        // Create a new like
        await prisma.like.create({
            data: {
                userId,
                postId,
            },
        });

        res.status(200).json({ message: 'Post liked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const unlikePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        // Check if the post exists
        const post = await prisma.post.findUnique({
            where: { userId_postId: { userId: req.user.id, postId: parseInt(postId) } },
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user has already liked the post
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        if (!existingLike) {
            return res.status(400).json({ message: 'Post not liked yet' });
        }

        // Delete the like
        await prisma.like.delete({
            where: {
                userId_postId: {
                    userId: req.user.id,
                    postId: parseInt(postId),
                },
            },
        });

        res.status(200).json({ message: 'Post unliked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}   