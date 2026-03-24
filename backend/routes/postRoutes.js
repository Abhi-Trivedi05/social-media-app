import express from 'express';
import protect from '../middleware/authMiddleware.js';
import Post from '../models/Post.js';

const router = express.Router();

// Create Post
router.post('/', protect, async (req, res) => {
    try {
        const { content, image } = req.body;

        if (!content && !image) {
            return res.status(400).json({ message: 'Post must contain either text or image' });
        }

        const post = new Post({
            user: req.user._id,
            username: req.user.username,
            content,
            image,
        });

        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Feed
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Like/Unlike Post
router.put('/:id/like', protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the post has already been liked by this user
        const alreadyLiked = post.likes.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyLiked) {
            // Unlike
            post.likes = post.likes.filter(
                (r) => r.user.toString() !== req.user._id.toString()
            );
        } else {
            // Like
            post.likes.push({
                user: req.user._id,
                username: req.user.username,
            });
        }

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Comment on Post
router.post('/:id/comment', protect, async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = {
            user: req.user._id,
            username: req.user.username,
            text,
        };

        post.comments.push(comment);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
