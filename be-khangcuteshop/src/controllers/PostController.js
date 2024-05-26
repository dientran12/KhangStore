import PostService from '../service/PostService';

const createPost = async (req, res) => {
    const { title, content, userId, image } = req.body;
    if (!title || !content || !userId) {
        return res.status(400).json({ message: 'Title, content and userId are required' });
    }
    try {
        const post = await PostService.createPost({ title, content, userId }, image);
        if (!post) {
            return res.status(500).json({ message: 'Error creating post' });
        }
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    createPost,
}
