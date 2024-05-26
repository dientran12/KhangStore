const db = require('../models/index'); // Đường dẫn tới models của bạn
const ImageService = require('./ImageService');

const PostService = {
    // Tạo một đơn hàng mới
    createPost: async (postData, image) => {
        const transaction = await db.sequelize.transaction();
        try {
            const newPost = await db.Post.create(postData, { transaction });
            let imageUrl = null;
            if (image) {
                imageUrl = await imageService.saveImage(image, 'Post', newPost.id, transaction);
            }

            await transaction.commit();
            return {
                status: 'OK',
                message: 'Post created successfully',
                post: { ...newPost.dataValues, imageUrl }
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

}

module.exports = PostService;
