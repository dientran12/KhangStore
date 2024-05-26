// models/post.js
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {});

    Post.associate = function (models) {
        // Mối quan hệ đa hình với Image
        Post.hasOne(models.Image, {
            foreignKey: 'objectId',
            constraints: false,
            scope: {
                objectType: 'Post'
            },
            as: 'thumbnail' // Sử dụng số ít vì mỗi bài viết chỉ có một thumbnail
        });
    };

    return Post;
};
